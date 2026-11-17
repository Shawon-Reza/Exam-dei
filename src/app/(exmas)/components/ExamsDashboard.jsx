"use client"

import { useMemo, useState } from 'react'
import { FiArrowUpRight, FiBookOpen, FiLayers, FiTrendingUp } from 'react-icons/fi'
import { useSubjects } from '@/src/apis/subjects/subjects.hooks'
import { useTests } from '@/src/apis/test/test.useHooks'
import SubjectsList from './SubjectsList'
import TestCard from './TestCard'

const statusFilters = [
  { value: 'ALL', label: 'ALL' },
  { value: 'LIVE', label: 'LIVE' },
  { value: 'UPCOMING', label: 'UPCOMING' },
  // { value: 'PRACTICE', label: 'প্র্যাকটিস' },
]

const typeFilters = [
  { value: 'ALL', label: 'ALL' },
  // { value: 'TOPIC', label: 'টপিকভিত্তিক' },
  { value: 'SUBJECT', label: 'SUBJECT' },
  { value: 'CATEGORY', label: 'CATEGORY' },
]

const predefinedSearches = [
  { value: 'NTRCA', label: 'NTRCA' },
  { value: 'BANK', label: 'BANK' },
  { value: 'PRIMARY', label: 'PRIMARY' },
]

const getTestErrorMessage = (error) => {
  const responseMessage = error?.response?.data?.message
  const responseDetail = error?.response?.data?.detail

  if (typeof responseMessage === 'string' && responseMessage.trim()) return responseMessage
  if (typeof responseDetail === 'string' && responseDetail.trim()) return responseDetail
  if (error instanceof Error && error.message) return error.message

  return 'পরে আবার চেষ্টা করুন।'
}

const ExamsDashboard = () => {
  const subjectsQuery = useSubjects()
  const [search, setSearch] = useState('')
  const testsQuery = useTests(undefined, search)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const subjects = subjectsQuery.data ?? []
  const tests = useMemo(
    () => Array.isArray(testsQuery.data) ? testsQuery.data : testsQuery.data?.data ?? [],
    [testsQuery.data]
  )
  const testErrorMessage = getTestErrorMessage(testsQuery.error)
  const filteredTests = useMemo(
    () => tests.filter((test) =>
      (statusFilter === 'ALL' || test.status === statusFilter) &&
      (typeFilter === 'ALL' || test.type === typeFilter)
    ),
    [statusFilter, tests, typeFilter]
  )
  const activeSubjects = subjects.filter((subject) => subject.isActive).length
  const totalTests = tests.length || subjects.reduce((total, subject) => total + (subject._count?.tests ?? 0), 0)
  const totalQuestions = subjects.reduce((total, subject) => total + (subject._count?.questions ?? 0), 0)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f9f7] py-5 dark:bg-zinc-950 sm:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[30rem] rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-950/20" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-[28rem] size-80 rounded-full bg-cyan-100/50 blur-3xl dark:bg-cyan-950/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* =========== Header ============ */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-950 via-emerald-950 to-teal-900 p-6 text-white shadow-2xl shadow-emerald-950/20 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:34px_34px]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 size-72 -translate-y-1/2 rounded-full border border-emerald-300/10 bg-emerald-300/10 blur-2xl" />
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-emerald-200 backdrop-blur-md">
                <FiBookOpen aria-hidden="true" />
                বিষয়ভিত্তিক পরীক্ষা
              </span>
              <h1 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">
                নিজের গতিতে শিখুন,<br />
                <span className="bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">সাফল্যের পথে এগিয়ে যান</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-emerald-50/70 sm:text-base">
                একটি বিষয় বেছে নিয়ে সেই বিষয়ের পরীক্ষা, প্রশ্ন ও শেখার উপকরণগুলো এক জায়গা থেকে দেখুন।
              </p>
            </div>
            <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: 'বিষয়', value: subjects.length, icon: FiBookOpen },
                { label: 'পরীক্ষা', value: totalTests, icon: FiLayers },
                { label: 'প্রশ্ন', value: totalQuestions, icon: FiTrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="min-w-[78px] rounded-2xl border border-white/15 bg-white/[0.09] p-3 shadow-lg shadow-black/10 backdrop-blur-md sm:min-w-[104px] sm:p-4">
                  <span className="grid size-7 place-items-center rounded-lg bg-emerald-300/15 text-emerald-200">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <strong className="mt-3 block text-xl font-black sm:text-2xl">{value}</strong>
                  <span className="text-[11px] text-emerald-50/60">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs font-semibold text-emerald-50/60">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_12px] shadow-emerald-300" />
              {activeSubjects}টি বিষয় বর্তমানে সক্রিয়
            </span>
            <span className="hidden size-1 rounded-full bg-white/30 sm:block" />
            <span>প্রতিদিন একটু একটু করে এগিয়ে যান</span>
            <FiArrowUpRight aria-hidden="true" className="ml-auto text-emerald-200" />
          </div>
        </section>

        {/* ----------------- ShubjectWIse ----------------- */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                Explore subjects
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                বিষয় বেছে নিন
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                আপনার প্রয়োজনীয় বিষয় থেকে পরীক্ষা শুরু করুন
              </p>
            </div>
            <span className="hidden rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 shadow-sm sm:block dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {subjects.length}টি বিষয় পাওয়া গেছে
            </span>
          </div>
          <SubjectsList subjects={subjectsQuery.data} />
        </section>

        <section className="mt-16 pb-12" aria-labelledby="all-tests-heading">
          {/* ---------------- Filter Bar -------------- */}
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80 p-4 shadow-lg shadow-zinc-200/40 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/10 sm:p-6">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-950/30" />
              <div className="flex flex-col gap-4">
                <div className="relative flex flex-col gap-5 border-b border-zinc-100 pb-5 dark:border-zinc-800 md:flex-row md:items-end md:justify-between md:gap-8">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                    Find your next challenge
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <h2 id="all-tests-heading" className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                      সব পরীক্ষা
                    </h2>
                    {!testsQuery.isLoading && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {filteredTests.length}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    আপনার প্রস্তুতির জন্য সঠিক পরীক্ষা বেছে নিন
                  </p>
                </div>

                <div className="shrink-0 md:max-w-[min(100%,32rem)] md:flex-1">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                    Quick search
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="পরীক্ষা খুঁজুন">
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      aria-pressed={search === ''}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${search === ''
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:text-emerald-300'
                        }`}
                    >
                      সব পরীক্ষা
                    </button>
                    {predefinedSearches.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setSearch(item.value)}
                        aria-pressed={search === item.value}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${search === item.value
                            ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:text-emerald-300'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                </div>

                <div className="relative grid gap-4 md:grid-cols-2">
                <div className="min-w-0">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                    Status
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="পরীক্ষার অবস্থা">
                    {statusFilters.map((filter) => (
                      <button
                        key={filter.value}
                        type="button"
                        onClick={() => setStatusFilter(filter.value)}
                        aria-pressed={statusFilter === filter.value}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${statusFilter === filter.value
                            ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:text-emerald-300'
                          }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="min-w-0">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                    Exam type
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="পরীক্ষার ধরন">
                    {typeFilters.map((filter) => (
                        <button
                          key={filter.value}
                          type="button"
                        onClick={() => setTypeFilter(filter.value)}
                        aria-pressed={typeFilter === filter.value}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${typeFilter === filter.value
                              ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:text-emerald-300'
                            }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {testsQuery.isLoading ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              পরীক্ষা লোড হচ্ছে...
            </div>
          ) : testsQuery.isError ? (
            <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50/50 px-6 py-16 text-center text-rose-600 dark:border-rose-800 dark:bg-rose-950/20 dark:text-rose-300">
              <p className="text-sm font-bold">পরীক্ষা লোড করা যায়নি</p>
              <p className="mt-2 text-sm">{testErrorMessage}</p>
            </div>
          ) : filteredTests.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredTests.map((test) => <TestCard key={test.id} test={test} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              এই মুহূর্তে কোনো পরীক্ষা পাওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

export default ExamsDashboard