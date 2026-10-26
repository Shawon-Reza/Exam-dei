import { FiArrowUpRight, FiCode, FiMapPin } from "react-icons/fi";
import { developerProfile } from "./about-data";

export default function AboutDeveloper() {
  return (
    <section
      id="developer"
      aria-labelledby="developer-heading"
      className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative isolate flex min-h-64 items-center justify-center overflow-hidden bg-zinc-950 p-8">
          <div
            aria-hidden="true"
            className="absolute -left-12 top-0 -z-10 size-56 rounded-full bg-emerald-500/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-8 -z-10 size-56 rounded-full bg-blue-500/20 blur-3xl"
          />
          <div className="grid size-36 place-items-center rounded-full border border-white/15 bg-white/10 text-4xl font-black tracking-tight text-white shadow-2xl backdrop-blur">
            SR
          </div>
          <span className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-2 text-xs font-medium text-zinc-300">
            <FiCode aria-hidden="true" className="text-emerald-300" />
            Building Chakriova
          </span>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            The person behind the platform
          </p>
          <h2
            id="developer-heading"
            className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white"
          >
            {developerProfile.name}
          </h2>
          <p className="mt-2 font-semibold text-emerald-700 dark:text-emerald-300">
            {developerProfile.role}
          </p>
          <p className="mt-5 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
            {developerProfile.bio}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <FiMapPin aria-hidden="true" className="text-emerald-600 dark:text-emerald-400" />
              Bangladesh
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <FiCode aria-hidden="true" className="text-emerald-600 dark:text-emerald-400" />
              Product & Development
            </span>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            কথা বলুন
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
