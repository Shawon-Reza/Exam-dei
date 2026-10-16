export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
}
