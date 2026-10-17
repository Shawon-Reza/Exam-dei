"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowDown, FiArrowRight, FiBarChart2, FiBookOpen, FiBookmark, FiCheck, FiEdit3, FiFileText, FiMessageCircle, FiRefreshCw, FiSearch, FiShare2, FiUsers, FiX } from "react-icons/fi";
import { categories, categoryLabel, initialPageSize, pageSize, pollVotesStorageKey, readSavedPollVotes, readSavedPosts, samplePosts, storageKey } from "./blog-data";
import { RichTextComposer } from "./BlogEditor";
import { BlogPostCard } from "./BlogPostCard";
import { PostReader } from "./BlogPostReader";
import { PollComposer } from "./PollComposer";
import { PollCard } from "./PollCard";
import { getBlogPostUrl } from "../../lib/site-config";
import type { BlogPost, PollOption, PollVoteState } from "./types";
import type { JSONContent } from "@tiptap/react";

type ComposerMode = "blog" | "poll" | null;

export default function BlogExperience() {
  const [userPosts, setUserPosts] = useState<BlogPost[]>([]);
  const [pollVotes, setPollVotes] = useState<Record<string, PollVoteState>>({});
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("poll");
  const [visibleCount, setVisibleCount] = useState(initialPageSize);
  const [sharedPostId, setSharedPostId] = useState<string | null>(null);
  const [composerMode, setComposerMode] = useState<ComposerMode>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [notice, setNotice] = useState("");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");
    const requestedPostId = params.get("post");
    const sharedCategory = categories.find((category) => category.id === requestedCategory);

    const timeout = window.setTimeout(() => {
      setSharedPostId(requestedPostId);
      setActiveCategory(requestedPostId ? "all" : sharedCategory?.id ?? "poll");

      try {
        setUserPosts(readSavedPosts());
        setPollVotes(readSavedPollVotes());
      } catch (error) {
        setStorageError(
          error instanceof Error ? error.message : "সংরক্ষিত পোস্ট লোড করা যায়নি।",
        );
      } finally {
        setStorageReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const posts = useMemo(
    () => [...userPosts, ...samplePosts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    ),
    [userPosts],
  );

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return posts.filter((post) => {
      if (sharedPostId && post.id !== sharedPostId) return false;
      const matchesCategory = activeCategory === "all" || post.categoryId === activeCategory;
      const searchable = `${post.title} ${post.excerpt} ${post.author} ${categoryLabel(post.categoryId)}`
        .toLocaleLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [activeCategory, posts, search, sharedPostId]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || visibleCount >= filteredPosts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((count) => Math.min(count + pageSize, filteredPosts.length));
        }
      },
      { rootMargin: "220px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredPosts.length, visibleCount]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    if (!sharedPostId || !storageReady || filteredPosts.length === 0) return;
    document.getElementById(`blog-${sharedPostId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [filteredPosts.length, sharedPostId, storageReady]);

  function refreshPosts() {
    try {
      setUserPosts(readSavedPosts());
      setPollVotes(readSavedPollVotes());
      setStorageError("");
      setVisibleCount(initialPageSize);
      setRefreshCount((count) => count + 1);
      setNotice("সর্বশেষ পোস্টগুলো দেখানো হচ্ছে");
    } catch (error) {
      setStorageError(
        error instanceof Error ? error.message : "পোস্ট রিফ্রেশ করা যায়নি।",
      );
    }
  }

  function publishPost(title: string, categoryId: string, content: JSONContent, excerpt: string) {
    if (!storageReady) return;
    const newPost: BlogPost = {
      id: `community-${Date.now()}`,
      title,
      excerpt,
      content,
      categoryId,
      author: "আপনি",
      role: "কমিউনিটি লেখক",
      initials: "আ",
      publishedAt: new Date().toISOString(),
      readTime: Math.max(1, Math.ceil(excerpt.split(/\s+/).length / 200)),
      views: 1,
      likes: 0,
      accent: "from-emerald-100 via-teal-50 to-cyan-100",
    };

    const updatedPosts = [newPost, ...userPosts];
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(updatedPosts));
      console.log("Published blog post data:", newPost);
      setUserPosts(updatedPosts);
      setSearch("");
      dismissSharedPost();
      setActiveCategory("all");
      setVisibleCount(initialPageSize);
      setComposerMode(null);
      setNotice("আপনার ব্লগটি প্রকাশিত হয়েছে");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStorageError("পোস্ট সংরক্ষণ করা যায়নি। ব্রাউজারের storage space পরীক্ষা করুন।");
    }
  }

  function publishPoll(question: string, description: string, options: PollOption[]) {
    if (!storageReady) return;
    const content: JSONContent = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: description || question }],
        },
      ],
    };
    const newPoll: BlogPost = {
      id: `community-poll-${Date.now()}`,
      title: question,
      excerpt: description,
      content,
      categoryId: "poll",
      author: "আপনি",
      role: "কমিউনিটি Poll",
      initials: "আ",
      publishedAt: new Date().toISOString(),
      readTime: 1,
      views: 0,
      likes: 0,
      accent: "from-emerald-100 via-teal-50 to-cyan-100",
      poll: {
        options,
        votes: Object.fromEntries(options.map((option) => [option.id, 0])),
        totalVotes: 0,
      },
    };
    const updatedPosts = [newPoll, ...userPosts];

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(updatedPosts));
      console.log("Published blog poll data:", newPoll);
      setUserPosts(updatedPosts);
      setSearch("");
      dismissSharedPost();
      setActiveCategory("poll");
      setVisibleCount(initialPageSize);
      setComposerMode(null);
      setNotice("আপনার Poll প্রকাশিত হয়েছে");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStorageError("Poll সংরক্ষণ করা যায়নি। ব্রাউজারের storage space পরীক্ষা করুন।");
    }
  }

  function voteOnPoll(post: BlogPost & { poll: NonNullable<BlogPost["poll"]> }, optionId: string) {
    if (pollVotes[post.id]) return;
    const selectedOption = post.poll.options.find((option) => option.id === optionId);
    if (!selectedOption) return;
    const votes = { ...post.poll.votes, [optionId]: (post.poll.votes[optionId] ?? 0) + 1 };
    const voteState: PollVoteState = {
      selectedOptionId: optionId,
      votes,
      totalVotes: post.poll.totalVotes + 1,
    };
    const updatedVotes = { ...pollVotes, [post.id]: voteState };

    try {
      window.localStorage.setItem(pollVotesStorageKey, JSON.stringify(updatedVotes));
      setPollVotes(updatedVotes);
      console.log("Submitted blog poll vote:", {
        pollId: post.id,
        question: post.title,
        selectedOption,
        isCorrect: selectedOption.isCorrect,
        correctAnswer: post.poll.options.find((option) => option.isCorrect),
        totalVotes: voteState.totalVotes,
      });
    } catch {
      setStorageError("আপনার poll vote সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  function toggleLike(postId: string) {
    setLikedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  function dismissSharedPost() {
    setSharedPostId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("post");
    url.hash = "";
    window.history.replaceState(null, "", url);
  }

  return (
    <main className="flex-1 bg-[#f0f2f5] text-zinc-900 dark:bg-[#111315] dark:text-white">
      <div className="mx-auto max-w-[1440px] px-3 pb-20 pt-5 sm:px-6 lg:px-8">
        <section className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:px-7">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <FiUsers aria-hidden="true" className="size-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
                Chakriova community
              </p>
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                কমিউনিটি ফিড
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                শিখুন, অভিজ্ঞতা ভাগ করুন, একসঙ্গে এগিয়ে চলুন।
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:pr-2">
            <span className="hidden size-2 rounded-full bg-emerald-500 sm:block" />
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {(userPosts.length + 48).toLocaleString("bn-BD")} জন কমিউনিটি লেখক
            </span>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[205px_minmax(0,680px)_260px] xl:grid-cols-[225px_minmax(0,700px)_280px]">
          <nav aria-label="কমিউনিটি নেভিগেশন" className="hidden space-y-2 lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                আপনার ফিড
              </p>
              {[
                { id: "poll", label: "MCQ Poll", icon: FiBarChart2 },
                { id: "all", label: "সব পোস্ট", icon: FiBookOpen },
                { id: "preparation", label: "পরীক্ষার প্রস্তুতি", icon: FiFileText },
                { id: "career", label: "ক্যারিয়ার", icon: FiUsers },
                { id: "study", label: "পড়াশোনা", icon: FiBookmark },
                { id: "experience", label: "অভিজ্ঞতা", icon: FiMessageCircle },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setVisibleCount(initialPageSize);
                      dismissSharedPost();
                      setActiveCategory(item.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200"
                        : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-[18px] shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="rounded-2xl px-3 py-2 text-xs leading-5 text-zinc-400">
              Chakriova · কমিউনিটি নিয়ম · গোপনীয়তা
            </div>
          </nav>

          <div className="min-w-0 lg:col-start-2">
            {composerMode === null && (
              <section aria-label="নতুন পোস্ট তৈরি করুন" className="mb-4 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    আ
                  </span>
                  <button
                    type="button"
                    onClick={() => setComposerMode("blog")}
                    className="flex h-11 flex-1 items-center rounded-full bg-zinc-100 px-5 text-left text-sm text-zinc-500 transition hover:bg-zinc-200/70 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  >
                    আজ কী শেয়ার করতে চান?
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setComposerMode("blog")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300"
                  >
                    <FiEdit3 aria-hidden="true" className="text-emerald-600" />
                    লেখা লিখুন
                  </button>
                  <button
                    type="button"
                    onClick={() => setComposerMode("poll")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-sky-50 hover:text-sky-700 dark:text-zinc-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-300"
                  >
                    <FiBarChart2 aria-hidden="true" className="text-sky-600" />
                    MCQ Poll
                  </button>
                </div>
              </section>
            )}
            {composerMode === "blog" && (
              <RichTextComposer
                onPublish={publishPost}
                onCancel={() => setComposerMode(null)}
                onNotice={setNotice}
              />
            )}
            {composerMode === "poll" && (
              <PollComposer
                onPublish={publishPoll}
                onCancel={() => setComposerMode(null)}
              />
            )}

            <section id="blog-feed" aria-labelledby="feed-heading">
              <div className="mb-3 flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:px-5">
                <div>
                  <h2 id="feed-heading" className="text-base font-extrabold text-zinc-900 dark:text-white">
                    {activeCategory === "poll" ? "কমিউনিটির MCQ Poll" : activeCategory === "all" ? "সবার পোস্ট" : categoryLabel(activeCategory)}
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {filteredPosts.length.toLocaleString("bn-BD")}টি পোস্ট
                  </p>
                </div>
                <button
                  type="button"
                  onClick={refreshPosts}
                  aria-label="ফিড রিফ্রেশ করুন"
                  className="grid size-10 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-emerald-300"
                >
                  <FiRefreshCw aria-hidden="true" className={`size-4 ${refreshCount % 2 ? "rotate-180 transition-transform" : "transition-transform"}`} />
                </button>
              </div>

              <label className="mb-3 flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900">
                <FiSearch aria-hidden="true" className="size-5 shrink-0 text-zinc-400" />
                <input
                  value={search}
                  onChange={(event) => {
                    setVisibleCount(initialPageSize);
                    setSearch(event.target.value);
                  }}
                  placeholder="শিরোনাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
                  aria-label="ব্লগ পোস্ট খুঁজুন"
                  className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="সার্চ মুছুন"
                    onClick={() => {
                      setVisibleCount(initialPageSize);
                      setSearch("");
                    }}
                    className="grid size-7 shrink-0 place-items-center rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <FiX aria-hidden="true" />
                  </button>
                )}
              </label>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => {
                  const active = category.id === activeCategory;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setVisibleCount(initialPageSize);
                        dismissSharedPost();
                        setActiveCategory(category.id);
                      }}
                      aria-pressed={active}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                        active
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                          : "border border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-800"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>

              {storageError && (
                <div role="alert" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  {storageError}
                </div>
              )}

              {visiblePosts.length > 0 ? (
                <div className="space-y-4">
                  {visiblePosts.map((post) =>
                    post.poll ? (
                      <PollCard
                        key={post.id}
                        post={post as BlogPost & { poll: NonNullable<BlogPost["poll"]> }}
                        voteState={pollVotes[post.id]}
                        onVote={voteOnPoll}
                        shareUrl={getBlogPostUrl(post.id)}
                      />
                    ) : (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        onRead={() => setSelectedPost(post)}
                        liked={likedPosts.includes(post.id)}
                        onLike={() => toggleLike(post.id)}
                        shareUrl={getBlogPostUrl(post.id)}
                      />
                    ),
                  )}
                </div>
              ) : sharedPostId && storageReady ? (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
                  <h3 className="text-base font-bold text-zinc-800 dark:text-white">
                    এই পোস্টটি পাওয়া যায়নি
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    এই ডেমোতে পোস্টগুলো শুধু যিনি প্রকাশ করেছেন তাঁর browser-এ থাকে। অন্যদের সঙ্গে পোস্টটি শেয়ার করতে হলে সার্ভারে প্রকাশনার সুবিধা প্রয়োজন।
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      dismissSharedPost();
                      setVisibleCount(initialPageSize);
                      setActiveCategory("poll");
                    }}
                    className="mt-4 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                  >
                    কমিউনিটি ফিডে ফিরে যান
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                    <FiSearch aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-zinc-800 dark:text-white">
                    কোনো লেখা পাওয়া যায়নি
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">অন্য শব্দ দিয়ে খুঁজে দেখুন অথবা সব বিষয় বেছে নিন।</p>
                  <button
                    type="button"
                    onClick={() => {
                      setVisibleCount(initialPageSize);
                      setSearch("");
                      dismissSharedPost();
                      setActiveCategory("poll");
                    }}
                    className="mt-4 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                  >
                    সব লেখা দেখুন
                  </button>
                </div>
              )}
              {visibleCount < filteredPosts.length && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((count) => Math.min(count + pageSize, filteredPosts.length))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    আরও লেখা দেখুন <FiArrowDown aria-hidden="true" />
                  </button>
                </div>
              )}
            </section>
          </div>

          <aside className="hidden space-y-5 lg:sticky lg:top-24 lg:col-start-3 lg:block lg:self-start">
            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="grid size-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <FiEdit3 aria-hidden="true" className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-zinc-900 dark:text-white">
                আপনার অভিজ্ঞতাও কাজে লাগতে পারে
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                আপনার শেখা কৌশল, প্রস্তুতির গল্প কিংবা ক্যারিয়ারের অভিজ্ঞতা কমিউনিটির সঙ্গে ভাগ করুন।
              </p>
              <button
                type="button"
                onClick={() => {
                  setComposerMode("blog");
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-emerald-300"
              >
                লেখা শুরু করুন <FiArrowRight aria-hidden="true" />
              </button>
            </section>

            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-base font-extrabold text-zinc-900 dark:text-white">কমিউনিটি ফিড</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">এই মুহূর্তের ফিডের সারসংক্ষেপ</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-800">
                  <p className="text-xl font-black text-zinc-900 dark:text-white">{posts.length.toLocaleString("bn-BD")}</p>
                  <p className="mt-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">মোট পোস্ট</p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-3 dark:bg-sky-950/50">
                  <p className="text-xl font-black text-sky-800 dark:text-sky-200">
                    {posts.filter((post) => post.poll).length.toLocaleString("bn-BD")}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-sky-700 dark:text-sky-300">MCQ Poll</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-emerald-50 p-6 dark:bg-emerald-950/40">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <FiBookmark aria-hidden="true" />
                <h2 className="text-sm font-extrabold">একসঙ্গে এগিয়ে চলুন</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-emerald-900/70 dark:text-emerald-100/70">
                ভালো একটি অভিজ্ঞতা হয়তো কারও প্রস্তুতির পথটিই বদলে দিতে পারে।
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <FiMessageCircle aria-hidden="true" />
                <span>পড়ুন · শিখুন · ভাগ করুন</span>
                <FiShare2 aria-hidden="true" className="ml-auto" />
              </div>
            </section>
          </aside>
        </div>
      </div>

      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-zinc-900">
          <FiCheck aria-hidden="true" className="text-emerald-400 dark:text-emerald-600" />
          {notice}
        </div>
      )}
      {selectedPost && (
        <PostReader post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
}
