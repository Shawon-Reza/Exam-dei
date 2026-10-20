"use client";

import { useMemo, useState, type FormEvent } from "react";
import { FiEdit2, FiFileText, FiFilter, FiHelpCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { RichTextComposer } from "../../blogs/BlogEditor";
import { categories } from "../../blogs/blog-data";
import type { BlogPost } from "../../blogs/types";
import type { NoticeHandler } from "../types";
import { AdminDialog, DialogActions, Field, inputClass, Panel, PrimaryButton, SearchBox, SectionHeading, SmallStat, TableFooter } from "../ui/AdminPrimitives";

export default function BlogsSection({
  posts,
  onChange,
  onNotice,
}: {
  posts: BlogPost[];
  onChange: (posts: BlogPost[]) => void;
  onNotice: NoticeHandler;
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showComposer, setShowComposer] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const filtered = useMemo(() => posts.filter((post) =>
    `${post.title} ${post.author}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()) &&
    (categoryFilter === "all" || post.categoryId === categoryFilter),
  ), [categoryFilter, posts, search]);

  function publishPost(title: string, categoryId: string, content: BlogPost["content"], excerpt: string) {
    const post: BlogPost = {
      id: `admin-blog-${Date.now()}`,
      title,
      excerpt,
      content,
      categoryId,
      author: "Admin",
      role: "Chakriova Team",
      initials: "A",
      publishedAt: new Date().toISOString(),
      readTime: Math.max(1, Math.ceil(excerpt.split(/\s+/).length / 200)),
      views: 0,
      likes: 0,
      accent: "from-emerald-100 via-teal-50 to-cyan-100",
    };
    onChange([post, ...posts]);
    setShowComposer(false);
    onNotice("নতুন ব্লগ পোস্ট প্রকাশিত হয়েছে");
  }

  function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingPost) return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    onChange(posts.map((post) => post.id === editingPost.id
      ? { ...post, title, excerpt: String(form.get("excerpt") ?? "").trim(), categoryId: String(form.get("categoryId") ?? "preparation") }
      : post,
    ));
    setEditingPost(null);
    onNotice("পোস্টের তথ্য আপডেট হয়েছে");
  }

  function removePost(id: string) {
    onChange(posts.filter((post) => post.id !== id));
    onNotice("পোস্টটি মুছে ফেলা হয়েছে");
  }

  return (
    <>
      <SectionHeading
        eyebrow="Content studio"
        title="Blogs & Content"
        description="ব্লগ পোস্ট ও কমিউনিটি কনটেন্ট প্রকাশনা নিয়ন্ত্রণ করুন।"
        action={<PrimaryButton onClick={() => setShowComposer((visible) => !visible)}><FiPlus aria-hidden="true" /> নতুন পোস্ট</PrimaryButton>}
      />
      {showComposer && (
        <RichTextComposer
          onPublish={publishPost}
          onCancel={() => setShowComposer(false)}
          onNotice={onNotice}
        />
      )}
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SmallStat label="মোট কনটেন্ট" value={posts.length.toLocaleString("bn-BD")} icon={<FiFileText />} />
        <SmallStat label="ব্লগ পোস্ট" value={posts.filter((post) => post.categoryId !== "poll").length.toLocaleString("bn-BD")} icon={<FiFileText />} />
        <SmallStat label="MCQ Poll" value={posts.filter((post) => post.categoryId === "poll").length.toLocaleString("bn-BD")} icon={<FiHelpCircle />} />
      </div>
      <Panel>
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <SearchBox value={search} onChange={setSearch} placeholder="পোস্টের শিরোনাম বা লেখক খুঁজুন..." />
          <label className="flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"><FiFilter aria-hidden="true" /><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="কনটেন্ট category filter" className="max-w-44 bg-transparent text-zinc-700 outline-none dark:text-zinc-200"><option value="all">সব category</option>{categories.filter((category) => category.id !== "all").map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {filtered.map((post) => (
            <article key={post.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <FiFileText aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-zinc-900 dark:text-white">{post.title}</p>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  {post.author} · {categories.find((category) => category.id === post.categoryId)?.label ?? "অন্যান্য"} · {post.views.toLocaleString("bn-BD")} views
                </p>
              </div>
              <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">প্রকাশিত</span>
              <button type="button" onClick={() => setEditingPost(post)} aria-label={`${post.title} সম্পাদনা`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <FiEdit2 aria-hidden="true" />
              </button>
              <button type="button" onClick={() => removePost(post.id)} aria-label={`${post.title} মুছুন`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40">
                <FiTrash2 aria-hidden="true" />
              </button>
            </article>
          ))}
          {filtered.length === 0 && <p className="p-10 text-center text-sm text-zinc-500">কোনো কনটেন্ট পাওয়া যায়নি।</p>}
        </div>
        <TableFooter count={filtered.length} label="টি কনটেন্ট" />
      </Panel>
      {editingPost && (
        <AdminDialog title="ব্লগ পোস্ট সম্পাদনা" onClose={() => setEditingPost(null)}>
          <form onSubmit={savePost} className="space-y-4">
            <Field label="শিরোনাম">
              <input name="title" required maxLength={120} autoFocus defaultValue={editingPost.title} className={inputClass} />
            </Field>
            <Field label="সংক্ষিপ্ত বিবরণ">
              <textarea name="excerpt" rows={4} defaultValue={editingPost.excerpt} className={`${inputClass} resize-y`} />
            </Field>
            <Field label="Category">
              <select name="categoryId" defaultValue={editingPost.categoryId} className={inputClass}>
                {categories.filter((category) => category.id !== "all").map((category) => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </Field>
            <DialogActions onCancel={() => setEditingPost(null)} submitLabel="পরিবর্তন সংরক্ষণ" />
          </form>
        </AdminDialog>
      )}
    </>
  );
}
