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
  { value: "১টি", label: "গোছানো প্রস্তুতির জায়গা", englishLabel: "one focused platform" },
  { value: "৩ ধাপ", label: "শিখুন · practice · test", englishLabel: "learn, practice, test" },
  { value: "২৪/৭", label: "নিজের সুবিধামতো", englishLabel: "learn at your pace" },
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
    description: "ছোট daily goals আর smart reminders দিয়ে ধারাবাহিকতা তৈরি করুন।",
  },
  {
    icon: FiBarChart2,
    title: "নিজের প্রস্তুতি বুঝতে পারছেন না?",
    description: "প্রতিটি পরীক্ষার পর দেখুন আপনার score, ভুল এবং উন্নতির জায়গা।",
  },
];

export type ExamCategory = {
  icon: IconType;
  title: string;
  englishTitle: string;
  description: string;
  count: string;
  accent: string;
};

export const examCategories: ExamCategory[] = [
  {
    icon: FiAward,
    title: "বিসিএস প্রস্তুতি",
    englishTitle: "BCS Preparation",
    description: "প্রিলিমিনারি, বিষয়ভিত্তিক MCQ ও পূর্ণাঙ্গ মডেল টেস্ট।",
    count: "৩২০+ practice sets",
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  {
    icon: FiBriefcase,
    title: "ব্যাংক জব",
    englishTitle: "Bank Jobs",
    description: "গণিত, ইংরেজি ও analytical ability-র targeted প্রস্তুতি।",
    count: "১৮০+ practice sets",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  },
  {
    icon: FiBookOpen,
    title: "প্রাথমিক শিক্ষক",
    englishTitle: "Primary Teacher",
    description: "বিগত প্রশ্ন, বিষয়ভিত্তিক অনুশীলন ও mock exam।",
    count: "১৪০+ practice sets",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    icon: FiLayers,
    title: "NTRCA ও শিক্ষক নিবন্ধন",
    englishTitle: "NTRCA & Teaching",
    description: "স্কুল, কলেজ ও শিক্ষক নিবন্ধনের সাজানো প্রস্তুতি।",
    count: "২১০+ practice sets",
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
  {
    icon: FiTrendingUp,
    title: "সরকারি চাকরি",
    englishTitle: "Government Jobs",
    description: "বিভিন্ন নিয়োগ পরীক্ষার গুরুত্বপূর্ণ প্রশ্ন ও প্রস্তুতি।",
    count: "২৬০+ practice sets",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  {
    icon: FiCheckCircle,
    title: "বিষয়ভিত্তিক অনুশীলন",
    englishTitle: "Topic-wise Practice",
    description: "বাংলা, English, গণিত, সাধারণ জ্ঞান ও ICT-তে practice।",
    count: "৫,০০০+ questions",
    accent: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  },
];

export const learningFeatures = [
  {
    icon: FiBookOpen,
    title: "গুছানো Study Materials",
    englishTitle: "Learn with a plan",
    description: "সিলেবাস ধরে সাজানো নোট, গুরুত্বপূর্ণ টপিক ও বিগত বছরের প্রশ্নে শিখুন।",
  },
  {
    icon: FiTarget,
    title: "বাস্তবসম্মত Mock Tests",
    englishTitle: "Practice under pressure",
    description: "সময় ধরে পরীক্ষা দিন, নিজের প্রস্তুতিকে যাচাই করুন আসল পরীক্ষার আগে।",
  },
  {
    icon: FiBarChart2,
    title: "Progress Analytics",
    englishTitle: "Know where you stand",
    description: "বিষয়ভিত্তিক performance দেখে বুঝুন কোথায় আরও মনোযোগ দরকার।",
  },
  {
    icon: FiUsers,
    title: "কমিউনিটির সাথে এগিয়ে যান",
    englishTitle: "Grow together",
    description: "অন্যদের সঙ্গে practice করুন, leaderboard দেখুন, অনুপ্রেরণা ধরে রাখুন।",
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
    description: "পড়ুন, topic-wise quiz দিন এবং নিয়মিত revision করুন।",
  },
  {
    number: "03",
    title: "পরীক্ষা দিন, উন্নতি করুন",
    englishTitle: "Test & improve",
    description: "Mock test-এর ফলাফল দেখে পরের প্রস্তুতি ঠিক করুন।",
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
    question: "এখানে কি বিনামূল্যে পরীক্ষা দেওয়া যাবে?",
    answer: "হ্যাঁ, শুরু করার জন্য free practice questions ও sample tests থাকবে। পরে আরও advanced test ও learning tools যোগ করা হবে।",
  },
  {
    question: "কোন কোন পরীক্ষার প্রস্তুতি পাওয়া যাবে?",
    answer: "BCS, ব্যাংক, প্রাথমিক শিক্ষক, NTRCA এবং বিভিন্ন সরকারি চাকরির প্রস্তুতি এক জায়গায় সাজানো থাকবে। নতুন category নিয়মিত যোগ হবে।",
  },
  {
    question: "মোবাইল থেকে ব্যবহার করা যাবে?",
    answer: "অবশ্যই। Chakriova মোবাইল, ট্যাবলেট ও desktop—সব screen size-এ ব্যবহার করার জন্য responsive করে তৈরি করা হচ্ছে।",
  },
  {
    question: "আমার test result কোথায় দেখতে পাব?",
    answer: "প্রতিটি test-এর পর score, সঠিক-ভুল উত্তর এবং বিষয়ভিত্তিক performance summary দেখার ব্যবস্থা থাকবে।",
  },
];
