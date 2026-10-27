import { FiClock, FiEye, FiGlobe, FiHeart, FiMessageCircle } from "react-icons/fi";
import { categoryLabel, formatDate } from "./blog-data";
import FacebookShareButton from "../share/FacebookShareButton";
import type { BlogPost } from "./types";

export function BlogPostCard({
  post,
  onRead,
  onLike,
  shareUrl,
  liked,
}: {
  post: BlogPost;
  onRead: () => void;
  onLike: () => void;
  shareUrl: string;
  liked: boolean;
}) {
  return (
    <article id={`blog-${post.id}`} className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3 px-4 pb-0 pt-4 sm:px-5 sm:pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 text-sm font-extrabold text-emerald-900 ring-2 ring-emerald-50 dark:from-emerald-900 dark:to-teal-800 dark:text-emerald-100 dark:ring-zinc-800">
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
        <FacebookShareButton
          url={shareUrl}
          label="Facebook-এ পোস্টটি শেয়ার করুন"
          iconOnly
          className="size-9 shrink-0 rounded-full text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/50"
        />
      </div>
      <div className="px-4 pb-3 pt-4 sm:px-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
            {categoryLabel(post.categoryId)}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
            <FiClock aria-hidden="true" /> {post.readTime} মিনিট পড়া
          </span>
          {post.featured && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              Featured
            </span>
          )}
        </div>
        <button type="button" onClick={onRead} className="block w-full text-left">
          <h2 className="text-lg font-extrabold leading-snug text-zinc-900 transition hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400">
            {post.title}
          </h2>
        </button>
        <p className="mt-2 line-clamp-4 whitespace-pre-line text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          {post.excerpt}
        </p>
        <button
          type="button"
          onClick={onRead}
          className="mt-1 text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-400"
        >
          আরও পড়ুন
        </button>
      </div>
      <div className="mx-4 border-t border-zinc-100 dark:border-zinc-800 sm:mx-5">
        <div className="flex items-center justify-between py-2 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="grid size-5 place-items-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950">
              <FiHeart aria-hidden="true" className="size-3" />
            </span>
            {post.likes.toLocaleString("bn-BD") + (liked ? 1 : 0)}টি প্রতিক্রিয়া
          </span>
          <span className="inline-flex items-center gap-1">
            <FiEye aria-hidden="true" /> {post.views.toLocaleString("bn-BD")} বার দেখা
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 border-t border-zinc-100 py-1 dark:border-zinc-800">
          <button
            type="button"
            onClick={onLike}
            aria-label={liked ? "পছন্দ সরিয়ে নিন" : "পছন্দ করুন"}
            aria-pressed={liked}
            className={`inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${liked ? "text-rose-500" : "text-zinc-500 dark:text-zinc-400"
              }`}
          >
            <FiHeart aria-hidden="true" className={liked ? "fill-current" : ""} />
            পছন্দ
          </button>
          <button
            type="button"
            onClick={onRead}
            className="inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <FiMessageCircle aria-hidden="true" />
            পড়ুন
          </button>
          <FacebookShareButton
            url={shareUrl}
            className="w-full rounded-lg py-2.5 text-sm font-bold text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/50"
          />
        </div>
      </div>
    </article>
  );
}
