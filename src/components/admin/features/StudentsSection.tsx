"use client";

import { useMemo, useState } from "react";
import { FiActivity, FiFilter, FiShield, FiUsers } from "react-icons/fi";
import type { NoticeHandler, Student } from "../types";
import { EmptyTable, Panel, SearchBox, SectionHeading, SmallStat, TableFooter } from "../ui/AdminPrimitives";

export default function StudentsSection({
  students,
  onChange,
  onNotice,
}: {
  students: Student[];
  onChange: (students: Student[]) => void;
  onNotice: NoticeHandler;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = useMemo(() => students.filter((student) =>
    `${student.name} ${student.email} ${student.id}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()) &&
    (statusFilter === "all" || student.status === statusFilter),
  ), [search, statusFilter, students]);

  function toggleStatus(id: string) {
    onChange(students.map((student) => student.id === id
      ? { ...student, status: student.status === "Active" ? "Suspended" : "Active" }
      : student,
    ));
    onNotice("শিক্ষার্থীর status আপডেট হয়েছে");
  }

  return (
    <>
      <SectionHeading eyebrow="শিক্ষার্থী ব্যবস্থাপনা" title="শিক্ষার্থীরা" description="অ্যাকাউন্ট, পরীক্ষার অগ্রগতি ও access status দেখুন।" />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <SmallStat label="মোট শিক্ষার্থী" value={students.length.toLocaleString("bn-BD")} icon={<FiUsers />} />
        <SmallStat label="সক্রিয়" value={students.filter((student) => student.status === "Active").length.toLocaleString("bn-BD")} icon={<FiActivity />} />
        <SmallStat label="Suspended" value={students.filter((student) => student.status === "Suspended").length.toLocaleString("bn-BD")} icon={<FiShield />} />
      </div>
      <Panel>
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <SearchBox value={search} onChange={setSearch} placeholder="নাম, email বা ID খুঁজুন..." />
          <label className="flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950">
            <FiFilter aria-hidden="true" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="শিক্ষার্থীর status filter"
              className="bg-transparent text-zinc-700 outline-none dark:text-zinc-200"
            >
              <option value="all">সব শিক্ষার্থী</option>
              <option value="Active">সক্রিয়</option>
              <option value="Suspended">Suspended</option>
            </select>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60">
              <tr>
                <th className="px-5 py-3 font-bold">শিক্ষার্থী</th>
                <th className="px-4 py-3 font-bold">Student ID</th>
                <th className="px-4 py-3 font-bold">যোগ দিয়েছেন</th>
                <th className="px-4 py-3 font-bold">পরীক্ষা</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-bold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {student.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-zinc-900 dark:text-white">{student.name}</span>
                        <span className="block truncate text-xs text-zinc-500">{student.email}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-zinc-500">{student.id}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{student.joined}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{student.exams}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${student.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"}`}>
                      {student.status === "Active" ? "সক্রিয়" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(student.id)}
                      className={`rounded-lg px-3 py-2 text-xs font-bold transition ${student.status === "Active" ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40" : "text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"}`}
                    >
                      {student.status === "Active" ? "Suspend" : "সক্রিয় করুন"}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <EmptyTable colSpan={6} text="কোনো শিক্ষার্থী পাওয়া যায়নি।" />}
            </tbody>
          </table>
        </div>
        <TableFooter count={filtered.length} label="জন শিক্ষার্থী" />
      </Panel>
    </>
  );
}
