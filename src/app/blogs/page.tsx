import type { Metadata } from "next";
import BlogExperience from "../../components/blogs/BlogExperience";

export const metadata: Metadata = {
  title: "ব্লগ",
  description:
    "চাকরির প্রস্তুতি, পড়াশোনা এবং ক্যারিয়ার নিয়ে জানুন, লিখুন ও অভিজ্ঞতা ভাগ করে নিন।",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/blogs",
    siteName: "Chakriova",
    title: "কমিউনিটি ব্লগ | Chakriova",
    description:
      "চাকরির প্রস্তুতি, পড়াশোনা এবং ক্যারিয়ার নিয়ে জানুন, লিখুন ও অভিজ্ঞতা ভাগ করে নিন।",
    images: [
      {
        url: "/blogs/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Chakriova Community Blog Feed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "কমিউনিটি ব্লগ | Chakriova",
    description:
      "চাকরির প্রস্তুতি, পড়াশোনা এবং ক্যারিয়ার নিয়ে জানুন, লিখুন ও অভিজ্ঞতা ভাগ করে নিন।",
    images: ["/blogs/opengraph-image"],
  },
};

export default function BlogsPage() {
  return <BlogExperience />;
}
