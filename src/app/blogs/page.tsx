import type { Metadata } from "next";
import BlogExperience from "../../components/blogs/BlogExperience";

export const metadata: Metadata = {
  title: "ব্লগ",
  description:
    "চাকরির প্রস্তুতি, পড়াশোনা এবং ক্যারিয়ার নিয়ে জানুন, লিখুন ও অভিজ্ঞতা ভাগ করে নিন।",
};

export default function BlogsPage() {
  return <BlogExperience />;
}
