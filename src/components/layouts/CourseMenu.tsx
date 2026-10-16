import Link from "next/link";
import { courseLinks, menuHref } from "./navigation";

type CourseMenuProps = {
  variant: "desktop" | "mobile";
  onNavigate: () => void;
};

export default function CourseMenu({ variant, onNavigate }: CourseMenuProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "ml-3 border-l border-zinc-200 pl-4 dark:border-zinc-700"
          : "absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
      }
    >
      {courseLinks.map((label) => (
        <Link
          key={label}
          href={menuHref(label)}
          onClick={onNavigate}
          className={
            isMobile
              ? "block py-2 text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              : "block rounded-lg px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          }
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
