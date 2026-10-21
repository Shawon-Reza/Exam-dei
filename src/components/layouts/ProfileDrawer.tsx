"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiChevronRight,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import type { CurrentUser } from "@/src/apis/auth/auth.types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";

const fallbackAvatar =
  "https://res.cloudinary.com/dbmdhxmtx/image/upload/v1792349936/wired-lineal-21-avatar_dm77ip.gif";

const accountLinks = [
  {
    label: "ড্যাশবোর্ড",
    description: "আপনার প্রস্তুতির overview",
    href: "/exams",
    icon: FiGrid,
  },
  {
    label: "প্রোফাইল",
    description: "প্রোফাইল ও activity দেখুন",
    href: "/profile",
    icon: FiUser,
  },
  {
    label: "প্রশ্ন ব্যাংক",
    description: "পূর্ববর্তী প্রশ্ন অনুশীলন করুন",
    href: "/question-bank",
    icon: FiHelpCircle,
  },
];

type ProfileDrawerProps = {
  user: CurrentUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
  isLoggingOut: boolean;
};

export default function ProfileDrawer({
  user,
  open,
  onOpenChange,
  onLogout,
  isLoggingOut,
}: ProfileDrawerProps) {
  const avatar = user.image || fallbackAvatar;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="w-[min(82vw,340px)] border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 sm:w-[340px]">
        <DrawerHeader className="border-b border-zinc-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-4 dark:border-zinc-800 dark:from-emerald-950/40 dark:via-zinc-950 dark:to-cyan-950/30 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="relative inline-flex">
                <Image
                  className="size-14 rounded-2xl border-2 border-white object-cover shadow-lg dark:border-zinc-800"
                  src={avatar}
                  alt="Profile"
                  width={112}
                  height={112}
                />
                <span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-950" />
              </div>
              <DrawerTitle className="mt-3 truncate text-base font-extrabold text-zinc-950 dark:text-white">
                আপনার অ্যাকাউন্ট
              </DrawerTitle>
              <DrawerDescription className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Chakriova learner profile
              </DrawerDescription>
            </div>
            <DrawerClose
              type="button"
              aria-label="প্রোফাইল মেনু বন্ধ করুন"
              className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/80 text-zinc-500 shadow-sm transition hover:bg-white hover:text-zinc-900 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <FiX aria-hidden="true" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          <p className="px-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-400">
            আপনার workspace
          </p>
          <div className="mt-2 space-y-1">
            {accountLinks.map(({ label, description, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => onOpenChange(false)}
                className="group flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-zinc-900 dark:text-white">{label}</span>
                  <span className="mt-0.5 block truncate text-[11px] text-zinc-500 dark:text-zinc-400">{description}</span>
                </span>
                <FiChevronRight className="size-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="my-4 border-t border-zinc-100 dark:border-zinc-800" />
          <p className="px-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-400">
            অ্যাকাউন্ট
          </p>
          <button
            type="button"
            className="group mt-2 flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <FiSettings aria-hidden="true" className="size-4" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-zinc-900 dark:text-white">সেটিংস</span>
              <span className="mt-0.5 block text-[11px] text-zinc-500 dark:text-zinc-400">অ্যাকাউন্ট সেটিংস</span>
            </span>
            <FiChevronRight className="size-4 text-zinc-400" aria-hidden="true" />
          </button>
        </div>

        <DrawerFooter className="border-t border-zinc-100 p-3 pt-3 dark:border-zinc-800 sm:p-4 sm:pt-4">
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/50 px-4 text-sm font-bold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-300 dark:hover:bg-rose-950/40"
          >
            <FiLogOut aria-hidden="true" />
            {isLoggingOut ? "Logging out..." : "লগআউট"}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
