"use client";

import { useTheme } from "next-themes";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle light and dark mode"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
    >
      {
        resolvedTheme === "dark" ?
          (
            <FiMoon aria-hidden="true" className="size-5 " />
          )
          :
          (
            <IoSunnyOutline  aria-hidden="true" className="size-5" />
          )
      }
    </button>
  );
}
