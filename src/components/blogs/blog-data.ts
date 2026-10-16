import type { JSONContent } from "@tiptap/react";
import type { BlogCategory, BlogPost, PollVoteState } from "./types";

export const categories: BlogCategory[] = [
  { id: "poll", label: "MCQ Poll" },
  { id: "all", label: "সব লেখা" },
  { id: "preparation", label: "পরীক্ষার প্রস্তুতি" },
  { id: "career", label: "ক্যারিয়ার" },
  { id: "study", label: "পড়াশোনা" },
  { id: "experience", label: "অভিজ্ঞতা" },
];

export const storageKey = "chakriova-blog-posts";
export const pollVotesStorageKey = "chakriova-blog-poll-votes";
export const initialPageSize = 5;
export const pageSize = 4;

function paragraph(text: string): JSONContent {
  return {
    type: "doc",
    content: [{ type: "paragraph", content: [{ type: "text", text }] }],
  };
}

export const samplePosts: BlogPost[] = [
  {
    id: "bcs-study-plan",
    title: "BCS প্রস্তুতি শুরু করবেন যেভাবে: ৬ মাসের বাস্তবসম্মত পরিকল্পনা",
    excerpt:
      "শুরুতেই সব বই কিনে ফেলবেন না। আগে সিলেবাস বুঝুন, নিজের সময়কে ভাগ করুন, আর ছোট ছোট লক্ষ্য নিয়ে নিয়মিত এগিয়ে যান।",
    content: paragraph(
      "শুরুতেই সব বই কিনে ফেলবেন না। আগে সিলেবাস বুঝুন, নিজের সময়কে ভাগ করুন, আর ছোট ছোট লক্ষ্য নিয়ে নিয়মিত এগিয়ে যান। প্রতিদিনের পড়াকে তিন ভাগে ভাগ করতে পারেন—নতুন বিষয়, আগের পড়া রিভিশন এবং MCQ অনুশীলন। সপ্তাহের শেষে নিজের অগ্রগতি যাচাই করুন। পরিকল্পনাটি নিজের বাস্তবতার সঙ্গে মিলিয়ে নিলে দীর্ঘদিন ধরে প্রস্তুতি চালিয়ে যাওয়া অনেক সহজ হয়।",
    ),
    categoryId: "preparation",
    author: "তানজিলা রহমান",
    role: "৪৩তম BCS ক্যাডার",
    initials: "তা",
    publishedAt: "2026-10-15T08:30:00.000Z",
    readTime: 6,
    views: 2480,
    likes: 124,
    accent: "from-emerald-100 via-teal-50 to-cyan-100",
    featured: true,
  },
  {
    id: "daily-routine",
    title: "চাকরির প্রস্তুতির জন্য কার্যকর দৈনিক রুটিন",
    excerpt:
      "পড়ার সময় বেশি হলেই যে প্রস্তুতি ভালো হবে তা নয়। মনোযোগ ধরে রেখে পড়ার জন্য নিজের মতো একটি রুটিন তৈরি করুন।",
    content: paragraph(
      "পড়ার সময় বেশি হলেই যে প্রস্তুতি ভালো হবে তা নয়। মনোযোগ ধরে রেখে পড়ার জন্য নিজের মতো একটি রুটিন তৈরি করুন। ৪৫ মিনিট মনোযোগ দিয়ে পড়ার পর ছোট বিরতি নিন। সকালে কঠিন বিষয়, রাতে রিভিশন—এই পদ্ধতিটি অনেকের জন্য ভালো কাজ করে।",
    ),
    categoryId: "study",
    author: "আরিফুল ইসলাম",
    role: "শিক্ষক ও মেন্টর",
    initials: "আ",
    publishedAt: "2026-10-14T10:15:00.000Z",
    readTime: 4,
    views: 1860,
    likes: 87,
    accent: "from-amber-100 via-orange-50 to-rose-100",
  },
  {
    id: "first-job-interview",
    title: "প্রথম চাকরির ইন্টারভিউতে যে বিষয়গুলো মনে রাখবেন",
    excerpt:
      "ইন্টারভিউ শুধু উত্তর দেওয়ার পরীক্ষা নয়—আপনি কীভাবে ভাবেন, শোনেন এবং নিজের কথা গুছিয়ে বলেন, সেটিও গুরুত্বপূর্ণ।",
    content: paragraph(
      "ইন্টারভিউ শুধু উত্তর দেওয়ার পরীক্ষা নয়—আপনি কীভাবে ভাবেন, শোনেন এবং নিজের কথা গুছিয়ে বলেন, সেটিও গুরুত্বপূর্ণ। প্রতিষ্ঠান সম্পর্কে আগে থেকে জানুন, নিজের পরিচিতি কয়েকবার অনুশীলন করুন এবং উত্তর না জানলে আত্মবিশ্বাসের সঙ্গে সেটি স্বীকার করুন।",
    ),
    categoryId: "career",
    author: "নাফিসা জাহান",
    role: "HR Professional",
    initials: "ন",
    publishedAt: "2026-10-12T06:00:00.000Z",
    readTime: 5,
    views: 1520,
    likes: 69,
    accent: "from-sky-100 via-blue-50 to-indigo-100",
  },
  {
    id: "exam-anxiety",
    title: "পরীক্ষার আগে দুশ্চিন্তা কমানোর ৫টি সহজ উপায়",
    excerpt:
      "পরীক্ষার আগের চাপ একদম দূর করা সম্ভব না হলেও, সঠিক প্রস্তুতি ও বিশ্রাম আপনাকে অনেক বেশি স্থির থাকতে সাহায্য করবে।",
    content: paragraph(
      "পরীক্ষার আগের চাপ একদম দূর করা সম্ভব না হলেও, সঠিক প্রস্তুতি ও বিশ্রাম আপনাকে অনেক বেশি স্থির থাকতে সাহায্য করবে। ঘুম ঠিক রাখুন, শেষ মুহূর্তে নতুন বিষয় না পড়ে পরিচিত বিষয়গুলো ঝালিয়ে নিন, প্রয়োজনীয় কাগজপত্র আগে গুছিয়ে রাখুন এবং ধীরে শ্বাস নেওয়ার অনুশীলন করুন।",
    ),
    categoryId: "experience",
    author: "মাহমুদ হাসান",
    role: "শিক্ষার্থী",
    initials: "মা",
    publishedAt: "2026-10-10T11:45:00.000Z",
    readTime: 3,
    views: 1240,
    likes: 54,
    accent: "from-violet-100 via-fuchsia-50 to-pink-100",
  },
  {
    id: "revision-method",
    title: "পড়া মনে রাখার সহজ কৌশল: Active Recall ও Spaced Repetition",
    excerpt:
      "একই অধ্যায় বারবার পড়ে যাওয়ার বদলে বই বন্ধ করে নিজেকে প্রশ্ন করুন। এই ছোট অভ্যাসটাই রিভিশনকে আরও কার্যকর করে।",
    content: paragraph(
      "একই অধ্যায় বারবার পড়ে যাওয়ার বদলে বই বন্ধ করে নিজেকে প্রশ্ন করুন। এই ছোট অভ্যাসটাই রিভিশনকে আরও কার্যকর করে। আজ যা পড়লেন, পরদিন, এক সপ্তাহ পর এবং এক মাস পর আবার মনে করার চেষ্টা করুন। ভুলগুলো লিখে রাখুন এবং পরেরবার সেই জায়গাগুলোতে বেশি সময় দিন।",
    ),
    categoryId: "study",
    author: "সাব্বির আহমেদ",
    role: "শিক্ষার্থী ও লেখক",
    initials: "সা",
    publishedAt: "2026-10-08T07:20:00.000Z",
    readTime: 5,
    views: 980,
    likes: 42,
    accent: "from-lime-100 via-emerald-50 to-teal-100",
  },
  {
    id: "career-change",
    title: "ক্যারিয়ার পরিবর্তনের সিদ্ধান্ত নেওয়ার আগে নিজেকে যা জিজ্ঞেস করবেন",
    excerpt:
      "নতুন পথে পা বাড়ানোর আগে নিজের দক্ষতা, আগ্রহ এবং দীর্ঘমেয়াদি লক্ষ্য—এই তিনটি দিক একসঙ্গে বিবেচনা করুন।",
    content: paragraph(
      "নতুন পথে পা বাড়ানোর আগে নিজের দক্ষতা, আগ্রহ এবং দীর্ঘমেয়াদি লক্ষ্য—এই তিনটি দিক একসঙ্গে বিবেচনা করুন। কেন পরিবর্তন চান তা লিখে ফেলুন, নতুন ক্ষেত্রের মানুষের সঙ্গে কথা বলুন এবং ছোট একটি প্রকল্প দিয়ে আগ্রহ যাচাই করুন।",
    ),
    categoryId: "career",
    author: "মেহেদী হাসান",
    role: "Career Coach",
    initials: "মে",
    publishedAt: "2026-10-06T09:00:00.000Z",
    readTime: 4,
    views: 870,
    likes: 38,
    accent: "from-rose-100 via-orange-50 to-amber-100",
  },
  {
    id: "sample-poll",
    title: "বাংলাদেশের সংবিধান কবে কার্যকর হয়?",
    excerpt: "সঠিক উত্তরটি বেছে নিন—ভোট দেওয়ার পর উত্তর ও ফলাফল দেখা যাবে।",
    content: paragraph("সঠিক উত্তরটি বেছে নিন—ভোট দেওয়ার পর উত্তর ও ফলাফল দেখা যাবে।"),
    categoryId: "poll",
    author: "Chakriova Team",
    role: "MCQ Poll",
    initials: "চা",
    publishedAt: "2026-10-16T08:30:00.000Z",
    readTime: 1,
    views: 0,
    likes: 0,
    accent: "from-emerald-100 via-teal-50 to-cyan-100",
    poll: {
      options: [
        { id: "option-a", text: "৪ নভেম্বর ১৯৭২", isCorrect: false },
        { id: "option-b", text: "১৬ ডিসেম্বর ১৯৭২", isCorrect: true },
        { id: "option-c", text: "২৬ মার্চ ১৯৭৩", isCorrect: false },
        { id: "option-d", text: "১০ জানুয়ারি ১৯৭২", isCorrect: false },
      ],
      votes: { "option-a": 12, "option-b": 28, "option-c": 5, "option-d": 3 },
      totalVotes: 48,
    },
  },
];

function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Partial<BlogPost>;
  const isBasePost =
    typeof post.id === "string" &&
    typeof post.title === "string" &&
    typeof post.excerpt === "string" &&
    !!post.content &&
    typeof post.content === "object" &&
    typeof post.categoryId === "string" &&
    typeof post.author === "string" &&
    typeof post.role === "string" &&
    typeof post.initials === "string" &&
    typeof post.publishedAt === "string" &&
    typeof post.readTime === "number" &&
    typeof post.views === "number" &&
    typeof post.likes === "number" &&
    typeof post.accent === "string";
  if (!isBasePost) return false;
  if (post.poll === undefined) return true;
  return (
    post.categoryId === "poll" &&
    Array.isArray(post.poll.options) &&
    post.poll.options.length >= 2 &&
    post.poll.options.every(
      (option) =>
        !!option &&
        typeof option.id === "string" &&
        typeof option.text === "string" &&
        typeof option.isCorrect === "boolean",
    ) &&
    !!post.poll.votes &&
    typeof post.poll.votes === "object" &&
    typeof post.poll.totalVotes === "number"
  );
}

export function readSavedPosts(): BlogPost[] {
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return [];

  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed) || !parsed.every(isBlogPost)) {
    throw new Error("সংরক্ষিত পোস্টের তথ্য পড়া যায়নি। ব্রাউজারের ডেটা পরীক্ষা করুন।");
  }
  return parsed;
}

export function readSavedPollVotes(): Record<string, PollVoteState> {
  const saved = window.localStorage.getItem(pollVotesStorageKey);
  if (!saved) return {};

  const parsed: unknown = JSON.parse(saved);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("সংরক্ষিত poll ভোটের তথ্য পড়া যায়নি।");
  }

  for (const value of Object.values(parsed)) {
    if (
      !value ||
      typeof value !== "object" ||
      typeof value.selectedOptionId !== "string" ||
      !value.votes ||
      typeof value.votes !== "object" ||
      typeof value.totalVotes !== "number"
    ) {
      throw new Error("সংরক্ষিত poll ভোটের তথ্য পড়া যায়নি।");
    }
  }

  return parsed as Record<string, PollVoteState>;
}

export function categoryLabel(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.label ?? "অন্যান্য";
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
