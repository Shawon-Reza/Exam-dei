"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiLogOut,
  FiMenu,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { ModeToggle } from "../ui/ModeToggle";
import { useAuth } from "@/src/apis/auth/useAuth";
import Image from "next/image";
import { useLogout } from "@/src/apis/auth/auth.mutations";
import { IoLogOutOutline } from "react-icons/io5";
import type { CurrentUser } from "@/src/apis/auth/auth.types";

const navigationLinks = [
  { label: "ফিচার", englishLabel: "Features", href: "/#features" },
  { label: "বিষয়সমূহ", englishLabel: "Topics", href: "/topics" },
   { label: "পরীক্ষা", englishLabel: "Exams", href: "/exams" },
  { label: "ব্লগ", englishLabel: "Blog", href: "/blogs" },
  { label: "প্রশ্ন ব্যাংক", englishLabel: "Question Bank", href: "/question-bank" },
  { label: "লিডারবোর্ড", englishLabel: "Leaderboard", href: "/#leaderboard" },
];

export default function Navbar({ initialUser }: { initialUser: CurrentUser | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const logoutMutation = useLogout();

  console.log(pathname)

  const { data: user } = useAuth(initialUser);

  useEffect(() => {
    function updateActiveHash() {
      setActiveHash(window.location.hash);
    }

    updateActiveHash();
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, [pathname]);

  function isActiveLink(href: string) {
    const [route, hash] = href.split("#");
    const routeMatches =
      route === "/"
        ? pathname === "/"
        : pathname === route || pathname.startsWith(`${route}/`);
    if (!routeMatches) return false;
    return hash ? activeHash === `#${hash}` : true;
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }


  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] z-30 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Chakriova home"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            <FiBookOpen aria-hidden="true" className="size-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-xl">
            Chakri<span className="text-emerald-500">ova</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigationLinks.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`ml-1.5 text-xs ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}
                >
                  {item.englishLabel}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle />


          {user ? (
            <div className=" flex gap-2 items-center justify-center">
              <Image
                className="h-10 w-10 rounded-full object-cover border border-2 border-b-blue-500 shadow-2xl cursor-pointer"
                src={user.image || "https://res.cloudinary.com/dbmdhxmtx/image/upload/v1792349936/wired-lineal-21-avatar_dm77ip.gif"}
                alt="Profile"
                width={300}
                height={300}
              />
              <IoLogOutOutline size={30}
                className="border border-2 border-b-blue-500 shadow-2xl rounded-full cursor-pointer pl-0.5"
                onClick={() => {
                  logoutMutation.mutate();
                }}
              />
            </div>

            // <button
            //   type="button"
            //   onClick={() => setDemoAuthenticated(false)}
            //   className="hidden items-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-rose-300 hover:text-rose-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-rose-300 sm:inline-flex"
            // >
            //   <FiLogOut aria-hidden="true" />
            //   Logout
            // </button>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                <FiUserPlus aria-hidden="true" />
                Login
              </Link>
            </div>
          )}


          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 lg:hidden"
          >
            {mobileMenuOpen ? (
              <FiX aria-hidden="true" className="size-5" />
            ) : (
              <FiMenu aria-hidden="true" className="size-5 cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigationLinks.map((item) => {
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                  <span
                    className={`text-xs ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}
                  >
                    {item.englishLabel}
                  </span>
                </Link>
              );
            })}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logoutMutation.mutate();
                  closeMenu();
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200 cursor-pointer"
              >
                <FiLogOut aria-hidden="true" />
                Logout
              </button>
            ) : (
              <div className="mt-2 ">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white w-full cursor-pointer"
                >
                  <FiUserPlus aria-hidden="true" />
                  Login
                </Link>
              </div>
            )}

            <Link
              href="/#get-started"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white"
            >
              বিনামূল্যে শুরু করুন
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
