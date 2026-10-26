import { FiCheck, FiCompass, FiHeart } from "react-icons/fi";

const platformBenefits = [
  "বিষয়ভিত্তিক প্রস্তুতি এক জায়গায় সাজানো",
  "নিজের সুবিধামতো সময়ে শেখা ও অনুশীলন",
  "নিয়মিত চর্চার জন্য পরিষ্কার, সহজ অভিজ্ঞতা",
];

export default function AboutStory() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <article
        id="why-platform"
        className="scroll-mt-28 rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-7 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-9"
      >
        <span className="grid size-12 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm dark:bg-zinc-800 dark:text-emerald-300">
          <FiCompass aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          Why Chakriova
        </p>
        <h2 className="mt-2 text-2xl font-black text-zinc-950 dark:text-white sm:text-3xl">
          প্রস্তুতির প্রতিটি ধাপ হোক আরও সহজ
        </h2>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
          চাকরির প্রস্তুতিতে ধারাবাহিকতা গুরুত্বপূর্ণ। তাই প্রয়োজনীয় শেখার উপকরণ
          ও অনুশীলনকে সহজে ব্যবহারযোগ্য একটি অভিজ্ঞতায় একত্র করার চেষ্টা Chakriova-র।
        </p>
        <ul className="mt-6 space-y-3">
          {platformBenefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                <FiCheck aria-hidden="true" className="size-3.5" />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </article>

      <article
        id="motivation"
        className="scroll-mt-28 relative isolate overflow-hidden rounded-[1.75rem] bg-emerald-600 p-7 text-white sm:p-9"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 -z-10 size-64 rounded-full border-[40px] border-white/10"
        />
        <span className="grid size-12 place-items-center rounded-2xl bg-white/15 text-white">
          <FiHeart aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
          The motivation
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl">
          একটি উপকারী ধারণা থেকেই শুরু
        </h2>
        <p className="mt-4 leading-7 text-emerald-50">
          চাকরির প্রস্তুতির পথে তথ্য, সময় এবং সঠিক অনুশীলন খুঁজে পাওয়া অনেক সময়
          কঠিন হয়ে যায়। এই অভিজ্ঞতাকে আরও গোছানো ও সবার নাগালে আনার ইচ্ছা থেকেই
          Chakriova তৈরির যাত্রা।
        </p>
        <p className="mt-4 leading-7 text-emerald-50">
          এটি একটি চলমান উদ্যোগ—ব্যবহারকারীদের প্রয়োজন বুঝে নতুন সুবিধা যোগ করা
          এবং শেখার অভিজ্ঞতা উন্নত করাই এর অনুপ্রেরণা।
        </p>
      </article>
    </section>
  );
}
