"use client";

import { useState, type FormEvent } from "react";
import { FiEdit2, FiFilter, FiPlus, FiTrash2 } from "react-icons/fi";
import { statusLabels, type Exam, type ExamStatus } from "../../exams/exam-data";
import ExamFormDialog from "./ExamFormDialog";
import type { ExamDraft } from "../types";
import { EmptyTable, Panel, PrimaryButton, SearchBox, SectionHeading, TableFooter } from "../ui/AdminPrimitives";
import { useCreateTest, useDeleteTestByID, useTestsByQuery } from "@/src/apis/test/test.useHooks";
import { useSubjects } from "@/src/apis/subjects/subjects.hooks";

const statusClass: Record<string, string> = {
  LIVE: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  UPCOMING: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  PRACTICE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const emptyDraft: ExamDraft = {
  name: "",
  slug: "",
  description: "",
  duration: 30,
  totalQuestions: 20,
  isActive: true,
  status: "LIVE" as ExamStatus,
  subjectId: "",
};

export default function ExamsSection({
  onNotice,
}: {
  onNotice: (message: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const createTestMutation = useCreateTest();
  const deleteTestMutation = useDeleteTestByID();
  const query = new URLSearchParams();

  if (search.trim()) query.set("search", search.trim());
  if (status) query.set("status", status);
  if (subjectId) query.set("subjectId", subjectId);

  const testsQuery = useTestsByQuery(query.toString());
  const testList = testsQuery.data?.data ?? [];

  const subjectList = useSubjects();
  const subjects = subjectList.data ?? [];

  function openDialog() {
    setDialogOpen(true);
    setDraft(emptyDraft);
  }

  async function saveExam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const details = {
      name: draft.name.trim(),
      slug: draft.slug.trim(),
      description: draft.description.trim(),
      duration: Number(draft.duration),
      totalQuestions: Number(draft.totalQuestions),
      isActive: draft.isActive,
      status: draft.status,
      ...(draft.subjectId ? { subjectId: draft.subjectId } : {}),
    };
    if (!details.name.trim()) return;

    try {
      const result = await createTestMutation.mutateAsync(details);

      if (!result.success) {
        throw new Error(result.message || "পরীক্ষা তৈরি করা যায়নি");
      }

      onNotice(result.message || "নতুন পরীক্ষা তৈরি হয়েছে");
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to create exam:", error);
      onNotice(error instanceof Error ? error.message : "পরীক্ষা তৈরি করা যায়নি");
    }
  }

  return (
    <>
      <SectionHeading
        eyebrow="পরীক্ষা ব্যবস্থাপনা"
        title="পরীক্ষাসমূহ"
        description="পরীক্ষা তৈরি, সম্পাদনা ও প্রকাশনার অবস্থা নিয়ন্ত্রণ করুন।"
        action={<PrimaryButton onClick={openDialog}><FiPlus aria-hidden="true" /> নতুন পরীক্ষা</PrimaryButton>}
      />
      <Panel className="min-h-[500px]">
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="পরীক্ষার নাম খুঁজুন..."
          />
          <label className="flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950">
            <FiFilter aria-hidden="true" />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="পরীক্ষার status filter"
              className="bg-transparent text-zinc-700 outline-none dark:text-zinc-200"
            >
              <option value="">সব status</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <select
            value={subjectId}
            onChange={(event) => setSubjectId(event.target.value)}
            aria-label="বিষয় দিয়ে পরীক্ষা filter"
            className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          >
            <option value="">সব বিষয়</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.banglaName || subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60">
              <tr>
                <th className="px-5 py-3 font-bold">পরীক্ষা</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">প্রশ্ন</th>
                <th className="px-4 py-3 font-bold">সময়</th>
                <th className="px-4 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {testList.map((exam: Exam) => (
                <tr key={exam.id} className="transition hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-4">
                    <p className="font-bold text-zinc-900 dark:text-white">{exam.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">{exam.description}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass[exam.status]}`}>
                      {statusLabels[exam.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{exam.totalQuestions}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{exam.duration} মিনিট</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      <button type="button" onClick={() => console.log("Update test:", exam.id)} aria-label={`${exam.name} সম্পাদনা`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <FiEdit2 aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        disabled={deleteTestMutation.isPending}
                        onClick={async () => {
                          try {
                            const result = await deleteTestMutation.mutateAsync(exam.id);
                            onNotice(result.message || "পরীক্ষাটি মুছে ফেলা হয়েছে");
                          } catch (error) {
                            console.error("Failed to delete test:", error);
                            onNotice("পরীক্ষাটি মুছে ফেলা যায়নি");
                          }
                        }}
                        aria-label={`${exam.name} মুছুন`}
                        className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-wait disabled:opacity-50 dark:hover:bg-rose-950/40"
                      >
                        <FiTrash2 aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {testList.length === 0 && <EmptyTable colSpan={5} text="কোনো পরীক্ষা পাওয়া যায়নি।" />}
            </tbody>
          </table>
        </div>
        <TableFooter count={testList.length} label="টি পরীক্ষা" />
      </Panel>

      {dialogOpen && (
        <ExamFormDialog
          draft={draft}
          setDraft={setDraft}
          editing={false}
          subjects={subjects}
          onClose={() => {
            setDraft(emptyDraft);
            setDialogOpen(false);
          }}
          onSubmit={saveExam}
        />
      )}
    </>
  );
}
