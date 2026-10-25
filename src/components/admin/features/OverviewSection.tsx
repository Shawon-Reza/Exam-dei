import { FiActivity, FiBookOpen, FiHelpCircle, FiUsers } from "react-icons/fi";
import type { Exam } from "../../exams/exam-data";
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
    { label: "মোট শিক্ষার্থী", value: students.length.toLocaleString("bn-BD"), icon: <FiUsers />, tone: "emerald" },
    { label: "মোট পরীক্ষা", value: exams.length.toLocaleString("bn-BD"), icon: <FiBookOpen />, tone: "blue" },
    { label: "Question Bank", value: questionsCount.toLocaleString("bn-BD"), icon: <FiHelpCircle />, tone: "violet" },
    { label: "মোট অংশগ্রহণ", value: participants.toLocaleString("bn-BD"), icon: <FiActivity />, tone: "amber" },
  ];

  return (
    <>
      <SectionHeading
        eyebrow="Admin overview"
        title="শুভ সকাল, Admin 👋"
        description="আপনার প্ল্যাটফর্মের আজকের সারসংক্ষেপ এক নজরে দেখে নিন।"
      />

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => (
          <Panel key={metric.label} className="p-5">
            <div className="flex items-start justify-between">
              <span className={`grid size-10 place-items-center rounded-xl ${metric.tone === "emerald" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : metric.tone === "blue" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300" : metric.tone === "violet" ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300" : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"}`}>{metric.icon}</span>
            </div>
            <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">{metric.label}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">{metric.value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)]">
        <Panel className="p-5 sm:p-6">
          <div><h2 className="font-extrabold">পরীক্ষায় অংশগ্রহণ</h2><p className="mt-1 text-xs text-zinc-500">Activity summary</p></div>
          <div className="mt-7 grid min-h-48 place-items-center rounded-xl border border-dashed border-zinc-200 text-center text-sm text-zinc-500 dark:border-zinc-700">
            {exams.length === 0 && students.length === 0 ? "এখনো কোনো activity data নেই।" : "এই সময়ের activity data পাওয়া যায়নি।"}
          </div>
        </Panel>
        <Panel className="p-5 sm:p-6">
          <div><h2 className="font-extrabold">দ্রুত overview</h2><p className="mt-1 text-xs text-zinc-500">কনটেন্ট ও user summary</p></div>
          <div className="mt-5 space-y-4">
            <OverviewLine label="সক্রিয় পরীক্ষা" value={activeExams.length.toLocaleString("bn-BD")} detail="এখন চলছে" />
            <OverviewLine label="শিক্ষার্থী" value={students.length.toLocaleString("bn-BD")} detail="নিবন্ধিত শিক্ষার্থী" />
            <OverviewLine label="প্রকাশিত কনটেন্ট" value={postsCount.toLocaleString("bn-BD")} detail="ব্লগ ও poll" />
          </div>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/40"><p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">কোনো data এখনো যোগ করা হয়নি</p><p className="mt-1 text-[11px] leading-5 text-emerald-700/80 dark:text-emerald-300/80">পরীক্ষা ও Question Bank manage করতে sidebar থেকে section বেছে নিন।</p></div>
        </Panel>
      </div>

      <Panel className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800"><div><h2 className="font-extrabold">সাম্প্রতিক পরীক্ষা</h2><p className="mt-1 text-xs text-zinc-500">আপনার প্ল্যাটফর্মের সর্বশেষ পরীক্ষা</p></div><button type="button" onClick={() => onNavigate("exams")} className="text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">সব দেখুন →</button></div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {exams.length === 0 ? <p className="p-10 text-center text-sm text-zinc-500">এখনো কোনো পরীক্ষা যোগ করা হয়নি।</p> : exams.slice(0, 4).map((exam) => <div key={exam.id} className="flex items-center gap-3 px-5 py-3.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"><FiBookOpen aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{exam.title}</p><p className="truncate text-xs text-zinc-500">{exam.subtitle}</p></div><span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${statusClass[exam.status]}`}>{statusLabels[exam.status]}</span><span className="hidden text-xs text-zinc-500 md:inline-flex"><FiUsers aria-hidden="true" /> {exam.participants}</span></div>)}
        </div>
      </Panel>
    </>
  );
}

function OverviewLine({ label, value, detail }: { label: string; value: string; detail: string; }) {
  return <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">{label}</p><p className="mt-0.5 text-[11px] text-zinc-500">{detail}</p></div><span className="text-lg font-extrabold">{value}</span></div>;
}
