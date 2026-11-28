"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDownload,
  FiFileText,
  FiSearch,
} from "react-icons/fi";
import { usePdfCatalog } from "@/src/apis/pdfs/pdfs.hooks";

const PAGE_SIZE = 12;

export default function ResourcesPdfsBrowser() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeSubjectId = searchParams.get("subjectId") ?? "";
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    subjectId: routeSubjectId,
    page: 1,
  });
  const subjectId = routeSubjectId;
  const page =
    pagination.subjectId === subjectId ? pagination.page : 1;
  const setPage = (nextPage: number | ((currentPage: number) => number)) => {
    setPagination((current) => {
      const currentPage =
        current.subjectId === subjectId ? current.page : 1;
      return {
        subjectId,
        page:
          typeof nextPage === "function"
            ? nextPage(currentPage)
            : nextPage,
      };
    });
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSearch(searchInput.trim()), 250);
    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const catalogQuery = usePdfCatalog({
    search,
    subjectId,
    page,
    limit: PAGE_SIZE,
  });
  const catalog = catalogQuery.data;

  return (
    <section
      id="available-pdfs"
      aria-labelledby="available-pdfs-heading"
      className="mt-10 scroll-mt-24"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            PDF library
          </p>
          <h2
            id="available-pdfs-heading"
            className="mt-1 text-2xl font-extrabold text-zinc-950 dark:text-white"
          >
            সকল PDF
          </h2>
        </div>
        {catalog && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {catalog.pagination.totalCount}টি PDF পাওয়া গেছে
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(200px,280px)_minmax(0,1fr)]">
        <label className="sr-only" htmlFor="pdf-subject-filter">
          বিষয় অনুযায়ী PDF ফিল্টার করুন
        </label>
        <select
          id="pdf-subject-filter"
          value={subjectId}
          onChange={(event) => {
            const params = new URLSearchParams(searchParams.toString());
            const nextSubjectId = event.target.value;
            if (nextSubjectId) {
              params.set("subjectId", nextSubjectId);
            } else {
              params.delete("subjectId");
            }
            const queryString = params.toString();
            router.replace(
              `${pathname}${queryString ? `?${queryString}` : ""}#available-pdfs`,
              { scroll: false },
            );
            setPage(1);
          }}
          disabled={!catalog}
          className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-emerald-700"
        >
          <option value="">সকল বিষয়</option>
          {catalog?.subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <label className="relative block">
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              setPage(1);
            }}
            placeholder="PDF, টপিক বা বিষয় খুঁজুন..."
            aria-label="PDF খুঁজুন"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-emerald-700"
          />
        </label>
      </div>

      {catalogQuery.isPending ? (
        <div
          aria-label="PDF লোড হচ্ছে"
          className="mt-5 grid gap-2 lg:grid-cols-2"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="grid animate-pulse gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            >
              <div>
                <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-3 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800/70" />
              </div>
              <div className="h-8 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      ) : catalogQuery.isError ? (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900 dark:bg-rose-950/20"
        >
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
            PDF-গুলো লোড করা যায়নি।
          </p>
          <button
            type="button"
            onClick={() => void catalogQuery.refetch()}
            className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm hover:bg-rose-100 dark:bg-zinc-900 dark:text-rose-300 dark:hover:bg-rose-950/50"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : catalog && catalog.pdfs.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-300 px-4 py-14 text-center dark:border-zinc-700">
          <FiFileText
            aria-hidden="true"
            className="mx-auto size-7 text-zinc-400"
          />
          <p className="mt-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            এই ফিল্টারে কোনো PDF পাওয়া যায়নি।
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            অন্য শব্দ দিয়ে খুঁজুন অথবা বিষয় ফিল্টার পরিবর্তন করুন।
          </p>
        </div>
      ) : catalog ? (
        <>
          <ul className="mt-5 grid gap-2 lg:grid-cols-2">
            {catalog.pdfs.map((pdf) => (
              <li
                key={pdf.id}
                className="grid min-w-0 gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <FiFileText
                      aria-hidden="true"
                      className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    />
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-sm font-bold text-zinc-900 underline decoration-transparent underline-offset-4 transition hover:text-emerald-700 hover:decoration-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-white dark:hover:text-emerald-300"
                    >
                      {pdf.title}
                    </a>
                  </div>
                  <div className="mt-1.5 flex min-w-0 flex-wrap gap-x-3 gap-y-1 pl-6 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="min-w-0 truncate">
                      <span className="font-semibold text-zinc-600 dark:text-zinc-300">
                        টপিক:
                      </span>{" "}
                      {pdf.topicName}
                    </span>
                    <span className="min-w-0 truncate">
                      <span className="font-semibold text-zinc-600 dark:text-zinc-300">
                        বিষয়:
                      </span>{" "}
                      {pdf.subjectName}
                    </span>
                  </div>
                </div>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${pdf.title} PDF দেখুন`}
                  className="inline-flex w-fit items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-950/50 sm:justify-self-end"
                >
                  PDF দেখুন <FiDownload aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {catalog.pagination.totalPages > 1 && (
            <nav
              aria-label="PDF তালিকার পৃষ্ঠা"
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                পৃষ্ঠা {catalog.pagination.page} / {catalog.pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1 || catalogQuery.isFetching}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  <FiArrowLeft aria-hidden="true" /> আগের পৃষ্ঠা
                </button>
                <button
                  type="button"
                  disabled={
                    page >= catalog.pagination.totalPages ||
                    catalogQuery.isFetching
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.min(catalog.pagination.totalPages, current + 1),
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  পরের পৃষ্ঠা <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </>
      ) : null}
    </section>
  );
}
