import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import logo from "@/src/app/icon.jpg";

const footerGroups = [
  {
    title: "পরীক্ষার প্রস্তুতি",
    links: [
      { label: "BCS Preparation", href: "#exams" },
      { label: "Bank Jobs", href: "#exams" },
      { label: "Primary Teacher", href: "#exams" },
      { label: "NTRCA", href: "#exams" },
    ],
  },
  {
    title: "শিখুন ও অনুশীলন করুন",
    links: [
      { label: "Practice Tests", href: "#features" },
      { label: "Study Materials", href: "#features" },
      { label: "Leaderboard", href: "#leaderboard" },
      { label: "সাধারণ জিজ্ঞাসা", href: "#faq" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", icon: FiFacebook, href: "https://facebook.com" },
  { label: "Instagram", icon: FiInstagram, href: "https://instagram.com" },
  { label: "YouTube", icon: FiYoutube, href: "https://youtube.com" },
];

export function ByteSpaceMark() {
  return (
    <span className="grid size-10 place-items-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
      <FiBookOpen aria-hidden="true" className="size-5" />
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full text-white shadow-lg shadow-emerald-500/20 border border-2 border-b-emerald-500">
                <Image
                  src={logo}
                  alt="Chakriova Logo"
                  width={40}
                  height={40}
                  className="rounded-2xl"
                />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Chakri<span className="text-emerald-500">ova</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              বাংলাদেশের চাকরিপ্রার্থীদের জন্য smart preparation platform.
              Learn, practice, take mock exams, and move closer to your goal.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-900 dark:hover:text-emerald-300"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-500 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© Chakriova. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>বাংলাদেশের চাকরিপ্রার্থীদের জন্য তৈরি, যত্নসহকারে।</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
