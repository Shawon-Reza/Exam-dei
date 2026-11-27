import Image from "next/image";
import Link from "next/link";
import logo from "@/src/app/icon.jpg";

const navigationWidths = ["w-24", "w-24", "w-32", "w-28"];

export default function NavbarLoading() {
  return (
    <header
      aria-busy="true"
      className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/90"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label="Chakriova home" className="flex shrink-0 items-center gap-2.5">
          <Image
            src={logo}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-2xl"
            priority
          />
          <span className="text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-xl">
            Chakri<span className="text-emerald-500">ova</span>
          </span>
        </Link>

        <div aria-hidden="true" className="hidden animate-pulse items-center gap-3 lg:flex">
          {navigationWidths.map((width, index) => (
            <span
              key={index}
              className={`h-9 ${width} rounded-full bg-zinc-200/80 dark:bg-zinc-800`}
            />
          ))}
        </div>

        <div aria-hidden="true" className="flex shrink-0 animate-pulse items-center gap-2">
          <span className="size-9 rounded-full bg-zinc-200/80 dark:bg-zinc-800" />
          <span className="size-9 rounded-full bg-zinc-200/80 dark:bg-zinc-800" />
          <span className="size-9 rounded-full bg-zinc-200/80 dark:bg-zinc-800" />
          <span className="size-10 rounded-full bg-zinc-200/80 dark:bg-zinc-800 lg:hidden" />
        </div>
        <span role="status" className="sr-only">
          Loading navigation
        </span>
      </nav>
    </header>
  );
}
