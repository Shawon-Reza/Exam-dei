import type { JSONContent } from "@tiptap/react";

export type BlogCategory = {
  id: string;
  label: string;
};

export type PollOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type BlogPoll = {
  options: PollOption[];
  votes: Record<string, number>;
  totalVotes: number;
};

export type PollVoteState = {
  selectedOptionId: string;
  votes: Record<string, number>;
  totalVotes: number;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: JSONContent;
  categoryId: string;
  author: string;
  role: string;
  initials: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  accent: string;
  featured?: boolean;
  poll?: BlogPoll;
};
