import { FiBriefcase, FiBookOpen, FiCode, FiMapPin } from "react-icons/fi";
import { profileData, type ProfileEducation, type ProfileExperience } from "./profile-data";

function SectionTitle({ icon: Icon, children }: { icon: typeof FiBookOpen; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">{children}</h2>
    </div>
  );
}

function ExperienceItem({ item }: { item: ProfileExperience }) {
  return (
    <div className="relative border-l border-zinc-200 pl-5 dark:border-zinc-700">
      <span className="absolute -left-1.5 top-1 size-3 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{item.role}</h3>
      <p className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{item.organization}</p>
      <p className="mt-1 text-[11px] text-zinc-400">{item.period}</p>
      <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{item.description}</p>
    </div>
  );
}

function EducationItem({ item }: { item: ProfileEducation }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300">
        <FiBookOpen aria-hidden="true" className="size-4" />
      </span>
      <div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{item.degree}</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.institution} · {item.period}</p>
        {item.result && <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">{item.result}</p>}
      </div>
    </div>
  );
}

export default function ProfileDetails() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <SectionTitle icon={FiBriefcase}>কাজের অভিজ্ঞতা</SectionTitle>
        <div className="mt-5 space-y-6">
          {profileData.experience.map((item) => <ExperienceItem key={`${item.role}-${item.organization}`} item={item} />)}
        </div>
      </section>
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <SectionTitle icon={FiBookOpen}>শিক্ষাগত যোগ্যতা</SectionTitle>
        <div className="mt-5 space-y-5">
          {profileData.education.map((item) => <EducationItem key={item.degree} item={item} />)}
        </div>
      </section>
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <SectionTitle icon={FiCode}>দক্ষতা ও আগ্রহ</SectionTitle>
        <div className="mt-4 flex flex-wrap gap-2">
          {profileData.skills.map((skill) => <span key={skill} className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{skill}</span>)}
        </div>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"><FiMapPin aria-hidden="true" /> Open to opportunities</p>
      </section>
    </div>
  );
}
