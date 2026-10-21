import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiArrowRight, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { getNoteSubject, noteSubjects } from "@/src/components/resources/notes-data";

type NotesPageProps = {
  params: Promise<{ subject: string }>;
};

export function generateStaticParams() {
  return noteSubjects.map((subject) => ({ subject: subject.slug }));
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = getNoteSubject(slug);

  return subject
    ? {
        title: `${subject.label} নোট | চাকরির প্রস্তুতি`,
        description: subject.description,
      }
    : { title: "নোট পাওয়া যায়নি" };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { subject: slug } = await params;
  const subject = getNoteSubject(slug);
  if (!subject) notFound();

  return (
    <main className="min-h-screen bg-zinc-50 py-8 dark:bg-zinc-950 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-lg sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">
            <FiBookOpen aria-hidden="true" /> {subject.englishLabel}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">{subject.label} নোট</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base">{subject.description}</p>
        </header>

        <div className="mt-8 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white">গুরুত্বপূর্ণ টপিক</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">একটি টপিক বেছে নিয়ে নোট পড়া শুরু করুন।</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {subject.topics.length}টি টপিক
          </span>
        </div>

        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subject.topics.map((topic, index) => (
            <article key={topic} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/10 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <FiCheckCircle className="text-zinc-300 dark:text-zinc-700" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-extrabold text-zinc-900 dark:text-white">{topic}</h3>
              <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                সংক্ষিপ্ত ধারণা, গুরুত্বপূর্ণ তথ্য ও পরীক্ষার উপযোগী অনুশীলন।
              </p>
              <button type="button" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                নোট পড়ুন <FiArrowRight aria-hidden="true" />
              </button>
            </article>
          ))}
        </section>

        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-bold text-zinc-900 dark:text-white">আরও বিস্তারিত নোট শীঘ্রই যুক্ত হবে</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Admin panel থেকে আসল অধ্যায় ও PDF যুক্ত হলে এখান থেকেই পড়তে পারবেন।
          </p>
        </div>
      </div>
    </main>
  );
}
