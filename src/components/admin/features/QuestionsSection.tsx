"use client";

import { useMemo, useState, type FormEvent } from "react";
import { FiActivity, FiBookOpen, FiEdit2, FiHelpCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { type Exam } from "../../exams/exam-data";
import QuestionFormDialog from "./QuestionFormDialog";
import type { AdminSubject, QuestionDraft, QuestionRow } from "../types";
import { EmptyTable, Panel, PrimaryButton, SearchBox, SectionHeading, SmallStat, TableFooter } from "../ui/AdminPrimitives";

const emptyDraft: QuestionDraft = {
  prompt: "",
  subjectId: "bangla",
  options: ["", "", "", ""],
  answerIndex: 0,
  explanation: "",
  topicId: "",
};

export default function QuestionsSection({
  questions,
  subjects,
  exams,
  onChange,
  onNotice,
}: {
  questions: QuestionRow[];
  subjects: AdminSubject[];
  exams: Exam[];
  onChange: (questions: QuestionRow[]) => void;
  onNotice: (message: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const filtered = useMemo(() => questions.filter((question) =>
    `${question.prompt} ${question.subject} ${question.topic ?? ""} ${question.examTitle}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
  ), [questions, search]);

  function openDialog(question?: QuestionRow) {
    setEditingId(question?.id ?? null);
    setDialogOpen(true);
    const subjectId = subjects.find((subject) => subject.label === question?.subject)?.id ?? subjects[0]?.id ?? "";
    const options = question?.options ?? emptyDraft.options;
    setDraft({
      prompt: question?.prompt ?? "",
      subjectId,
      topicId: question?.topicId ?? subjects.find((subject) => subject.id === subjectId)?.topics[0]?.id ?? "",
      options: options.length >= 4 ? [...options] : [...options, ...Array(4 - options.length).fill("")],
      answerIndex: question?.answerIndex ?? 0,
      explanation: question?.explanation ?? "",
    });
  }

  function saveQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = subjects.find((item) => item.id === draft.subjectId);
    const topic = subject?.topics.find((item) => item.id === draft.topicId);
    const options = draft.options.map((option) => option.trim());
    if (!subject || !draft.prompt.trim() || options.some((option) => !option)) return;
    const record = {
      prompt: draft.prompt.trim(),
      options,
      answerIndex: draft.answerIndex,
      explanation: draft.explanation.trim(),
      subjectId: subject.id,
      subject: subject.label,
      topic: topic?.label,
      topicId: topic?.id,
      examTitle: "Question Bank",
    };
    if (editingId) {
      onChange(questions.map((question) => question.id === editingId ? { ...question, ...record } : question));
      onNotice("প্রশ্নের তথ্য আপডেট হয়েছে");
    } else {
      onChange([{ ...record, id: `admin-question-${Date.now()}` }, ...questions]);
      onNotice("Question Bank-এ প্রশ্ন যোগ হয়েছে");
    }
    setDialogOpen(false);
    setEditingId(null);
  }

  function removeQuestion(id: string) {
    onChange(questions.filter((question) => question.id !== id));
    onNotice("প্রশ্নটি মুছে ফেলা হয়েছে");
  }

  return (
    <>
      <SectionHeading
        eyebrow="কনটেন্ট ব্যবস্থাপনা"
        title="Question Bank"
        description="বিষয়ভিত্তিক MCQ প্রশ্ন, উত্তর ও ব্যাখ্যা পরিচালনা করুন।"
        action={<PrimaryButton onClick={() => openDialog()}><FiPlus aria-hidden="true" /> প্রশ্ন যোগ করুন</PrimaryButton>}
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SmallStat label="মোট প্রশ্ন" value={questions.length.toLocaleString("bn-BD")} icon={<FiHelpCircle />} />
        <SmallStat label="বিষয়" value={subjects.length.toLocaleString("bn-BD")} icon={<FiBookOpen />} />
        <SmallStat label="পরীক্ষায় ব্যবহৃত" value={exams.length.toLocaleString("bn-BD")} icon={<FiActivity />} />
      </div>
      <Panel>
        <div className="border-b border-zinc-100 p-4 dark:border-zinc-800"><SearchBox value={search} onChange={setSearch} placeholder="প্রশ্ন, বিষয় বা পরীক্ষা খুঁজুন..." /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60">
              <tr>
                <th className="px-5 py-3 font-bold">প্রশ্ন</th>
                <th className="px-4 py-3 font-bold">বিষয়</th>
                <th className="px-4 py-3 font-bold">Topic</th>
                <th className="px-4 py-3 font-bold">উত্তর</th>
                <th className="px-4 py-3 font-bold">ব্যবহৃত</th>
                <th className="px-4 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map((question) => (
                <tr key={question.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
                  <td className="max-w-[420px] px-5 py-4">
                    <p className="line-clamp-2 font-semibold text-zinc-900 dark:text-white">{question.prompt}</p>
                    <p className="mt-1 text-xs text-zinc-500">{question.options.length}টি option</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">{question.subject}</span>
                  </td>
                  <td className="px-4 py-4 text-xs text-zinc-500 dark:text-zinc-400">{question.topic ?? "সব topic"}</td>
                  <td className="max-w-48 px-4 py-4 text-zinc-600 dark:text-zinc-300">{question.options[question.answerIndex]}</td>
                  <td className="max-w-44 px-4 py-4 text-xs text-zinc-500">{question.examTitle}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      <button type="button" onClick={() => openDialog(question)} aria-label="প্রশ্ন সম্পাদনা" className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><FiEdit2 aria-hidden="true" /></button>
                      <button type="button" onClick={() => removeQuestion(question.id)} aria-label="প্রশ্ন মুছুন" className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"><FiTrash2 aria-hidden="true" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <EmptyTable colSpan={6} text="কোনো প্রশ্ন পাওয়া যায়নি।" />}
            </tbody>
          </table>
        </div>
        <TableFooter count={filtered.length} label="টি প্রশ্ন" />
      </Panel>
      {dialogOpen && (
        <QuestionFormDialog
          draft={draft}
          setDraft={setDraft}
          editing={!!editingId}
          onClose={() => {
            setDialogOpen(false);
            setEditingId(null);
          }}
          subjects={subjects}
          onSubmit={saveQuestion}
        />
      )}
    </>
  );
}
