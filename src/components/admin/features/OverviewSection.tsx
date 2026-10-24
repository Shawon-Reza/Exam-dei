import { FiActivity, FiArrowUpRight, FiBookOpen, FiCalendar, FiHelpCircle, FiUsers } from "react-icons/fi";
import type { Exam } from "../../exams/exam-data";
import { activity } from "../data";
import type { AdminSection, Student } from "../types";
import { Panel, SectionHeading } from "../ui/AdminPrimitives";

const statusClass = {
  live: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  running: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  upcoming: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  practice: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const statusLabels = { live: "লাইভ", running: "চলছে", upcoming: "নির্ধারিত", practice: "Practice" };

export default function OverviewSection({
  exams,
  students,
  questionsCount,
  postsCount,
  onNavigate,
}: {
  exams: Exam[];
  students: Student[];
  questionsCount: number;
  postsCount: number;
  onNavigate: (section: AdminSection) => void;
}) {
  const activeExams = exams.filter((exam) => exam.status === "live" || exam.status === "running");
  const participants = exams.reduce((total, exam) => total + exam.participants, 0);
  const metrics = [
    { label: "মোট শিক্ষার্থী", value: students.length.toLocaleString("bn-BD"), delta: "demo records", icon: <FiUsers />, tone: "emerald" },
    { label: "মোট পরীক্ষা", value: exams.length.toLocaleString("bn-BD"), delta: "+৮.২%", icon: <FiBookOpen />, tone: "blue" },
    { label: "Question Bank", value: questionsCount.toLocaleString("bn-BD"), delta: "+৫.৪%", icon: <FiHelpCircle />, tone: "violet" },
    { label: "মোট অংশগ্রহণ", value: participants.toLocaleString("bn-BD"), delta: "+১৮.৬%", icon: <FiActivity />, tone: "amber" },
  ];

  return (
    <>
      <SectionHeading
        eyebrow="সোমবার, ১৯ অক্টোবর ২০২৬"
        title="শুভ সকাল, Admin 👋"
        description="আপনার প্ল্যাটফর্মের আজকের সারসংক্ষেপ এক নজরে দেখে নিন।"
        action={<span className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><FiCalendar aria-hidden="true" /> এই সপ্তাহ <span aria-hidden="true">⌄</span></span>}
      />

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => (
          <Panel key={metric.label} className="p-5">
            <div className="flex items-start justify-between">
              <span className={`grid size-10 place-items-center rounded-xl ${metric.tone === "emerald" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : metric.tone === "blue" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300" : metric.tone === "violet" ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300" : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"}`}>{metric.icon}</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><FiArrowUpRight aria-hidden="true" />{metric.delta}</span>
            </div>
            <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">{metric.label}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">{metric.value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)]">
        <Panel className="p-5 sm:p-6">
          <div className="flex items-start justify-between"><div><h2 className="font-extrabold">পরীক্ষায় অংশগ্রহণ</h2><p className="mt-1 text-xs text-zinc-500">এই সপ্তাহের activity</p></div><span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300"><FiArrowUpRight aria-hidden="true" /> ১৮.৬%</span></div>
          <div className="mt-7 flex h-48 items-end justify-between gap-2 border-b border-zinc-100 px-1 dark:border-zinc-800 sm:gap-4">
            {activity.map((item, index) => <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className={`w-full max-w-12 rounded-t-lg ${index === 5 ? "bg-emerald-600" : "bg-emerald-100 dark:bg-emerald-950"}`} style={{ height: `${item.value}%` }} title={`${item.day}: ${item.value}%`} /><span className="pb-2 text-[10px] text-zinc-400">{item.day}</span></div>)}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500"><span>দৈনিক গড়</span><span className="font-bold text-zinc-800 dark:text-zinc-200">৭১৪ শিক্ষার্থী</span></div>
        </Panel>
        <Panel className="p-5 sm:p-6">
          <div><h2 className="font-extrabold">দ্রুত overview</h2><p className="mt-1 text-xs text-zinc-500">কনটেন্ট ও user summary</p></div>
          <div className="mt-5 space-y-4">
            <OverviewLine label="সক্রিয় পরীক্ষা" value={activeExams.length.toLocaleString("bn-BD")} detail="এখন চলছে" />
            <OverviewLine label="শিক্ষার্থী" value={students.length.toLocaleString("bn-BD")} detail="demo records" />
            <OverviewLine label="প্রকাশিত কনটেন্ট" value={postsCount.toLocaleString("bn-BD")} detail="ব্লগ ও poll" />
          </div>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/40"><p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">সবকিছু ঠিকঠাক চলছে</p><p className="mt-1 text-[11px] leading-5 text-emerald-700/80 dark:text-emerald-300/80">পরীক্ষা ও Question Bank manage করতে sidebar থেকে section বেছে নিন।</p></div>
        </Panel>
      </div>

      <Panel className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800"><div><h2 className="font-extrabold">সাম্প্রতিক পরীক্ষা</h2><p className="mt-1 text-xs text-zinc-500">আপনার প্ল্যাটফর্মের সর্বশেষ পরীক্ষা</p></div><button type="button" onClick={() => onNavigate("exams")} className="text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">সব দেখুন →</button></div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {exams.slice(0, 4).map((exam) => <div key={exam.id} className="flex items-center gap-3 px-5 py-3.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"><FiBookOpen aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{exam.title}</p><p className="truncate text-xs text-zinc-500">{exam.subtitle}</p></div><span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${statusClass[exam.status]}`}>{statusLabels[exam.status]}</span><span className="hidden text-xs text-zinc-500 md:inline-flex"><FiUsers aria-hidden="true" /> {exam.participants}</span></div>)}
        </div>
      </Panel>
    </>
  );
}

function OverviewLine({ label, value, detail }: { label: string; value: string; detail: string; }) {
  return <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">{label}</p><p className="mt-0.5 text-[11px] text-zinc-500">{detail}</p></div><span className="text-lg font-extrabold">{value}</span></div>;
}
