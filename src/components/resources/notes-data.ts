export type NoteSubject = {
  slug: string;
  label: string;
  englishLabel: string;
  description: string;
  topics: string[];
};

export const noteSubjects: NoteSubject[] = [
  {
    slug: "bangla",
    label: "বাংলা",
    englishLabel: "Bangla",
    description: "ব্যাকরণ, সাহিত্য ও লিখিত পরীক্ষার গুরুত্বপূর্ণ বাংলা নোট।",
    topics: ["সন্ধি ও সমাস", "কারক ও বিভক্তি", "বাংলা সাহিত্য", "শুদ্ধ বানান"],
  },
  {
    slug: "english",
    label: "ইংরেজি",
    englishLabel: "English",
    description: "Grammar, vocabulary এবং পরীক্ষায় আসা গুরুত্বপূর্ণ English topics।",
    topics: ["Parts of Speech", "Tense & Voice", "Synonym & Antonym", "ভুল সংশোধন"],
  },
  {
    slug: "gk",
    label: "সাধারণ জ্ঞান",
    englishLabel: "General Knowledge",
    description: "বাংলাদেশ, আন্তর্জাতিক বিষয় ও সাম্প্রতিক তথ্যের সংক্ষিপ্ত নোট।",
    topics: ["বাংলাদেশ বিষয়াবলি", "মুক্তিযুদ্ধ", "আন্তর্জাতিক বিষয়", "ভূগোল ও পরিবেশ"],
  },
  {
    slug: "math",
    label: "গণিত",
    englishLabel: "Mathematics",
    description: "চাকরির পরীক্ষার জন্য প্রয়োজনীয় সূত্র, কৌশল ও উদাহরণ।",
    topics: ["শতকরা", "লাভ-ক্ষতি", "অনুপাত ও সমানুপাত", "সময় ও কাজ"],
  },
  {
    slug: "ict",
    label: "ICT",
    englishLabel: "Information & Communication Technology",
    description: "কম্পিউটার, তথ্যপ্রযুক্তি ও ডিজিটাল বাংলাদেশ বিষয়ক নোট।",
    topics: ["কম্পিউটার বেসিক", "নেটওয়ার্কিং", "ডেটাবেজ", "সাইবার নিরাপত্তা"],
  },
];

export function getNoteSubject(slug: string) {
  return noteSubjects.find((subject) => subject.slug === slug);
}
