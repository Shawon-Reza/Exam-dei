"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiBookOpen, FiFacebook, FiLock, FiMail, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { setDemoAuthenticated } from "../../lib/demo-auth";

type DemoAuthFormProps = {
  mode: "login" | "register";
};

const socialProviders = [
  { id: "google", label: "Google", icon: FcGoogle },
  { id: "facebook", label: "Facebook", icon: FiFacebook },
];

function getSafeNextPath() {
  const nextPath = new URLSearchParams(window.location.search).get("next");

  if (
    nextPath &&
    nextPath.startsWith("/") &&
    !nextPath.startsWith("//") &&
    !nextPath.includes("\\")
  ) {
    return nextPath;
  }

  return "/exams";
}

export default function DemoAuthForm({ mode }: DemoAuthFormProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [socialMessage, setSocialMessage] = useState<string | null>(null);
  const isLogin = mode === "login";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      setFormError("সঠিক email দিন এবং password অন্তত ৮ অক্ষরের করুন।");
      return;
    }

    setDemoAuthenticated(true);
    router.replace(getSafeNextPath());
  }

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-2.5">
        <span className="grid size-10 place-items-center rounded-2xl bg-emerald-500 text-white">
          <FiBookOpen aria-hidden="true" className="size-5" />
        </span>
        <span className="text-lg font-extrabold text-zinc-950 dark:text-white">
          Chakri<span className="text-emerald-500">ova</span>
        </span>
      </Link>

      <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
        {isLogin ? "Welcome back · আবার স্বাগতম" : "Join Chakriova · সাথে থাকুন"}
      </p>
      <h1 className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
        {isLogin ? "আপনার account-এ প্রবেশ করুন" : "নতুন account তৈরি করুন"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {isLogin
          ? "আপনার প্রস্তুতি যেখানে শেষ হয়েছিল, সেখান থেকেই শুরু করুন।"
          : "আপনার পছন্দের পরীক্ষার জন্য প্রস্তুতি শুরু করুন।"}
      </p>

      <div
        role="note"
        className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
      >
        Frontend demo: যেকোনো valid email এবং অন্তত ৮ অক্ষরের password দিলে
        demo session তৈরি হবে। এটি backend authentication নয়।
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {socialProviders.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              setSocialMessage(
                `${label} দিয়ে ${isLogin ? "login" : "registration"} করতে OAuth integration প্রয়োজন। আপাতত email form ব্যবহার করুন।`,
              )
            }
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-800 dark:hover:bg-zinc-800"
          >
            <Icon
              aria-hidden="true"
              className={id === "google" ? "size-5" : "size-4 text-[#1877F2]"}
            />
            {label} দিয়ে চালিয়ে যান
          </button>
        ))}
      </div>
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-xs text-zinc-400">অথবা email দিয়ে</span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
      </div>
      {socialMessage && (
        <p
          aria-live="polite"
          className="mb-4 rounded-xl bg-blue-500/10 p-3 text-xs leading-5 text-blue-800 dark:text-blue-200"
        >
          {socialMessage}
        </p>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            আপনার নাম
            <span className="relative mt-1.5 block">
              <FiUser
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                autoComplete="name"
                className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                name="name"
                placeholder="আপনার নাম লিখুন"
                required
                type="text"
              />
            </span>
          </label>
        )}

        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          Email address
          <span className="relative mt-1.5 block">
            <FiMail
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </span>
        </label>

        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          Password
          <span className="relative mt-1.5 block">
            <FiLock
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              minLength={8}
              name="password"
              placeholder="অন্তত ৮ অক্ষর"
              required
              type="password"
            />
          </span>
        </label>

        {formError && (
          <p
            aria-live="polite"
            className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300"
          >
            {formError}
          </p>
        )}

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          type="submit"
        >
          {isLogin ? "Login করুন" : "Demo account তৈরি করুন"}
          <FiArrowRight aria-hidden="true" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {isLogin ? "এখনও account নেই?" : "আগে থেকেই account আছে?"}{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-bold text-emerald-700 hover:underline dark:text-emerald-300"
        >
          {isLogin ? "Register করুন" : "Login করুন"}
        </Link>
      </p>
      <Link
        href="/"
        className="mt-5 block text-center text-xs font-medium text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-300"
      >
        ← হোমপেজে ফিরে যান
      </Link>
    </div>
  );
}
