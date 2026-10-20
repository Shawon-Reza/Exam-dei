"use client";

import { useMemo, useState, type FormEvent } from "react";
import { FiEdit2, FiFilter, FiPlus, FiTrash2 } from "react-icons/fi";
import { examSubjects, statusLabels, type Exam, type ExamStatus } from "../../exams/exam-data";
import ExamFormDialog from "./ExamFormDialog";
import type { ExamDraft } from "../types";
import { EmptyTable, Panel, PrimaryButton, SearchBox, SectionHeading, TableFooter } from "../ui/AdminPrimitives";

const statusClass: Record<ExamStatus, string> = {
  live: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  running: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  upcoming: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  practice: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const emptyDraft: ExamDraft = {
  title: "",
  subtitle: "",
  subjectId: "bangla",
  status: "practice" as ExamStatus,
  questionCount: "20",
  durationMinutes: "20",
};

export default function ExamsSection({
  exams,
  onChange,
  onNotice,
}: {
  exams: Exam[];
  onChange: (exams: Exam[]) => void;
  onNotice: (message: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const filtered = useMemo(() => exams.filter((exam) =>
    `${exam.title} ${exam.subtitle}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()) &&
    (statusFilter === "all" || exam.status === statusFilter),
  ), [exams, search, statusFilter]);

  function openDialog(exam?: Exam) {
    setEditingId(exam?.id ?? null);
    setDialogOpen(true);
    setDraft(exam ? {
      title: exam.title,
      subtitle: exam.subtitle,
      subjectId: exam.subjectId ?? "bangla",
      status: exam.status,
      questionCount: String(exam.questionCount),
      durationMinutes: String(exam.durationMinutes),
    } : emptyDraft);
  }

  function saveExam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = examSubjects.find((item) => item.id === draft.subjectId);
    if (!subject || !draft.title.trim()) return;
    const details = {
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim() || subject.label,
      subjectId: subject.id,
      categoryId: undefined,
      status: draft.status,
      questionCount: Math.max(1, Number(draft.questionCount) || 1),
      durationMinutes: Math.max(1, Number(draft.durationMinutes) || 1),
    };
    if (editingId) {
      onChange(exams.map((exam) => exam.id === editingId ? { ...exam, ...details } : exam));
      onNotice("পরীক্ষার তথ্য আপডেট হয়েছে");
    } else {
      const newExam: Exam = { ...details, id: `admin-exam-${Date.now()}`, participants: 0, questions: exams[0]?.questions ?? [] };
      onChange([newExam, ...exams]);
      onNotice("নতুন পরীক্ষা তৈরি হয়েছে");
    }
    setEditingId(null);
    setDialogOpen(false);
  }

  function removeExam(id: string) {
    onChange(exams.filter((exam) => exam.id !== id));
    onNotice("পরীক্ষাটি মুছে ফেলা হয়েছে");
  }

  return (
    <>
      <SectionHeading
        eyebrow="পরীক্ষা ব্যবস্থাপনা"
        title="পরীক্ষাসমূহ"
        description="পরীক্ষা তৈরি, সম্পাদনা ও প্রকাশনার অবস্থা নিয়ন্ত্রণ করুন।"
        action={<PrimaryButton onClick={() => openDialog()}><FiPlus aria-hidden="true" /> নতুন পরীক্ষা</PrimaryButton>}
      />
      <Panel>
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <SearchBox value={search} onChange={setSearch} placeholder="পরীক্ষার নাম খুঁজুন..." />
          <label className="flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950">
            <FiFilter aria-hidden="true" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="পরীক্ষার status filter"
              className="bg-transparent text-zinc-700 outline-none dark:text-zinc-200"
            >
              <option value="all">সব status</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60">
              <tr>
                <th className="px-5 py-3 font-bold">পরীক্ষা</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">প্রশ্ন</th>
                <th className="px-4 py-3 font-bold">সময়</th>
                <th className="px-4 py-3 font-bold">অংশগ্রহণকারী</th>
                <th className="px-4 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map((exam) => (
                <tr key={exam.id} className="transition hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-4">
                    <p className="font-bold text-zinc-900 dark:text-white">{exam.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{exam.subtitle}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass[exam.status]}`}>
                      {statusLabels[exam.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{exam.questionCount}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{exam.durationMinutes} মিনিট</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">
                    {exam.participants.toLocaleString("bn-BD")}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      <button type="button" onClick={() => openDialog(exam)} aria-label={`${exam.title} সম্পাদনা`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <FiEdit2 aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => removeExam(exam.id)} aria-label={`${exam.title} মুছুন`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40">
                        <FiTrash2 aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <EmptyTable colSpan={6} text="কোনো পরীক্ষা পাওয়া যায়নি।" />}
            </tbody>
          </table>
        </div>
        <TableFooter count={filtered.length} label="টি পরীক্ষা" />
      </Panel>

      {dialogOpen && (
        <ExamFormDialog
          draft={draft}
          setDraft={setDraft}
          editing={!!editingId}
          onClose={() => {
            setEditingId(null);
            setDraft(emptyDraft);
            setDialogOpen(false);
          }}
          onSubmit={saveExam}
        />
      )}
    </>
  );
}
