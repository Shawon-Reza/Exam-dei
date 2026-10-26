import type { Metadata } from "next";
import AboutPage from "@/src/components/about/AboutPage";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description:
    "Chakriova-র লক্ষ্য, মিশন, ভিশন এবং বাংলাদেশের চাকরিপ্রার্থীদের প্রস্তুতিতে সহায়তা করার পেছনের গল্প জানুন।",
  alternates: {
    canonical: "/about",
  },
  keywords: [
    "Chakriova সম্পর্কে",
    "চাকরি প্রস্তুতি বাংলাদেশ",
    "চাকরিপ্রার্থীদের প্রস্তুতি",
    "Chakriova mission",
    "Chakriova about",
  ],
  openGraph: {
    type: "website",
    url: "/about",
    title: "আমাদের সম্পর্কে | Chakriova",
    description:
      "Chakriova-র উদ্দেশ্য, ভবিষ্যৎ ভাবনা এবং চাকরিপ্রার্থীদের পাশে থাকার গল্প জানুন।",
    siteName: "Chakriova",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "আমাদের সম্পর্কে | Chakriova",
    description:
      "Chakriova-র উদ্দেশ্য, ভবিষ্যৎ ভাবনা এবং চাকরিপ্রার্থীদের পাশে থাকার গল্প জানুন।",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
