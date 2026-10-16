export type DropdownName = "courses" | "pages" | "notes" | "exams";

type NavigationLink = {
  type: "link";
  label: string;
  href: string;
};

type NavigationDropdown = {
  type: "dropdown";
  label: string;
  id: DropdownName;
};

export type NavigationItem = NavigationLink | NavigationDropdown;

export const navigationItems: NavigationItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "dropdown", label: "Notes", id: "notes" },
  { type: "dropdown", label: "Exams", id: "exams" },
  { type: "dropdown", label: "Pages", id: "pages" },
  { type: "link", label: "Success Stories", href: "/success-stories" },
  { type: "link", label: "Blogs", href: "/blogs" },
  { type: "link", label: "About Us", href: "/about-us" },
];

export const courseLinks = ["All Courses", "Web Development", "Design", "Business"];

export function menuHref(label: string) {
  return `/${label.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`;
}
