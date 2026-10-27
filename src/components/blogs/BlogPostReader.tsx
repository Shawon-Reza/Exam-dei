"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { FiClock, FiX } from "react-icons/fi";
import { categoryLabel, formatDate } from "./blog-data";
import { blogEditorExtensions } from "./RichTextEditor";
import type { BlogPost } from "./types";

export function PostReader({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const editor = useEditor({
    extensions: blogEditorExtensions,
    immediatelyRender: false,
    editable: false,
    content: post.content,
  });


  console.log("Editor------------------------>:", editor)
  console.log("content------------------------>:", post.content)
  console.log("post------------------------>:", post)
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-zinc-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <article
        aria-labelledby="reader-title"
        aria-modal="true"
        role="dialog"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl dark:bg-zinc-900 sm:rounded-3xl"
      >
        <div className={`relative h-36 bg-gradient-to-br ${post.accent} sm:h-48`}>
          <button
            type="button"
            onClick={onClose}
            aria-label="লেখা বন্ধ করুন"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/80 text-zinc-700 backdrop-blur transition hover:bg-white"
          >
            <FiX aria-hidden="true" />
          </button>
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8">
            <span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold text-emerald-800 backdrop-blur">
              {categoryLabel(post.categoryId)}
            </span>
          </div>
        </div>
        <div className="px-5 py-7 sm:px-10 sm:py-9">
          <h2 id="reader-title" className="text-2xl font-extrabold leading-snug text-zinc-950 dark:text-white sm:text-3xl">
            {post.title}
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-zinc-100 pb-5 dark:border-zinc-800">
            <span className="grid size-10 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {post.initials}
            </span>
            <div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{post.author}</p>
              <p className="text-xs text-zinc-500">{post.role}</p>
            </div>
            <span className="text-xs text-zinc-400">{formatDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
              <FiClock aria-hidden="true" /> {post.readTime} মিনিট পড়া
            </span>
          </div>

          <EditorContent
            editor={editor}
            className="blog-prose blog-reader mt-7 text-base leading-8 text-zinc-700 dark:text-zinc-300"
          />
        </div>
      </article>
    </div>
  );
}

