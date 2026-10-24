import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { examCategories, learningFeatures, painPoints } from "./landing-data";

export function PainPointsSection() {
  return (
    <section className="scroll-mt-24 bg-white py-16 dark:bg-zinc-900/40 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="We get it · আমরা বুঝি"
          title="প্রস্তুতি নিতে গিয়ে যেসব বাধা আসে"
          description="একটা ভালো study plan শুধু পড়ার বিষয় নয়—এটা আপনাকে সঠিক পথে, সঠিক গতিতে এগোতে সাহায্য করে।"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900 dark:hover:bg-zinc-800/80"
              >
                <span className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-amber-500/10 text-amber-600 dark:text-amber-300" : "bg-rose-500/10 text-rose-600 dark:text-rose-300"}`}>
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                  {index === 0 ? "Not sure where to begin?" : index === 1 ? "Can't stay consistent?" : "Not seeing your progress?"}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LearningFeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 bg-zinc-50 py-16 dark:bg-zinc-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="One platform · সব এক জায়গায়"
          title="আপনার প্রস্তুতির জন্য যা যা দরকার"
          description="From your first study session to your final mock exam—সবকিছু এক জায়গায়, আপনার সুবিধামতো।"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {learningFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-7 flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-sm font-bold text-zinc-300 dark:text-zinc-700">0{index + 1}</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{feature.englishTitle}</p>
                <h3 className="mt-2 text-lg font-bold text-zinc-950 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExamCategoriesSection() {
  return (
    <section id="exams" className="scroll-mt-24 bg-white py-16 dark:bg-zinc-900/40 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Find your path · লক্ষ্য ঠিক করুন"
          title="আপনি কোন পরীক্ষার জন্য প্রস্তুতি নিচ্ছেন?"
          description="আপনার লক্ষ্য অনুযায়ী সাজানো resources বেছে নিন। We’ll help you take it one step at a time."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.englishTitle}
                href={category.href}
                className="group flex min-h-48 flex-col rounded-3xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${category.accent}`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <FiArrowRight aria-hidden="true" className="mt-2 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-emerald-500" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-zinc-950 dark:text-white">{category.title}</h3>
                <p className="text-xs font-medium text-zinc-400">{category.englishTitle}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{category.description}</p>
                <p className="mt-auto pt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{category.count}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
