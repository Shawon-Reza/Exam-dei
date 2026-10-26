export default function TopicRouteFallback() {
  return (
    <main
      aria-busy="true"
      aria-label="বিষয় লোড হচ্ছে"
      className="min-h-[70vh] bg-zinc-50 py-8 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="h-5 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-8 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800/70" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800/70" />
            <div className="mt-8 h-40 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800/70" />
          </div>
          <div className="hidden h-72 animate-pulse rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:block" />
        </div>
      </div>
    </main>
  );
}
