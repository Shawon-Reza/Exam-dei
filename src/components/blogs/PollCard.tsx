"use client";

import { FiBarChart2, FiCheck, FiGlobe, FiShare2 } from "react-icons/fi";
import { formatDate } from "./blog-data";
import type { BlogPost, BlogPoll, PollVoteState } from "./types";

export function PollCard({
  post,
  voteState,
  onVote,
  onShare,
}: {
  post: BlogPost & { poll: BlogPoll };
  voteState?: PollVoteState;
  onVote: (post: BlogPost & { poll: BlogPoll }, optionId: string) => void;
  onShare: () => void;
}) {
  const poll = voteState
    ? { ...post.poll, votes: voteState.votes, totalVotes: voteState.totalVotes }
    : post.poll;
  const hasVoted = !!voteState;
  const correctOption = post.poll.options.find((option) => option.isCorrect);

  return (
    <article id={`blog-${post.id}`} className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-100 to-indigo-200 text-sm font-extrabold text-sky-900 ring-2 ring-sky-50 dark:from-sky-900 dark:to-indigo-800 dark:text-sky-100 dark:ring-zinc-800">
          {post.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-zinc-900 dark:text-white">
            {post.author}
            {post.role !== "কমিউনিটি লেখক" && (
              <span className="font-medium text-zinc-500"> · {post.role}</span>
            )}
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <FiGlobe aria-label="সবার জন্য" className="size-3" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-4 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700 dark:bg-sky-950/70 dark:text-sky-300">
          <FiBarChart2 aria-hidden="true" />
          MCQ Poll
        </span>
        <h2 className="mt-3 text-lg font-extrabold leading-snug text-zinc-900 dark:text-white sm:text-xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {post.excerpt}
          </p>
        )}

        <fieldset className="mt-4 space-y-2.5" disabled={hasVoted}>
          <legend className="sr-only">উত্তরের option নির্বাচন করুন</legend>
          {post.poll.options.map((option) => {
            const count = poll.votes[option.id] ?? 0;
            const percentage =
              poll.totalVotes > 0 ? Math.round((count / poll.totalVotes) * 100) : 0;
            const selected = voteState?.selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                disabled={hasVoted}
                onClick={() => onVote(post, option.id)}
                aria-pressed={selected}
                className={`relative flex min-h-12 w-full items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                  hasVoted && option.isCorrect
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-100"
                    : hasVoted && selected
                      ? "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-100"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-emerald-800"
                }`}
              >
                {hasVoted && (
                  <span
                    className={`absolute inset-y-0 left-0 ${
                      option.isCorrect
                        ? "bg-emerald-200/50 dark:bg-emerald-800/25"
                        : "bg-zinc-100/80 dark:bg-zinc-800/60"
                    }`}
                    style={{ width: `${percentage}%` }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 grid size-5 shrink-0 place-items-center rounded-full border ${
                    hasVoted && option.isCorrect
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                >
                  {hasVoted && option.isCorrect && (
                    <FiCheck aria-hidden="true" className="size-3" />
                  )}
                </span>
                <span className="relative z-10 flex-1 font-medium">{option.text}</span>
                {hasVoted && (
                  <span className="relative z-10 shrink-0 text-xs font-bold tabular-nums">
                    {percentage}% · {count.toLocaleString("bn-BD")}
                  </span>
                )}
              </button>
            );
          })}
        </fieldset>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 text-zinc-400">
            {poll.totalVotes.toLocaleString("bn-BD")} জন ভোট দিয়েছেন
          </span>
          {hasVoted && (
            <span
              role="status"
              className={`font-bold ${
                voteState.selectedOptionId === correctOption?.id
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-rose-600 dark:text-rose-300"
              }`}
            >
              {voteState.selectedOptionId === correctOption?.id
                ? "সঠিক উত্তর!"
                : `সঠিক উত্তর: ${correctOption?.text ?? ""}`}
            </span>
          )}
        </div>
        {!hasVoted && (
          <p className="mt-2 text-xs text-zinc-400">
            একটি option বেছে নিলে সঠিক উত্তর দেখা যাবে।
          </p>
        )}
      </div>
      <div className="mx-4 border-t border-zinc-100 dark:border-zinc-800 sm:mx-5">
        <div className="flex items-center justify-between py-2 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <FiBarChart2 aria-hidden="true" />
            {poll.totalVotes.toLocaleString("bn-BD")} ভোট
          </span>
          <span>{hasVoted ? "আপনার উত্তর জমা হয়েছে" : "আপনার উত্তর দিন"}</span>
        </div>
        <div className="border-t border-zinc-100 py-1 dark:border-zinc-800">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <FiShare2 aria-hidden="true" />
            শেয়ার
          </button>
        </div>
      </div>
    </article>
  );
}
