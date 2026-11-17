"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiBook,
  FiBookOpen,
  FiCompass,
  FiEye,
  FiFileText,
  FiHeart,
  FiLogOut,
  FiMail,
  FiMenu,
  FiTarget,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { ModeToggle } from "../ui/ModeToggle";
import { useAuth } from "@/src/apis/auth/useAuth";
import Image from "next/image";
import { useLogout } from "@/src/apis/auth/auth.mutations";
import type { CurrentUser } from "@/src/apis/auth/auth.types";
import logo from "@/src/app/icon.jpg";
import ProfileDrawer from "./ProfileDrawer";
import NotificationCenter from "./NotificationCenter";
import { aboutSections } from "@/src/components/about/about-data";

const navigationLinks = [
  { label: "ফিচার", englishLabel: "Features", href: "/#features" },
  { label: "বিষয়সমূহ", englishLabel: "Topics", href: "/topics" },
  { label: "পরীক্ষা", englishLabel: "Exams", href: "/exams" },
  // { label: "ব্লগ", englishLabel: "Blog", href: "/blogs" },
  // { label: "প্রশ্ন ব্যাংক", englishLabel: "Question Bank", href: "/question-bank" },
];

const noteLinks = [
  { label: "বাংলা", englishLabel: "Bangla", href: "/notes/bangla" },
  { label: "ইংরেজি", englishLabel: "English", href: "/notes/english" },
  { label: "সাধারণ জ্ঞান", englishLabel: "General Knowledge", href: "/notes/gk" },
  { label: "গণিত", englishLabel: "Math", href: "/notes/math" },
  { label: "ICT", englishLabel: "ICT", href: "/notes/ict" },
];

const resourceLinks = [
  {
    title: "প্রশ্ন ব্যাংক",
    description: "পূর্ববর্তী পরীক্ষার প্রশ্ন অনুশীলন করুন",
    href: "/question-bank",
    icon: FiBookOpen,
  },
  {
    title: "বই ও গাইড",
    description: "পরীক্ষার প্রস্তুতির জন্য বাছাই করা বই",
    href: "/books",
    icon: FiBook,
  },
];

const aboutSectionIcons = {
  mission: FiTarget,
  vision: FiEye,
  goal: FiCompass,
  "why-platform": FiBookOpen,
  motivation: FiHeart,
  developer: FiUserPlus,
  contact: FiMail,
} satisfies Record<(typeof aboutSections)[number]["id"], IconType>;

export default function Navbar({ initialUser }: { initialUser: CurrentUser | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const resourcesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const logoutMutation = useLogout();

  const { data: user } = useAuth(initialUser);


  const searchParams = useSearchParams();

  const currentUrl = `${pathname}?${searchParams.toString()}`;

  // console.log("From Navbar:SearchParams:--------->", searchParams.toString());
  // console.log("From Navbar:Current URL:--------->", currentUrl);

  useEffect(() => {
    function updateActiveHash() {
      setActiveHash(window.location.hash);
    }

    updateActiveHash();
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, [pathname]);

  useEffect(() => {
    function closeMenusOnOutsideClick(event: PointerEvent) {
      const target = event.target as Node;
      if (resourcesRef.current && !resourcesRef.current.contains(target)) {
        setResourcesOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(target)) {
        setAboutOpen(false);
      }
    }

    function closeMenusOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        setAboutOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeMenusOnOutsideClick);
    document.addEventListener("keydown", closeMenusOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenusOnOutsideClick);
      document.removeEventListener("keydown", closeMenusOnEscape);
    };
  }, []);

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
    setResourcesOpen(false);
    setAboutOpen(false);
  }

  function handleLogout() {
    setProfileDrawerOpen(false);
    closeMenu();
    logoutMutation.mutate();
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
          <span className="flex size-10 items-center justify-center rounded-full text-white shadow-lg shadow-emerald-500/20 border border-2 border-b-emerald-500">
            <Image
              src={logo}
              alt="Chakriova Logo"
              width={40}
              height={40}
              className="rounded-2xl"
            />
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
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive
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
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((open) => !open)}
              onFocus={() => setResourcesOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={resourcesOpen}
              aria-current={
                pathname.startsWith("/notes") ||
                  pathname === "/books" ||
                  pathname === "/question-bank"
                  ? "page"
                  : undefined
              }
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname.startsWith("/notes") ||
                pathname === "/books" ||
                pathname === "/question-bank"
                ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
            >
              <span>শিক্ষা উপকরণ</span>
              <span
                className={`ml-1.5 text-xs ${pathname.startsWith("/notes") ||
                  pathname === "/books" ||
                  pathname === "/question-bank"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-400"
                  }`}
              >
                Resources
              </span>
              <span className="ml-1 text-xs text-zinc-400 transition-transform" aria-hidden="true">
                {resourcesOpen ? "⌃" : "⌄"}
              </span>
            </button>
            {resourcesOpen && (
              <div
                role="dialog"
                aria-label="শিক্ষা উপকরণ"
                className="absolute right-0 top-full z-50 w-[min(700px,calc(100vw-2rem))] pt-3"
              >
                <div className="relative overflow-hidden rounded-[1.9rem] border border-white/80 bg-[#fbfcf9]/95 p-2.5 shadow-[0_28px_80px_-24px_rgba(20,45,38,0.48)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#17201c]/95 dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.82)]">
                  <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-700/10" />
                  <div className="pointer-events-none absolute left-[14.5rem] top-0 h-px w-40 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
                  <div className="relative grid gap-2 sm:grid-cols-[205px_minmax(0,1fr)]">
                    <div className="relative flex min-h-[252px] flex-col overflow-hidden rounded-[1.45rem] bg-[linear-gradient(145deg,#173e34_0%,#102d27_100%)] p-4 text-white">
                      <div className="pointer-events-none absolute -right-14 -top-14 size-36 rounded-full border-[20px] border-white/[0.045]" />
                      <div className="pointer-events-none absolute bottom-14 right-4 size-24 rounded-full border border-amber-200/10" />
                      <div className="pointer-events-none absolute bottom-10 right-8 size-16 rounded-full border border-emerald-200/10" />
                      <div className="relative">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                          <span className="size-1.5 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(253,230,138,0.7)]" />
                          Study library
                        </span>
                        <h2 className="mt-5 text-[1.35rem] font-black leading-[1.12] tracking-tight">
                          প্রস্তুতির
                          <br />
                          পূর্ণ সংগ্রহ
                        </h2>
                        <p className="mt-2.5 text-[11px] leading-5 text-emerald-50/65">
                          নোট, প্রশ্ন ব্যাংক ও নির্বাচিত গাইড এক জায়গায়।
                        </p>
                      </div>
                      <div className="relative mt-auto">
                        {resourceLinks.map(({ href, title, icon: Icon }, index) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={closeMenu}
                            className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.06] px-2.5 py-2 text-[10px] font-bold text-white transition duration-300 hover:border-amber-100/20 hover:bg-[#f8f5ea] hover:text-[#15382f]"
                          >
                            <Icon aria-hidden="true" className="size-3.5" />
                            <span className="truncate">{title}</span>
                            <span className="ml-auto text-[8px] text-emerald-200/50">{String(index + 1).padStart(2, "0")}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <nav
                      aria-label="Subject notes"
                      className="grid max-h-[min(60vh,252px)] content-start gap-1.5 overflow-y-auto p-0.5 sm:grid-cols-2"
                    >
                      <div className="col-span-full flex items-end justify-between px-1 pb-0.5">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Subject notes</p>
                          <h3 className="mt-0.5 text-sm font-black text-zinc-900 dark:text-white">বিষয়ভিত্তিক নোট</h3>
                        </div>
                        <p className="text-[9px] font-bold tabular-nums text-zinc-400">{String(noteLinks.length).padStart(2, "0")} বিষয়</p>
                      </div>
                      {noteLinks.map((note, index) => (
                        <Link
                          key={note.href}
                          href={note.href}
                          onClick={closeMenu}
                          className="group relative flex min-h-[76px] min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-3 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:bg-emerald-50/70 hover:shadow-[0_14px_30px_-18px_rgba(6,78,59,0.45)] dark:border-white/[0.07] dark:bg-white/[0.025] dark:hover:border-emerald-700/40 dark:hover:bg-emerald-950/30"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-emerald-100/80 bg-emerald-50 text-emerald-700 shadow-sm transition duration-300 group-hover:rotate-3 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-500/20 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:group-hover:border-emerald-500 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
                            <FiFileText aria-hidden="true" className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-xs font-bold text-zinc-800 dark:text-zinc-100">{note.label}</span>
                            <span className="mt-1 block truncate text-[10px] leading-4 text-zinc-500 dark:text-zinc-400">{note.englishLabel}</span>
                          </span>
                          <span className="absolute bottom-1.5 right-2.5 text-[8px] font-bold tabular-nums tracking-widest text-zinc-300 transition-colors group-hover:text-emerald-300 dark:text-white/15 dark:group-hover:text-emerald-300/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <FiArrowUpRight aria-hidden="true" className="ml-auto hidden size-3.5 shrink-0 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 sm:block dark:text-emerald-300" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAboutOpen((open) => !open)}
              onFocus={() => setAboutOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={aboutOpen}
              aria-current={pathname === "/about" ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === "/about"
                ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
            >
              <span>আমাদের সম্পর্কে</span>
              <span className={`ml-1.5 text-xs ${pathname === "/about" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}>
                About
              </span>
              <span className="ml-1 text-xs text-zinc-400" aria-hidden="true">
                {aboutOpen ? "⌃" : "⌄"}
              </span>
            </button>
            {aboutOpen && (
              <div
                role="dialog"
                aria-label="About Chakriova sections"
                className="absolute right-0 top-full z-50 w-[min(700px,calc(100vw-2rem))] pt-3"
              >
                <div className="relative overflow-hidden rounded-[1.9rem] border border-white/80 bg-[#fbfcf9]/95 p-2.5 shadow-[0_28px_80px_-24px_rgba(20,45,38,0.48)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#17201c]/95 dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.82)]">
                  <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-700/10" />
                  <div className="pointer-events-none absolute left-[14.5rem] top-0 h-px w-40 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
                  <div className="relative grid gap-2 sm:grid-cols-[205px_minmax(0,1fr)]">
                    <div className="relative flex min-h-[252px] flex-col overflow-hidden rounded-[1.45rem] bg-[linear-gradient(145deg,#173e34_0%,#102d27_100%)] p-4 text-white">
                      <div className="pointer-events-none absolute -right-14 -top-14 size-36 rounded-full border-[20px] border-white/[0.045]" />
                      <div className="pointer-events-none absolute bottom-14 right-4 size-24 rounded-full border border-amber-200/10" />
                      <div className="pointer-events-none absolute bottom-10 right-8 size-16 rounded-full border border-emerald-200/10" />
                      <div className="relative">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                          <span className="size-1.5 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(253,230,138,0.7)]" />
                          About us
                        </span>
                        <h2 className="mt-5 text-[1.35rem] font-black leading-[1.12] tracking-tight">
                          প্রস্তুতির পথ,
                          <br />
                          আপনার গল্প
                        </h2>
                        <p className="mt-2.5 text-[11px] leading-5 text-emerald-50/65">
                          Chakriova-এর উদ্দেশ্য, লক্ষ্য ও আমাদের যাত্রা জানুন।
                        </p>
                      </div>
                      <Link
                        href="/about"
                        onClick={closeMenu}
                        className="relative mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-amber-100/20 bg-[#f8f5ea] px-3.5 py-2 text-[10px] font-bold text-[#15382f] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                      >
                        পুরো গল্প পড়ুন
                        <FiArrowUpRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </div>
                    <nav
                      aria-label="About page sections"
                      className="grid max-h-[min(60vh,252px)] content-start gap-1.5 overflow-y-auto p-0.5 sm:grid-cols-2"
                    >
                    {aboutSections.map((section, index) => {
                      const Icon = aboutSectionIcons[section.id];
                      return (
                        <Link
                          key={section.id}
                          href={`/about#${section.id}`}
                          onClick={closeMenu}
                          className="group relative flex min-h-[76px] min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-3 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:bg-emerald-50/70 hover:shadow-[0_14px_30px_-18px_rgba(6,78,59,0.45)] dark:border-white/[0.07] dark:bg-white/[0.025] dark:hover:border-emerald-700/40 dark:hover:bg-emerald-950/30"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-emerald-100/80 bg-emerald-50 text-emerald-700 shadow-sm transition duration-300 group-hover:rotate-3 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-500/20 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:group-hover:border-emerald-500 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-xs font-bold text-zinc-800 dark:text-zinc-100">
                              {section.label}
                              <span className="ml-1 text-[9px] font-medium uppercase tracking-wide text-zinc-400">
                                {section.englishLabel}
                              </span>
                            </span>
                            <span className="mt-1 block truncate text-[10px] leading-4 text-zinc-500 dark:text-zinc-400">
                              {section.description}
                            </span>
                          </span>
                          <span className="absolute bottom-1.5 right-2.5 text-[8px] font-bold tabular-nums tracking-widest text-zinc-300 transition-colors group-hover:text-emerald-300 dark:text-white/15 dark:group-hover:text-emerald-300/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <FiArrowUpRight aria-hidden="true" className="ml-auto hidden size-3.5 shrink-0 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 sm:block dark:text-emerald-300" />
                        </Link>
                      );
                    })}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle />
          <NotificationCenter />

          {user ? (
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setProfileDrawerOpen(true)}
                aria-label="প্রোফাইল মেনু খুলুন"
                aria-expanded={profileDrawerOpen}
                className="rounded-full border-2 border-b-blue-500 shadow-2xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 cursor-pointer"
              >
                <Image
                  className="h-9 w-9 rounded-full object-cover"
                  src={user.image || "https://res.cloudinary.com/dbmdhxmtx/image/upload/v1792349936/wired-lineal-21-avatar_dm77ip.gif"}
                  alt="Profile"
                  width={300}
                  height={300}
                />
              </button>
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
                href={`/login?callbackUrl=${encodeURIComponent(currentUrl)}`}
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

      {user && (
        <ProfileDrawer
          user={user}
          open={profileDrawerOpen}
          onOpenChange={setProfileDrawerOpen}
          onLogout={handleLogout}
          isLoggingOut={logoutMutation.isPending}
        />
      )}

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
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${isActive
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
            <div className="mt-2 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setResourcesOpen((open) => !open)}
                aria-expanded={resourcesOpen}
                className="flex w-full items-center justify-between px-2 py-1 text-left text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
              >
                শিক্ষা উপকরণ
                <span aria-hidden="true">{resourcesOpen ? "⌃" : "⌄"}</span>
              </button>
              {resourcesOpen && (
                <div className="mt-1">
                  {resourceLinks.map(({ title, description, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-xl px-2 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{description}</span>
                    </Link>
                  ))}
                  <p className="px-2 pt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">নোটের বিষয়</p>
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    {noteLinks.map((note) => (
                      <Link
                        key={note.href}
                        href={note.href}
                        onClick={closeMenu}
                        className="rounded-lg px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        {note.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setAboutOpen((open) => !open)}
                aria-expanded={aboutOpen}
                className="flex w-full items-center justify-between px-2 py-1 text-left text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
              >
                আমাদের সম্পর্কে
                <span aria-hidden="true">{aboutOpen ? "⌃" : "⌄"}</span>
              </button>
              {aboutOpen && (
                <nav aria-label="About page sections" className="mt-1 grid gap-1">
                  {aboutSections.map((section) => (
                    <Link
                      key={section.id}
                      href={`/about#${section.id}`}
                      onClick={closeMenu}
                      className="rounded-xl px-2 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {section.label}
                        <span className="ml-1.5 text-[11px] font-normal text-zinc-400">{section.englishLabel}</span>
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">{section.description}</span>
                    </Link>
                  ))}
                </nav>
              )}
            </div>
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
