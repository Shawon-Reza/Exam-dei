import Link from "next/link";
import { menuHref } from "./navigation";

const pageSections = [
  {
    heading: "Company",
    links: ["Mentor List", "Career", "Blog List", "Affiliation Program", "Support", "Privacy Policy"],
  },
  {
    heading: "Authentication",
    links: ["Login", "Register", "Forgot Password", "Reset Password", "Two Factor Authentication", "Verify Email"],
  },
  {
    heading: "Profile Pages",
    links: ["My Profile", "Wishlist", "Purchased Courses", "My Certificates", "Create Course"],
  },
  {
    heading: "Account & Billing",
    links: ["Course Dashboard", "Payment Methods", "Subscription", "Credits", "Refer a Friend"],
  },
];

type PagesMenuProps = {
  variant: "desktop" | "mobile";
  onNavigate: () => void;
};

export default function PagesMenu({ variant, onNavigate }: PagesMenuProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "grid grid-cols-1 gap-x-6 gap-y-4 py-3 sm:grid-cols-2"
          : "absolute right-4 top-full hidden w-[min(900px,calc(100vw-2rem))] grid-cols-4 gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg xl:grid xl:right-10 dark:border-zinc-700 dark:bg-zinc-900"
      }
    >
      {pageSections.map((section) => (
        <section key={section.heading}>
          <h2
            className={
              isMobile
                ? "mb-1 text-sm font-semibold text-zinc-950 dark:text-white"
                : "mb-3 text-sm font-semibold text-zinc-950 dark:text-white"
            }
          >
            {section.heading}
          </h2>
          <ul className={isMobile ? undefined : "space-y-1"}>
            {section.links.map((label) => (
              <li key={label}>
                <Link
                  href={menuHref(label)}
                  onClick={onNavigate}
                  className={
                    isMobile
                      ? "block py-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      : "block rounded-lg py-1.5 text-sm text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
