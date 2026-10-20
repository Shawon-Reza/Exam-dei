"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiLock, FiMail, FiRefreshCw } from "react-icons/fi";
import { MdDomainVerification } from "react-icons/md";
import axios from "axios";
import { useRequestPasswordReset, useResetPassword } from "@/src/apis/auth/auth.mutations";

function getErrorMessage(error: Error) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message;
  }

  return error.message;
}

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const requestMutation = useRequestPasswordReset();
  const resetMutation = useResetPassword();

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setResendCooldown((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendCooldown]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!isOtpStep) {
      const submittedEmail = formData.get("email");
      if (typeof submittedEmail !== "string") return;

      setEmail(submittedEmail);
      requestMutation.mutate(
        { email: submittedEmail },
        {
          onSuccess: () => {
            setIsOtpStep(true);
            setResendCooldown(30);
          },
        },
      );
      return;
    }

    const otp = formData.get("otp");
    const password = formData.get("password");
    if (typeof otp !== "string" || typeof password !== "string") return;

    resetMutation.mutate({ email, otp, password });
  }

  function handleResend() {
    if (!email || resendCooldown > 0 || requestMutation.isPending) return;

    requestMutation.mutate(
      { email },
      {
        onSuccess: () => setResendCooldown(30),
      },
    );
  }

  const isPending = requestMutation.isPending || resetMutation.isPending;
  const activeError = isOtpStep
    ? resetMutation.error ?? requestMutation.error
    : requestMutation.error;

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
        Account recovery · অ্যাকাউন্ট পুনরুদ্ধার
      </p>
      <h1 className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
        {resetMutation.isSuccess ? "পাসওয়ার্ড পরিবর্তন হয়েছে" : "পাসওয়ার্ড রিসেট করুন"}
      </h1>

      {resetMutation.isSuccess ? (
        <div
          aria-live="polite"
          className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-950/30"
        >
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
            <MdDomainVerification aria-hidden="true" className="size-6" />
          </span>
          <p className="mt-3 text-sm leading-6 text-emerald-800 dark:text-emerald-200">
            আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। নতুন পাসওয়ার্ড দিয়ে login করুন।
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            Login করুন <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {isOtpStep
              ? `আপনার email (${email})-এ পাঠানো OTP এবং নতুন পাসওয়ার্ড দিন।`
              : "আপনার account-এর email দিন। পাসওয়ার্ড রিসেট করার OTP পাঠানো হবে।"}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isOtpStep ? (
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </span>
              </label>
            ) : (
              <>
                <label className="block text-center text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Verification code
                  <input
                    autoComplete="one-time-code"
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center font-mono text-2xl font-bold tracking-[0.6em] text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                    name="otp"
                    placeholder="••••"
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    minLength={4}
                    maxLength={4}
                    autoFocus
                  />
                </label>

                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  New password
                  <span className="relative mt-1.5 block">
                    <FiLock
                      aria-hidden="true"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                      name="password"
                      placeholder="অন্তত ৮ অক্ষর"
                      required
                      minLength={8}
                      type="password"
                    />
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || requestMutation.isPending}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 disabled:cursor-not-allowed disabled:text-zinc-400 dark:text-emerald-300 dark:hover:text-emerald-200 dark:disabled:text-zinc-500"
                >
                  <FiRefreshCw
                    aria-hidden="true"
                    className={requestMutation.isPending ? "size-4 animate-spin" : "size-4"}
                  />
                  {requestMutation.isPending
                    ? "OTP পাঠানো হচ্ছে..."
                    : resendCooldown > 0
                      ? `${resendCooldown} সেকেন্ড পর আবার পাঠান`
                      : "OTP আবার পাঠান"}
                </button>
              </>
            )}

            {activeError && (
              <p aria-live="polite" className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
                {getErrorMessage(activeError)}
              </p>
            )}

            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "অপেক্ষা করুন..."
                : isOtpStep
                  ? "নতুন পাসওয়ার্ড সেট করুন"
                  : "Reset OTP পাঠান"}
              {!isPending && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>
        </>
      )}

      {!resetMutation.isSuccess && (
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-300"
        >
          <FiArrowLeft aria-hidden="true" />
          Login-এ ফিরে যান
        </Link>
      )}
    </div>
  );
}
