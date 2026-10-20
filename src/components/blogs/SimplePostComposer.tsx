"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiImage, FiLoader, FiSend, FiX } from "react-icons/fi";
import type { JSONContent } from "@tiptap/react";

const maximumImageSize = 700_000;
const allowedImageTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

type SimplePostComposerProps = {
  onPublish: (caption: string, content: JSONContent, imageAlt?: string) => void;
  onCancel: () => void;
};

function readImage(file: File): Promise<{ src: string; alt: string }> {
  if (!allowedImageTypes.includes(file.type)) {
    return Promise.reject(new Error("PNG, JPG, GIF অথবা WebP ছবি যোগ করুন।"));
  }
  if (file.size > maximumImageSize) {
    return Promise.reject(new Error("ছবির আকার ৭০০ KB-এর মধ্যে রাখুন।"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("ছবিটি পড়া যায়নি। আবার চেষ্টা করুন।"));
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("ছবিটি পড়া যায়নি। আবার চেষ্টা করুন।"));
        return;
      }
      resolve({ src: reader.result, alt: file.name });
    };
    reader.readAsDataURL(file);
  });
}

export default function SimplePostComposer({
  onPublish,
  onCancel,
}: SimplePostComposerProps) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPublishing) onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPublishing, onCancel]);

  async function selectImage(file: File | undefined) {
    if (!file) return;
    try {
      setImage(await readImage(file));
      setError("");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "ছবি যোগ করা যায়নি।");
    }
  }

  function publish() {
    if (!caption.trim() && !image) {
      setError("আপনার পোস্টে caption অথবা একটি ছবি যোগ করুন।");
      return;
    }

    setIsPublishing(true);
    const content: JSONContent = {
      type: "doc",
      content: [
        ...(caption.trim()
          ? [{ type: "paragraph", content: [{ type: "text", text: caption.trim() }] }]
          : []),
        ...(image
          ? [{ type: "image", attrs: { src: image.src, alt: image.alt } }]
          : []),
      ],
    };
    onPublish(caption.trim(), content, image?.alt);
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/50 p-3 backdrop-blur-sm sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPublishing) onCancel();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="simple-post-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 id="simple-post-title" className="text-lg font-extrabold text-zinc-950 dark:text-white">
              নতুন পোস্ট তৈরি করুন
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              আপনার ভাবনা বা ছবিটি কমিউনিটির সঙ্গে শেয়ার করুন
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPublishing}
            aria-label="পোস্ট composer বন্ধ করুন"
            className="grid size-9 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800"
          >
            <FiX aria-hidden="true" />
          </button>
        </header>

        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              আ
            </span>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">আপনি</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">কমিউনিটি পোস্ট</p>
            </div>
          </div>

          <textarea
            autoFocus
            value={caption}
            onChange={(event) => {
              setCaption(event.target.value);
              setError("");
            }}
            placeholder="আজ কী শেয়ার করতে চান?"
            rows={5}
            maxLength={1000}
            className="mt-5 min-h-32 w-full resize-none bg-transparent text-base leading-7 text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
          />

          {image && (
            <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={360}
                unoptimized
                className="max-h-64 w-full object-contain bg-zinc-50 dark:bg-zinc-950"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                aria-label="ছবি সরান"
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-zinc-950/70 text-white hover:bg-zinc-950"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              {error}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-700">
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
              পোস্টে যোগ করুন
            </span>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
            >
              <FiImage aria-hidden="true" className="size-5" />
              ছবি
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept={allowedImageTypes.join(",")}
              onChange={(event) => {
                void selectImage(event.target.files?.[0]);
                event.target.value = "";
              }}
              className="sr-only"
            />
          </div>

          <button
            type="button"
            onClick={publish}
            disabled={isPublishing}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPublishing ? <FiLoader aria-hidden="true" className="animate-spin" /> : <FiSend aria-hidden="true" />}
            পোস্ট করুন
          </button>
        </div>
      </section>
    </div>
  );
}
