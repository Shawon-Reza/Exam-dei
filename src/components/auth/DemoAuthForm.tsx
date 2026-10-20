"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { FiArrowRight, FiBookOpen, FiFacebook, FiRefreshCw } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {
  useLogin,
  useRegister,
  useResendVerificationOtp,
  useVerifyOtp,
} from "@/src/apis/auth/auth.mutations";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdDomainVerification } from "react-icons/md";
import { BASE_URL } from "@/src/config/config";

type DemoAuthFormProps = {
  mode: "login" | "register";
};

const socialProviders = [
  { id: "google", label: "Google", icon: FcGoogle },
  { id: "facebook", label: "Facebook", icon: FiFacebook },
];

function getLoginErrorMessage(error: Error) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message;
  }

  return error.message;
}

export default function DemoAuthForm({ mode }: DemoAuthFormProps) {
  const [socialMessage, setSocialMessage] = useState<string | null>(null);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const isLogin = mode === "login";
  const router = useRouter();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendVerificationOtp();
  
  const loginNeedsOtp =
    isLogin &&
    loginMutation.isError &&
    getLoginErrorMessage(loginMutation.error).trim().toLowerCase() === "email not verified";
  const isOtpStep =
    (!isLogin && registerMutation.data?.success === true) || loginNeedsOtp;
  const googleLoginUrl = new URL("/api/v1/auth/google-login", BASE_URL);
  googleLoginUrl.searchParams.set("redirectUrl", "/profile");

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
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const otp = formData.get("otp");

    if (isOtpStep) {
      verifyOtpMutation.mutate({
        email: registrationEmail,
        otp: otp as string,
      },
        {
          onSuccess: () => {
           router.push('/')
          }
        });
    } else if (isLogin) {
      loginMutation.mutate(
        {
          email: email as string,
          password: password as string
        },
        {
          onSuccess: (data) => {
            console.log("Login successful:", data);
            formData.delete("email");
            formData.delete("password");
            router.push('/')
          },

          onError: (error) => {
            if (axios.isAxiosError(error)) {
              console.log("Backend error response body:", error.response?.data);
              console.log("Backend error status:", error.response?.status);
              if (getLoginErrorMessage(error).trim().toLowerCase() === "email not verified") {
                setRegistrationEmail(email as string);
              }
            } else {
              console.error("Login failed before receiving an HTTP response:", error);
            }
          },
        }
      )
    } else {
      registerMutation.mutate({
        name: name as string,
        email: email as string,
        password: password as string
      }, {
        onSuccess: () => {
          setRegistrationEmail(email as string);
          setResendCooldown(30);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            console.log("Register error response:", error.response?.data);
            console.log("Register error status:", error.response?.status);
          } else {
            console.error("Registration failed before receiving an HTTP response:", error);
          }
        },
      });
    }
  }

  function handleResendOtp() {
    if (!registrationEmail || resendCooldown > 0 || resendOtpMutation.isPending) return;

    resendOtpMutation.mutate(
      { email: registrationEmail, type: "email-verification" },
      {
        onSuccess: () => setResendCooldown(30),
      },
    );
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


      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {socialProviders.map(({ id, label, icon: Icon }) => (
          id === "google" ? (
            <a
              key={id}
              href={googleLoginUrl.toString()}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-800 dark:hover:bg-zinc-800"
            >
              <Icon aria-hidden="true" className="size-5" />
              {label} দিয়ে চালিয়ে যান
            </a>
          ) : (
            <button
              key={id}
              type="button"
              onClick={() =>
                setSocialMessage(
                  `${label} দিয়ে ${isLogin ? "login" : "registration"} করতে OAuth integration প্রয়োজন। আপাতত email form ব্যবহার করুন।`,
                )
              }
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-800 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Icon aria-hidden="true" className="size-4 text-[#1877F2]" />
              {label} দিয়ে চালিয়ে যান
            </button>
          )
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
        {verifyOtpMutation.isSuccess ? (
          <div
            aria-live="polite"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-950/30"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
              <MdDomainVerification aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mt-3 font-bold text-emerald-900 dark:text-emerald-100">
              Email verified
            </h2>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
              আপনার email verify হয়েছে। এখন login করতে পারেন।
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Login করুন
            </Link>
          </div>
        ) : isOtpStep ? (
          <div className="space-y-5 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-zinc-700 dark:bg-zinc-900/60">
            <div className="text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                <MdDomainVerification aria-hidden="true" className="size-6" />
              </span>
              <h2 className="mt-3 text-lg font-bold text-zinc-950 dark:text-white">
                Email verify করুন
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{registrationEmail}</span>
                {" "}ঠিকানায় পাঠানো ৪-সংখ্যার OTP লিখুন।
              </p>
            </div>

            <label className="block text-center text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              Verification code
              <input
                autoComplete="one-time-code"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-center font-mono text-2xl font-bold tracking-[0.6em] text-zinc-950 outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
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

            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              Inbox-এ না পেলে spam folder-টিও দেখুন।
            </p>

            <div className="border-t border-zinc-200 pt-4 text-center dark:border-zinc-700">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || resendOtpMutation.isPending}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 disabled:cursor-not-allowed disabled:text-zinc-400 dark:text-emerald-300 dark:hover:text-emerald-200 dark:disabled:text-zinc-500"
              >
                <FiRefreshCw
                  aria-hidden="true"
                  className={resendOtpMutation.isPending ? "size-4 animate-spin" : "size-4"}
                />
                {resendOtpMutation.isPending
                  ? "OTP পাঠানো হচ্ছে..."
                  : resendCooldown > 0
                    ? `${resendCooldown} সেকেন্ড পর আবার পাঠান`
                    : "OTP আবার পাঠান"}
              </button>
              {resendOtpMutation.isSuccess && (
                <p aria-live="polite" className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
                  নতুন OTP পাঠানো হয়েছে। Inbox বা spam folder দেখুন।
                </p>
              )}
              {resendOtpMutation.isError && (
                <p aria-live="polite" className="mt-2 text-xs text-rose-700 dark:text-rose-300">
                  {getLoginErrorMessage(resendOtpMutation.error)}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            {!isLogin && (
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                আপনার নাম
                <input
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  name="name"
                  placeholder="আপনার নাম লিখুন"
                  required
                  type="text"
                />
              </label>
            )}

            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              Email address
              <input
                autoComplete="email"
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>

            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              Password
              <input
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                minLength={8}
                name="password"
                placeholder="অন্তত ৮ অক্ষর"
                required
                type="password"
              />
            </label>
            {isLogin && (
              <div className="-mt-2 text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            )}
          </>
        )}




        {loginMutation.isError && isLogin && !loginNeedsOtp && (
          <p
            aria-live="polite"
            className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300"
          >
            {getLoginErrorMessage(loginMutation.error)}
          </p>
        )}
        {registerMutation.isError && !isLogin && (
          <p
            aria-live="polite"
            className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300"
          >
            {getLoginErrorMessage(registerMutation.error)}
          </p>
        )}
        {verifyOtpMutation.isError && (
          <p
            aria-live="polite"
            className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300"
          >
            {getLoginErrorMessage(verifyOtpMutation.error)}
          </p>
        )}

        {!verifyOtpMutation.isSuccess && (
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            type="submit"
            disabled={loginMutation.isPending || registerMutation.isPending || verifyOtpMutation.isPending}
          >
            {loginMutation.isPending || registerMutation.isPending || verifyOtpMutation.isPending
              ? "অপেক্ষা করুন..."
              : isOtpStep
                ? "OTP verify করুন"
                : isLogin
                  ? "Login করুন"
                  : "Register করুন"}
            <FiArrowRight aria-hidden="true" />
          </button>
        )}
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
