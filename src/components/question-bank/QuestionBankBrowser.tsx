"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import QuestionBankCard from "./QuestionBankCard";
import {
  questionBankItems,
  questionBankOrganizations,
  type QuestionBankItem,
} from "./question-bank-data";

export default function QuestionBankBrowser() {
  const [organization, setOrganization] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<QuestionBankItem | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    return questionBankItems.filter((item) => {
      const matchesOrganization =
        organization === "all" || item.organization === organization;
      const matchesSearch =
        !query ||
        `${item.title} ${item.positionLabel} ${item.subjects.join(" ")}`
          .toLocaleLowerCase()
          .includes(query);
      return matchesOrganization && matchesSearch;
    });
  }, [organization, searchTerm]);

  return (
    <>
      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {questionBankOrganizations.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOrganization(item.id)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
                  organization === item.id
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-80">
            <span className="sr-only">প্রশ্ন ব্যাংক খুঁজুন</span>
            <FiSearch aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="পদ বা পরীক্ষার নাম খুঁজুন"
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-xs text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
        </div>
      </section>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {filteredItems.length}টি question set পাওয়া গেছে
        </p>
        {(organization !== "all" || searchTerm) && (
          <button
            type="button"
            onClick={() => {
              setOrganization("all");
              setSearchTerm("");
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300"
          >
            <FiX aria-hidden="true" /> Filter মুছুন
          </button>
        )}
      </div>

      <section className="mt-3 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <QuestionBankCard key={item.id} item={item} onOpen={setSelectedItem} />
        ))}
      </section>

      {filteredItems.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white px-5 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-bold text-zinc-900 dark:text-white">
            কোনো question set পাওয়া যায়নি
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            অন্য পদ, প্রতিষ্ঠান বা keyword দিয়ে চেষ্টা করুন।
          </p>
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/40 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedItem(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="question-bank-dialog-title"
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedItem.organizationLabel} · {selectedItem.positionLabel}
                </p>
                <h2 id="question-bank-dialog-title" className="mt-1 text-lg font-extrabold text-zinc-950 dark:text-white">
                  {selectedItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="বন্ধ করুন"
                className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>
            <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/25">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                {selectedItem.questionCount}টি প্রশ্ন প্রস্তুত
              </p>
              <p className="mt-1 text-xs leading-5 text-emerald-800/80 dark:text-emerald-200/75">
                Demo UI হিসেবে প্রশ্ন set দেখানো হচ্ছে। পরে এখান থেকেই API দিয়ে
                প্রশ্ন load করে practice শুরু করা যাবে।
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-700"
            >
              প্রশ্ন অনুশীলন শুরু করুন
            </button>
          </section>
        </div>
      )}
    </>
  );
}
