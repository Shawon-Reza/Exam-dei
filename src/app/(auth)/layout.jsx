export default function AuthLayout({ children }) {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-2 dark:bg-zinc-950 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        {children}
      </div>
    </main>
  );
}
