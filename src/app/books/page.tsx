import type { Metadata } from "next";
import { FiBook, FiBookOpen, FiCheckCircle, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "বই ও গাইড | চাকরির প্রস্তুতি",
  description: "চাকরির পরীক্ষার প্রস্তুতির জন্য প্রয়োজনীয় বই ও গাইড এক জায়গায় দেখুন।",
};

const books = [
  {
    title: "বাংলা প্রস্তুতি গাইড",
    category: "বাংলা",
    description: "ব্যাকরণ ও সাহিত্যের গুরুত্বপূর্ণ অধ্যায় দ্রুত রিভিশনের জন্য।",
    tags: ["ব্যাকরণ", "সাহিত্য", "MCQ"],
  },
  {
    title: "English Job Solution",
    category: "ইংরেজি",
    description: "Grammar, vocabulary এবং previous question ভিত্তিক অনুশীলন।",
    tags: ["Grammar", "Vocabulary", "Practice"],
  },
  {
    title: "সাধারণ জ্ঞান সংক্ষিপ্ত তথ্য",
    category: "সাধারণ জ্ঞান",
    description: "বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলির প্রয়োজনীয় তথ্য সহজ ভাষায়।",
    tags: ["বাংলাদেশ", "আন্তর্জাতিক", "সাম্প্রতিক"],
  },
  {
    title: "গণিত শর্টকাট",
    category: "গণিত",
    description: "চাকরির পরীক্ষায় দ্রুত সমাধানের জন্য সূত্র ও কৌশল।",
    tags: ["সূত্র", "শর্টকাট", "মডেল টেস্ট"],
  },
];

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-8 dark:bg-zinc-950 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <FiBook aria-hidden="true" /> Books & guides
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            প্রস্তুতির জন্য দরকারি বই
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            বিষয়ভিত্তিক বই ও গাইড দেখে আপনার প্রস্তুতির পরবর্তী ধাপ ঠিক করুন।
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <article key={book.title} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid size-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FiBookOpen aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400">{book.category}</p>
              <h2 className="mt-1 text-lg font-extrabold text-zinc-950 dark:text-white">{book.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{book.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{tag}</span>
                ))}
              </div>
              <button type="button" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 px-3 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-950/40">
                বিস্তারিত দেখুন <FiExternalLink aria-hidden="true" />
              </button>
            </article>
          ))}
        </section>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200">
          <FiCheckCircle className="mt-0.5 shrink-0" aria-hidden="true" />
          আরও বই ও PDF যুক্ত হলে এই তালিকা নিয়মিত আপডেট করা হবে।
        </div>
      </div>
    </main>
  );
}
