"use client";

import { useState, type ReactNode } from "react";
import type { JSONContent } from "@tiptap/react";
import { FiArrowRight, FiX } from "react-icons/fi";
import { categories } from "./blog-data";
import { RichTextEditor } from "./RichTextEditor";

export function RichTextComposer({
  onPublish,
  onCancel,
  onNotice,
}: {
  onPublish: (title: string, categoryId: string, content: JSONContent, excerpt: string) => void;
  onCancel: () => void;
  onNotice: (message: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("preparation");
  const [content, setContent] = useState<JSONContent>({ type: "doc", content: [{ type: "paragraph" }] });
  const [textContent, setTextContent] = useState("");
  const [composerError, setComposerError] = useState("");

  function handleContentChange(newContent: JSONContent, newText: string) {
    setContent(newContent);
    setTextContent(newText);
  }

  function handleError(error: string) {
    setComposerError(error);
  }

  function publish() {
    if (!title.trim()) {
      setComposerError("শিরোনাম দিন।");
      return;
    }
    const excerpt = textContent.trim() || "ছবি, টেবিল বা গাণিতিক সূত্রসহ লেখা";
    
    console.log("Publishing blog:", {
      title: title.trim(),
      categoryId,
      content,
      excerpt,
    });
    
    onPublish(title.trim(), categoryId, content, excerpt);
  }

  const canPublish = title.trim().length > 0;

  return (
    <section
      aria-labelledby="compose-title"
      className="mb-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl shadow-emerald-950/5 dark:border-emerald-900 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-5 dark:border-zinc-800 sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            আপনার গল্প, আপনার ভাষায়
          </p>
          <h2 id="compose-title" className="mt-1 text-xl font-extrabold text-zinc-900 dark:text-white">
            নতুন ব্লগ লিখুন
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="লেখা বন্ধ করুন"
          className="grid size-9 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-7">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            পোস্টের শিরোনাম
          </span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            placeholder="আপনার লেখার জন্য একটি সুন্দর শিরোনাম দিন"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-900 outline-none transition placeholder:font-normal placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          <span className="mt-1 block text-right text-xs text-zinc-400">{title.length}/120</span>
        </label>

        <label className="block max-w-xs">
          <span className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            বিষয় নির্বাচন করুন
          </span>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none focus:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          >
            {categories
              .filter((category) => category.id !== "all" && category.id !== "poll")
              .map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
              ))}
          </select>
        </label>

        <div>
          <span className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            আপনার লেখা
          </span>
          <RichTextEditor
            initialContent={content}
            onContentChange={handleContentChange}
            onError={handleError}
          />
          <p className="mt-2 text-xs text-zinc-400">
            Toolbar ব্যবহার করুন, অথবা ছবি paste/drag-and-drop করে যোগ করুন (প্রতি ছবি সর্বোচ্চ ৭০০ KB)।
          </p>
          <p className="mt-2 text-xs text-zinc-400">
            লেখা স্বয়ংক্রিয়ভাবে এই ব্রাউজারে সংরক্ষিত হবে।
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-zinc-400">
            পোস্টটি এই ডিভাইসের browser-এ demo হিসেবে প্রকাশিত হবে।
          </p>
          <button
            type="button"
            disabled={!canPublish}
            onClick={publish}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            প্রকাশ করুন
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}