import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export const platformStats = [
  { value: "৫টি", label: "মূল প্রস্তুতির ক্ষেত্র", englishLabel: "core preparation areas" },
  { value: "৩ ধাপ", label: "শিখুন · practice · test", englishLabel: "learn, practice, test" },
  { value: "১টি", label: "গোছানো preparation hub", englishLabel: "one focused platform" },
];

export const painPoints = [
  {
    icon: FiTarget,
    title: "কোথা থেকে শুরু করব?",
    description: "সিলেবাস, রুটিন আর সঠিক গাইডলাইন—সব এক জায়গায় গুছিয়ে নিন।",
  },
  {
    icon: FiClock,
    title: "নিয়মিত পড়া হচ্ছে না?",
    description: "ছোট topic, practice set ও mock test দিয়ে প্রতিদিনের প্রস্তুতি manageable রাখুন।",
  },
  {
    icon: FiBarChart2,
    title: "নিজের প্রস্তুতি বুঝতে পারছেন না?",
    description: "পরীক্ষার ফল, score ও বিষয়ভিত্তিক performance দেখে পরের revision ঠিক করুন।",
  },
];

export type ExamCategory = {
  icon: IconType;
  title: string;
  englishTitle: string;
  description: string;
  count: string;
  accent: string;
  href: string;
};

export const examCategories: ExamCategory[] = [
  {
    icon: FiAward,
    title: "বিসিএস প্রস্তুতি",
    englishTitle: "BCS Preparation",
    description: "প্রিলিমিনারি, বিষয়ভিত্তিক MCQ ও পূর্ণাঙ্গ মডেল টেস্ট।",
    count: "প্রিলিমিনারি · MCQ · mock test",
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    href: "/exams",
  },
  {
    icon: FiBriefcase,
    title: "ব্যাংক জব",
    englishTitle: "Bank Jobs",
    description: "গণিত, ইংরেজি ও analytical ability-র targeted প্রস্তুতি।",
    count: "গণিত · ইংরেজি · reasoning",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
    href: "/exams",
  },
  {
    icon: FiBookOpen,
    title: "প্রাথমিক শিক্ষক",
    englishTitle: "Primary Teacher",
    description: "বিগত প্রশ্ন, বিষয়ভিত্তিক অনুশীলন ও mock exam।",
    count: "বিগত প্রশ্ন · subject practice",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    href: "/exams",
  },
  {
    icon: FiLayers,
    title: "NTRCA ও শিক্ষক নিবন্ধন",
    englishTitle: "NTRCA & Teaching",
    description: "স্কুল, কলেজ ও শিক্ষক নিবন্ধনের সাজানো প্রস্তুতি।",
    count: "স্কুল · কলেজ · মাদ্রাসা",
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    href: "/exams",
  },
  {
    icon: FiTrendingUp,
    title: "সরকারি চাকরি",
    englishTitle: "Government Jobs",
    description: "বিভিন্ন নিয়োগ পরীক্ষার গুরুত্বপূর্ণ প্রশ্ন ও প্রস্তুতি।",
    count: "নিয়োগ পরীক্ষা · question sets",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    href: "/exams",
  },
  {
    icon: FiCheckCircle,
    title: "বিষয়ভিত্তিক অনুশীলন",
    englishTitle: "Topic-wise Practice",
    description: "বাংলা, English, গণিত, সাধারণ জ্ঞান ও ICT-তে practice।",
    count: "বাংলা · English · গণিত · GK · ICT",
    accent: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
    href: "/topics",
  },
];

export const learningFeatures = [
  {
    icon: FiBookOpen,
    title: "বিষয়ভিত্তিক নোট",
    englishTitle: "Study by subject",
    description: "বাংলা, ইংরেজি, সাধারণ জ্ঞান, গণিত ও ICT-এর গুরুত্বপূর্ণ topic ধরে পড়ুন।",
  },
  {
    icon: FiTarget,
    title: "Topic-wise MCQ practice",
    englishTitle: "Practice with purpose",
    description: "পড়া topic থেকে MCQ অনুশীলন করুন, ধারণা পরিষ্কার করুন এবং practice চালিয়ে যান।",
  },
  {
    icon: FiBarChart2,
    title: "Exam ও result review",
    englishTitle: "Test and review",
    description: "সময় ধরে exam দিন এবং result দেখে কোন বিষয়ে আরও কাজ দরকার তা বুঝুন।",
  },
  {
    icon: FiUsers,
    title: "Question bank ও community",
    englishTitle: "Learn beyond tests",
    description: "পূর্ববর্তী প্রশ্ন দেখুন, blog পড়ুন এবং leaderboard থেকে নিজের অগ্রগতির অনুপ্রেরণা নিন।",
  },
];

export const learningSteps = [
  {
    number: "01",
    title: "লক্ষ্য বেছে নিন",
    englishTitle: "Choose your goal",
    description: "আপনার পছন্দের চাকরি বা পরীক্ষাটি নির্বাচন করুন।",
  },
  {
    number: "02",
    title: "শিখুন ও অনুশীলন করুন",
    englishTitle: "Learn & practice",
    description: "নোট পড়ুন, topic-wise MCQ practice করুন এবং প্রয়োজনীয় বিষয় bookmark করে রাখুন।",
  },
  {
    number: "03",
    title: "পরীক্ষা দিন, উন্নতি করুন",
    englishTitle: "Test & improve",
    description: "Exam দিন, result ও ভুল উত্তর review করে পরের প্রস্তুতি ঠিক করুন।",
  },
];

export const leaderboard = [
  { name: "সাবিহা রহমান", englishName: "Sabiha Rahman", score: "৯৮.৫%", initials: "সা", rank: 1 },
  { name: "মাহিন হাসান", englishName: "Mahin Hasan", score: "৯৬.৮%", initials: "মা", rank: 2 },
  { name: "নুসরাত জাহান", englishName: "Nusrat Jahan", score: "৯৫.২%", initials: "নু", rank: 3 },
  { name: "তানভীর আহমেদ", englishName: "Tanvir Ahmed", score: "৯৩.৭%", initials: "তা", rank: 4 },
  { name: "ফারহানা ইসলাম", englishName: "Farhana Islam", score: "৯২.৪%", initials: "ফা", rank: 5 },
];

export const frequentlyAskedQuestions = [
  {
    question: "চাকরির প্রস্তুতি কীভাবে শুরু করব?",
    answer: "আপনার লক্ষ্য পরীক্ষা বেছে নিয়ে সিলেবাস দেখে শুরু করুন। এরপর topic-wise study materials পড়ুন, নিয়মিত quiz দিন এবং সাপ্তাহিক mock test-এর মাধ্যমে progress যাচাই করুন।",
  },
  {
    question: "এখানে কী কী practice করা যাবে?",
    answer: "বিষয়ভিত্তিক MCQ practice, topic notes, পূর্ববর্তী প্রশ্নের question bank এবং সময় ধরে exam—সবগুলো আলাদা flow-তে ব্যবহার করতে পারবেন।",
  },
  {
    question: "কোন কোন পরীক্ষার প্রস্তুতি পাওয়া যাবে?",
    answer: "BCS, ব্যাংক, প্রাথমিক শিক্ষক, NTRCA এবং বিভিন্ন সরকারি চাকরির প্রস্তুতির জন্য topics, exams ও question bank সাজানো আছে।",
  },
  {
    question: "মোবাইল থেকে ব্যবহার করা যাবে?",
    answer: "অবশ্যই। Chakriova মোবাইল, ট্যাবলেট ও desktop—সব screen size-এ ব্যবহার করার জন্য responsive করে তৈরি করা হচ্ছে।",
  },
  {
    question: "আমার test result কোথায় দেখতে পাব?",
    answer: "Exam শেষ হলে result screen-এ score, সঠিক-ভুল উত্তর ও performance review দেখে পরের প্রস্তুতি ঠিক করতে পারবেন।",
  },
];
