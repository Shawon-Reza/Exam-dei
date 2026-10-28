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
import { aboutSections } from "@/src/components/about/about-data";

const navigationLinks = [
  { label: "ফিচার", englishLabel: "Features", href: "/#features" },
  { label: "বিষয়সমূহ", englishLabel: "Topics", href: "/topics" },
  { label: "পরীক্ষা", englishLabel: "Exams", href: "/exams" },
  { label: "ব্লগ", englishLabel: "Blog", href: "/blogs" },
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
                className="absolute right-0 top-full z-50 w-[min(680px,calc(100vw-2rem))] pt-2"
              >
                <div className="grid max-h-[min(70vh,520px)] gap-4 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-5 sm:p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      প্রস্তুতির উপকরণ
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      আপনার প্রয়োজন অনুযায়ী প্রশ্ন, নোট ও বই বেছে নিয়ে প্রস্তুতি আরও গুছিয়ে নিন।
                    </p>
                    <div className="mt-4 space-y-2">
                      {resourceLinks.map(({ title, description, href, icon: Icon }) => (
                        <Link key={href} href={href} onClick={closeMenu} className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <Icon className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          <span>
                            <span className="block font-bold text-zinc-900 dark:text-white">{title}</span>
                            <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                    <div className="flex items-center gap-2">
                      <FiFileText className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <div>
                        <h2 className="text-sm font-bold text-zinc-900 dark:text-white">বিষয়ভিত্তিক নোট</h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">যে বিষয়ের নোট পড়তে চান বেছে নিন</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {noteLinks.map((note) => (
                        <Link key={note.href} href={note.href} onClick={closeMenu} className="block rounded-lg border border-zinc-200 bg-white p-2 transition hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-emerald-950/30">
                          <span>
                            <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-100">{note.label}</span>
                            <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">{note.englishLabel}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
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
                className="absolute right-0 top-full z-50 w-[min(390px,calc(100vw-2rem))] pt-2"
              >
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="px-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Chakriova সম্পর্কে
                  </p>
                  <p className="px-2 pt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    আমাদের উদ্দেশ্য, মানুষ এবং গল্প সম্পর্কে জানুন।
                  </p>
                  <nav aria-label="About page sections" className="mt-3 grid gap-1 sm:grid-cols-2">
                    {aboutSections.map((section) => {
                      const Icon = aboutSectionIcons[section.id];
                      return (
                        <Link
                          key={section.id}
                          href={`/about#${section.id}`}
                          onClick={closeMenu}
                          className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                        >
                          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span>
                            <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                              {section.label}
                              <span className="ml-1 text-[10px] font-medium text-zinc-400">{section.englishLabel}</span>
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-4 text-zinc-500 dark:text-zinc-400">
                              {section.description}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle />


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
