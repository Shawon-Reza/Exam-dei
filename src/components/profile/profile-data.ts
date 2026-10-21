export type ProfileExperience = {
  role: string;
  organization: string;
  period: string;
  description: string;
};

export type ProfileEducation = {
  degree: string;
  institution: string;
  period: string;
  result?: string;
};

export const profileData = {
  name: "শাওন রেজা",
  username: "@shawonreza",
  initials: "শা",
  location: "ঢাকা, বাংলাদেশ",
  headline: "চাকরিপ্রার্থী · Full-stack Developer",
  bio: "শিখছি, তৈরি করছি এবং চাকরির প্রস্তুতির অভিজ্ঞতা কমিউনিটির সঙ্গে ভাগ করছি। নিয়মিত MCQ practice ও skill development-এর মাধ্যমে নিজের লক্ষ্যে এগিয়ে যাচ্ছি।",
  joined: "জানুয়ারি ২০২৫ থেকে সদস্য",
  stats: [
    { label: "পোস্ট", value: "২৪" },
    { label: "ফলোয়ার", value: "১৮৬" },
    { label: "ফলো করছেন", value: "৭৪" },
  ],
  skills: ["JavaScript", "React", "Next.js", "বাংলা", "সাধারণ জ্ঞান", "Problem Solving"],
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "ঢাকা বিশ্ববিদ্যালয়",
      period: "২০২০ — ২০২৪",
      result: "CGPA ৩.৬৫",
    },
    {
      degree: "উচ্চ মাধ্যমিক সার্টিফিকেট",
      institution: "ঢাকা কলেজ",
      period: "২০১৮ — ২০২০",
    },
  ] satisfies ProfileEducation[],
  experience: [
    {
      role: "Frontend Developer",
      organization: "Chakriova",
      period: "জানুয়ারি ২০২৫ — বর্তমান",
      description: "Responsive learning experience, exam flow ও community features তৈরি করছি।",
    },
    {
      role: "Junior Web Developer",
      organization: "Tech Solutions Ltd.",
      period: "জুন ২০২৪ — ডিসেম্বর ২০২৪",
      description: "React ও REST API ব্যবহার করে business dashboard তৈরি করেছি।",
    },
  ] satisfies ProfileExperience[],
};

export const profileActivity = [
  {
    type: "post",
    title: "BCS প্রস্তুতির জন্য ৬ মাসের একটি বাস্তবসম্মত পরিকল্পনা শেয়ার করেছেন",
    time: "২ দিন আগে",
    accent: "bg-emerald-500",
  },
  {
    type: "exam",
    title: "বাংলা বিষয়ের ২৫টি MCQ practice সম্পন্ন করেছেন",
    time: "৫ দিন আগে",
    accent: "bg-violet-500",
  },
  {
    type: "achievement",
    title: "সাপ্তাহিক practice streak-এ ৭ দিন সম্পন্ন করেছেন",
    time: "১ সপ্তাহ আগে",
    accent: "bg-amber-500",
  },
];
