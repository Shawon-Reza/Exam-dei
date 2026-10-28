"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiAlertCircle,
  FiLoader,
  FiAward,
  FiCheckCircle,
  FiXCircle,
  FiLock,
  FiUser,
} from "react-icons/fi";

import type { ExamSubject, ExamTopic } from "../exams/exam-data";
import McqQuestionCard from "./McqQuestionCard";
import { useGetQuestions } from "@/src/apis/questions/question.useHooks";
import { useSubmitResult } from "@/src/apis/results/results.hooks";
import { useAuth } from "@/src/apis/auth/useAuth";

type TopicMcqPracticeProps = {
  subject: Omit<ExamSubject, "icon"> & {
    icon?: ExamSubject["icon"];
  };
  topic: ExamTopic;
};

type QuestionOption = {
  text: string;
  isCorrect: boolean;
};

type McqQuestion = {
  id: string;
  question: string;
  type: string;
  difficulty: number;
  explanation: string;
  options: QuestionOption[];
};

export default function TopicMcqPractice({
  subject,
  topic,
}: TopicMcqPracticeProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const testId = searchParams.get("testID");
  const topicID = searchParams.get("topicID") ?? topic.id;
  const difficulty = searchParams.get("difficulty");
  const limit = searchParams.get("limit");
  const type = searchParams.get("type");
  const isPracticeMode = type === "practice";

  // Authentication
  const { data: user, isLoading: authLoading } = useAuth();
  const isAuthenticated = !!user;

  // Storage key for persisting answers
  const storageKey = `mcq_answers_${testId ?? topicID}`;

  // Load answers from localStorage on mount
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  // Persist answers to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(selectedAnswers));
    }
  }, [storageKey, selectedAnswers]);

  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<string, { selectedIndex: number | null; isCorrect: boolean }>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [resultData, setResultData] = useState<{
    score: number;
    negativeScore: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    skippedAnswers: number;
    accuracy: number;
  } | null>(null);

  const submitResultMutation = useSubmitResult();
  const isSubmitting = submitResultMutation.isPending;
  const submitError = submitResultMutation.isError;

  // Handle login redirect
  const handleLoginRedirect = () => {
    const currentPath = window.location.pathname + window.location.search;
    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
  };

  const params = new URLSearchParams({});

  if (testId) {
    params.set("testID", testId);
  }
  if (!testId && topicID) {
    params.set("topicID", topicID);
  }
  if (!testId && difficulty && Number.isInteger(Number(difficulty))) {
    params.set("difficulty", difficulty);
  }
  if (!testId && limit && Number.isInteger(Number(limit))) {
    params.set("limit", limit);
  }

  const questionsList = useGetQuestions(params.toString());

  const questions: McqQuestion[] = questionsList.data?.data ?? [];

  const handleAnswerSelect = (
    questionId: string,
    optionIndex: number,
  ) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  const handleResetAnswers = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setIsSubmitted(false);
    setResultData(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  };

  const handleSubmitAnswers = async () => {
    // Check authentication before submitting
    if (!isAuthenticated) {
      handleLoginRedirect();
      return;
    }

    const results = questions.map((question, index) => {
      const selectedOptionIndex = selectedAnswers[question.id];

      const isAnswered = selectedOptionIndex !== undefined;

      const selectedOption = isAnswered
        ? question.options[selectedOptionIndex]
        : null;

      const correctOption = question.options.find(
        (option) => option.isCorrect,
      );

      const isCorrect =
        isAnswered && selectedOption?.isCorrect === true;

      return {
        questionNumber: index + 1,
        questionId: question.id,
        question: question.question,
        selectedAnswer: selectedOption?.text ?? null,
        correctAnswer: correctOption?.text ?? null,
        isAnswered,
        isCorrect,
        isSkipped: !isAnswered,
      };
    });

    const totalQuestions = questions.length;
    const answered = results.filter(
      (result) => result.isAnswered,
    ).length;
    const skipped = totalQuestions - answered;
    const correct = results.filter(
      (result) => result.isCorrect,
    ).length;
    const incorrect = answered - correct;
    const negativeScore = incorrect;
    const accuracy = totalQuestions > 0 ? Number(((correct / totalQuestions) * 100).toFixed(2)) : 0;

    const submissionResult = {
      testId: testId ?? topic.id,
      topicId: topic.id,
      score: correct,
      negativeScore,
      totalQuestions,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      skippedAnswers: skipped,
      accuracy,
      testType: testId ? ("PREDEFINED" as const) : ("PRACTICE" as const),
    };

    console.log("Test Submission Result:", submissionResult);

    const reviewData: Record<string, { selectedIndex: number | null; isCorrect: boolean }> = {};
    results.forEach((result) => {
      reviewData[result.questionId] = {
        selectedIndex: result.isAnswered ? selectedAnswers[result.questionId] ?? null : null,
        isCorrect: result.isCorrect,
      };
    });

    setSubmittedAnswers(reviewData);
    setIsSubmitted(true);

    try {
      const response = await submitResultMutation.mutateAsync(submissionResult);
      if (response.success && response.data) {
        setResultData({
          score: response.data.score,
          negativeScore: response.data.negativeScore,
          totalQuestions: response.data.totalQuestions,
          correctAnswers: response.data.correctAnswers,
          incorrectAnswers: response.data.incorrectAnswers,
          skippedAnswers: response.data.skippedAnswers,
          accuracy: response.data.accuracy,
        });
        // Clear stored answers after successful submission
        if (typeof window !== "undefined") {
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.error("Failed to submit result:", error);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).filter(
    (questionId) =>
      questions.some((question) => question.id === questionId),
  ).length;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto mb-10 mt-2 max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Link
          href={`/topics/${encodeURIComponent(topic.id)}?subject=${encodeURIComponent(subject.id)}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-zinc-600 transition hover:bg-white hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-300"
        >
          <FiArrowLeft aria-hidden="true" />
          {topic.label} নোটে ফিরে যান
        </Link>

        <section className="mx-auto mt-5 max-w-7xl">
          {questionsList.isPending && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-sm text-zinc-500">
              <FiLoader className="animate-spin text-emerald-600" size={28} aria-hidden="true" />
              প্রশ্ন লোড হচ্ছে...
            </div>
          )}

          {questionsList.isError && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
              <FiAlertCircle className="text-red-500" size={28} aria-hidden="true" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">প্রশ্ন লোড করা যায়নি</h2>
              <p className="text-sm text-zinc-500">
                {questionsList.error instanceof Error
                  ? questionsList.error.message
                  : "আবার চেষ্টা করো।"}
              </p>
              <button
                type="button"
                onClick={() => questionsList.refetch()}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Try again
              </button>
            </div>
          )}

          {!questionsList.isPending &&
            !questionsList.isError &&
            questions.length === 0 && (
              <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
                <FiAlertCircle className="text-amber-500" size={28} aria-hidden="true" />
                <h2 className="font-semibold text-zinc-900 dark:text-white">কোনো প্রশ্ন পাওয়া যায়নি</h2>
                <p className="text-sm text-zinc-500">
                  এই topic, difficulty এবং question limit-এর জন্য প্রশ্ন নেই।
                </p>
              </div>
            )}

          {!questionsList.isPending &&
            !questionsList.isError &&
            questions.length > 0 && (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {topic.label} — MCQ Practice
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      মোট {questions.length}টি প্রশ্ন
                    </p>
                  </div>

                  {answeredCount > 0 && (
                    <button
                      type="button"
                      onClick={handleResetAnswers}
                      className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Reset answers
                    </button>
                  )}
                </div>

                {resultData && (
                  <div className="mb-5 rounded-2xl bg-emerald-50/50 p-4 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3">
                      <FiAward className="size-4" />
                      পরীক্ষার ফলাফল
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="rounded-xl bg-white p-3 dark:bg-zinc-800">
                        <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                          {resultData.score}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">স্কোর</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 dark:bg-zinc-800">
                        <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                          {resultData.correctAnswers}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">সঠিক</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 dark:bg-zinc-800">
                        <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                          {resultData.incorrectAnswers}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">ভুল</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 dark:bg-zinc-800">
                        <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                          {resultData.skippedAnswers}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">স্কিপ</p>
                      </div>
                      <div className="col-span-2 sm:col-span-4 grid grid-cols-2 gap-3 mt-2">
                        <div className="rounded-xl bg-white p-3 dark:bg-zinc-800">
                          <p className="text-xl font-extrabold text-zinc-900 dark:text-white">
                            {resultData.accuracy}%
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">শুদ্ধতা</p>
                        </div>
                        <div className="rounded-xl bg-white p-3 dark:bg-zinc-800">
                          <p className="text-xl font-extrabold text-zinc-900 dark:text-white">
                            {resultData.negativeScore}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">নেগেটিভ স্কোর</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 text-center">
                      মোট প্রশ্ন: {resultData.totalQuestions}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {questions.map((question, index) => (
                    <McqQuestionCard
                      key={question.id}
                      question={question}
                      questionNumber={index + 1}
                      selectedOptionIndex={selectedAnswers[question.id] ?? null}
                      onAnswerSelect={handleAnswerSelect}
                      isPracticeMode={isPracticeMode}
                      isSubmitted={isSubmitted}
                      submittedAnswer={submittedAnswers[question.id] ?? null}
                      isAuthenticated={isAuthenticated}
                    />
                  ))}
                </div>

                {!isPracticeMode && (
                  <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Answered: {answeredCount} / {questions.length}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {questions.length - answeredCount}টি প্রশ্নের উত্তর
                        দেওয়া হয়নি। চাইলে skip করে submit করতে পারো।
                      </p>
                    </div>

                    {!isAuthenticated && (
                      <div className="w-full sm:w-auto mb-2 p-3 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-sm flex items-center gap-2">
                        <FiLock className="size-4" />
                        <span>লগইন না থাকায় ফলাফল জমা দেওয়া যাবে না।</span>
                      </div>
                    )}

                    {submitError && (
                      <div className="w-full sm:w-auto mb-2 p-3 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-sm">
                        {submitResultMutation.error instanceof Error
                          ? submitResultMutation.error.message
                          : "ফলাফল জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmitAnswers}
                      disabled={isSubmitting || isSubmitted || !isAuthenticated}
                      className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin mr-2 size-4" />
                          জমা দিচ্ছে...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <FiCheckCircle className="mr-2 size-4" />
                          ইতিমধ্যে জমা দেওয়া হয়েছে
                        </>
                      ) : !isAuthenticated ? (
                        <>
                          <FiLock className="mr-2 size-4" />
                          লগইন করুন
                        </>
                      ) : (
                        "Submit Answers"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

          {!questionsList.isPending &&
            !questionsList.isError &&
            questions.length === 0 && (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-5 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  এখনো কোনো প্রশ্ন যোগ করা হয়নি
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Admin এই topic-এর প্রশ্ন যোগ করলে এখানে দেখা যাবে।
                </p>
              </div>
            )}
        </section>
      </div>
    </main>
  );
}