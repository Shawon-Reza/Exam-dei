import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiTrendingUp,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type ExamTopic = {
  id: string;
  label: string;
  slug?: string;
  description?: string;
  searchName?: string;
  sortOrder?: number;
  isActive?: boolean;
  iconUrl?: string | null;
  subjectId?: string;
  pdfCount?: number;
  _count?: {
    pdfs: number;
    questions: number;
    tests: number;
  };
};

export type ExamSubject = {
  id: string;
  slug?: string;
  label: string;
  englishLabel: string;
  description: string;
  iconUrl?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  questionCount: string;
  icon: IconType;
  color: string;
  topics: ExamTopic[];
};

export type ExamCategory = {
  id: string;
  label: string;
  englishLabel: string;
  description: string;
  icon: IconType;
  color: string;
};

export type ExamQuestion = {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type ExamStatus = "LIVE" | "UPCOMING" | "PRACTICE";

export type Exam = {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  totalQuestions: number;
  isActive: boolean;
  status: ExamStatus;
  startsAt?: string;
  endsAt?: string;
  questions: ExamQuestion[];
};

export const examSubjects: ExamSubject[] = [
  {
    id: "bangla",
    label: "বাংলা",
    englishLabel: "Bangla",
    description: "ব্যাকরণ, সাহিত্য ও ভাষারীতি",
    questionCount: "১,২৪০+",
    icon: FiBookOpen,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    topics: [
      { id: "shomash", label: "সমাস" },
      { id: "shondhi", label: "সন্ধি" },
      { id: "karok", label: "কারক ও বিভক্তি" },
      { id: "bagdhara", label: "বাগধারা" },
      { id: "shahitto", label: "বাংলা সাহিত্য" },
      { id: "shuddho", label: "শুদ্ধ বানান" },
    ],
  },
  {
    id: "english",
    label: "ইংরেজি",
    englishLabel: "English",
    description: "Grammar, vocabulary ও literature",
    questionCount: "১,০৮০+",
    icon: FiGlobe,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
    topics: [
      { id: "tense", label: "Tense" },
      { id: "voice", label: "Voice" },
      { id: "preposition", label: "Preposition" },
      { id: "synonym", label: "Synonym & Antonym" },
      { id: "sentence", label: "Sentence Correction" },
      { id: "literature", label: "English Literature" },
    ],
  },
  {
    id: "math",
    label: "গণিত",
    englishLabel: "Mathematics",
    description: "পাটিগণিত, বীজগণিত ও জ্যামিতি",
    questionCount: "৯৬০+",
    icon: FiTrendingUp,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    topics: [
      { id: "percentage", label: "শতকরা" },
      { id: "profit", label: "লাভ-ক্ষতি" },
      { id: "ratio", label: "অনুপাত" },
      { id: "algebra", label: "বীজগণিত" },
      { id: "geometry", label: "জ্যামিতি" },
      { id: "interest", label: "সুদকষা" },
    ],
  },
  {
    id: "gk",
    label: "সাধারণ জ্ঞান",
    englishLabel: "General Knowledge",
    description: "বাংলাদেশ, আন্তর্জাতিক ও সাম্প্রতিক",
    questionCount: "১,৫০০+",
    icon: FiLayers,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    topics: [
      { id: "bangladesh", label: "বাংলাদেশ বিষয়াবলি" },
      { id: "international", label: "আন্তর্জাতিক বিষয়াবলি" },
      { id: "liberation", label: "মুক্তিযুদ্ধ" },
      { id: "constitution", label: "সংবিধান" },
      { id: "current", label: "সাম্প্রতিক" },
      { id: "science", label: "বিজ্ঞান ও ICT" },
    ],
  },
  {
    id: "science",
    label: "বিজ্ঞান ও ICT",
    englishLabel: "Science & ICT",
    description: "বিজ্ঞান, প্রযুক্তি ও কম্পিউটার",
    questionCount: "৭৮০+",
    icon: FiMonitor,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
    topics: [
      { id: "computer", label: "কম্পিউটার" },
      { id: "internet", label: "ইন্টারনেট ও নেটওয়ার্ক" },
      { id: "physics", label: "পদার্থবিজ্ঞান" },
      { id: "biology", label: "জীববিজ্ঞান" },
      { id: "chemistry", label: "রসায়ন" },
      { id: "technology", label: "প্রযুক্তি" },
    ],
  },
];

export const examCategories: ExamCategory[] = [
  {
    id: "bcs",
    label: "বিসিএস",
    englishLabel: "BCS",
    description: "প্রিলিমিনারি ও বিষয়ভিত্তিক প্রস্তুতি",
    icon: FiAward,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  {
    id: "ntrca",
    label: "NTRCA",
    englishLabel: "Teacher Registration",
    description: "স্কুল, স্কুল-২ ও কলেজ পর্যায়",
    icon: FiBookOpen,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  {
    id: "primary",
    label: "প্রাথমিক শিক্ষক",
    englishLabel: "Primary Teacher",
    description: "সহকারী শিক্ষক নিয়োগ প্রস্তুতি",
    icon: FiLayers,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    id: "bank",
    label: "ব্যাংক জব",
    englishLabel: "Bank Jobs",
    description: "ব্যাংক নিয়োগ ও সমন্বিত পরীক্ষা",
    icon: FiBriefcase,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  },
  {
    id: "govt",
    label: "সরকারি চাকরি",
    englishLabel: "Government Jobs",
    description: "বিভিন্ন মন্ত্রণালয় ও অধিদপ্তর",
    icon: FiBriefcase,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
];

const questionSets: Record<string, ExamQuestion[]> = {
  bangla: [
    {
      prompt: "‘রাজপুত্র’ কোন সমাসের উদাহরণ?",
      options: ["কর্মধারয়", "ষষ্ঠী তৎপুরুষ", "দ্বন্দ্ব", "বহুব্রীহি"],
      answerIndex: 1,
      explanation: "‘রাজার পুত্র’—ব্যাসবাক্যে ষষ্ঠী বিভক্তি থাকে, তাই এটি ষষ্ঠী তৎপুরুষ সমাস।",
    },
    {
      prompt: "নিচের কোনটি সঠিক বানান?",
      options: ["মুমূর্ষু", "মুমুর্ষু", "মুমূর্ষূ", "মুমুর্ষূ"],
      answerIndex: 0,
      explanation: "সঠিক বানান ‘মুমূর্ষু’।",
    },
    {
      prompt: "‘আকাশ-কুসুম’ বাগধারাটির অর্থ কী?",
      options: ["খুব সুন্দর ফুল", "অলীক কল্পনা", "আকাশের তারা", "অপ্রত্যাশিত ঘটনা"],
      answerIndex: 1,
      explanation: "‘আকাশ-কুসুম’ বলতে অবাস্তব বা অলীক কল্পনাকে বোঝায়।",
    },
  ],
  shomash: [
    {
      prompt: "‘নীলকমল’ কোন সমাসের উদাহরণ?",
      options: ["দ্বন্দ্ব", "কর্মধারয়", "ষষ্ঠী তৎপুরুষ", "বহুব্রীহি"],
      answerIndex: 1,
      explanation: "নীল যে কমল—এখানে বিশেষণ ও বিশেষ্য মিলে কর্মধারয় সমাস হয়েছে।",
    },
    {
      prompt: "‘দশানন’ কোন সমাসের উদাহরণ?",
      options: ["দ্বিগু", "দ্বন্দ্ব", "বহুব্রীহি", "অব্যয়ীভাব"],
      answerIndex: 2,
      explanation: "দশ আনন (মুখ) যার—অর্থাৎ রাবণ। এখানে সমাসবদ্ধ পদটি অন্য ব্যক্তিকে বোঝায়, তাই বহুব্রীহি সমাস।",
    },
    {
      prompt: "নিচের কোনটি শুদ্ধ বানান?",
      options: ["মুহুর্ত", "মুহূর্ত", "মূহুর্ত", "মূহূর্ত"],
      answerIndex: 1,
      explanation: "শুদ্ধ বানান ‘মুহূর্ত’।",
    },
    {
      prompt: "‘অরণ্যে রোদন’ বাগধারাটির অর্থ কী?",
      options: ["বনে কান্না করা", "নির্জনে থাকা", "নিষ্ফল আবেদন", "বিপদে পড়া"],
      answerIndex: 2,
      explanation: "‘অরণ্যে রোদন’ অর্থ এমন আবেদন বা কান্না, যা কেউ শোনে না বা যার কোনো ফল হয় না।",
    },
    {
      prompt: "‘যে উপকারীর উপকার স্বীকার করে’—এক কথায় কী?",
      options: ["কৃতঘ্ন", "কৃতজ্ঞ", "পরোপকারী", "উদার"],
      answerIndex: 1,
      explanation: "যে অন্যের উপকার স্বীকার করে, তাকে কৃতজ্ঞ বলে।",
    },
    {
      prompt: "‘বিদ্যালয়’ শব্দের সন্ধিবিচ্ছেদ কোনটি?",
      options: ["বিদ্যা + লয়", "বিদ্যা + আলয়", "বিদ্য + আলয়", "বিদি + আলয়"],
      answerIndex: 1,
      explanation: "বিদ্যা + আলয় = বিদ্যালয়। আ + আ মিলে আ হয়েছে।",
    },
    {
      prompt: "‘গড্ডলিকা প্রবাহ’ বাগধারাটির অর্থ কী?",
      options: ["দ্রুত গতিতে চলা", "অন্ধ অনুকরণ", "দলবদ্ধভাবে কাজ করা", "প্রবল স্রোত"],
      answerIndex: 1,
      explanation: "‘গড্ডলিকা প্রবাহ’ অর্থ বিচার-বিবেচনা না করে অন্যদের অনুসরণ করা।",
    },
    {
      prompt: "‘যিনি বক্তৃতা দিতে পারদর্শী’—এক কথায় কী?",
      options: ["বাচাল", "বক্তা", "বাগ্মী", "বক্তৃতাকার"],
      answerIndex: 2,
      explanation: "যিনি সুন্দর ও প্রভাবশালীভাবে কথা বলতে পারেন, তাঁকে বাগ্মী বলা হয়।",
    },
    {
      prompt: "‘কাঁটা দিয়ে কাঁটা তোলা’ বাগধারাটির অর্থ কী?",
      options: ["কষ্ট সহ্য করা", "এক বিপদ দিয়ে অন্য বিপদ দূর করা", "এক উপায়ে অন্য উপায় ব্যর্থ করা", "শত্রুকে সাহায্য করা"],
      answerIndex: 1,
      explanation: "‘কাঁটা দিয়ে কাঁটা তোলা’ অর্থ একটি সমস্যার সাহায্যে অন্য একটি সমস্যা দূর করা।",
    },
    {
      prompt: "‘যে ভবিষ্যৎ চিন্তা করে কাজ করে’—এক কথায় কী?",
      options: ["দূরদর্শী", "স্বার্থপর", "কল্পনাপ্রবণ", "ক্ষণস্থায়ী"],
      answerIndex: 0,
      explanation: "যিনি ভবিষ্যতের ফলাফল বিবেচনা করে সিদ্ধান্ত নেন, তাঁকে দূরদর্শী বলা হয়।",
    },
  ],
  english: [
    {
      prompt: "Choose the correct form: If I ___ enough time, I would learn another language.",
      options: ["have", "had", "will have", "am having"],
      answerIndex: 1,
      explanation: "The second conditional uses the past simple in the if-clause.",
    },
    {
      prompt: "Choose the correct preposition: She is good ___ mathematics.",
      options: ["in", "at", "on", "for"],
      answerIndex: 1,
      explanation: "The adjective 'good' commonly takes the preposition 'at' before a skill or subject.",
    },
    {
      prompt: "Choose the closest synonym of “abundant”.",
      options: ["Scarce", "Plentiful", "Limited", "Brief"],
      answerIndex: 1,
      explanation: "“Abundant” means existing in large quantities; “plentiful” is a synonym.",
    },
  ],
  tense: [
    {
      prompt: "Choose the correct form: She ___ to work every day.",
      options: ["go", "goes", "going", "gone"],
      answerIndex: 1,
      explanation: "With a third-person singular subject in the simple present, the verb takes -s.",
    },
    {
      prompt: "By the time we arrived, the train ___.",
      options: ["leaves", "has left", "had left", "will leave"],
      answerIndex: 2,
      explanation: "The earlier of two past actions uses the past perfect tense.",
    },
    {
      prompt: "They ___ for the exam since morning.",
      options: ["study", "are studying", "have been studying", "studied"],
      answerIndex: 2,
      explanation: "An action continuing from the past until now uses the present perfect continuous.",
    },
  ],
  math: [
    {
      prompt: "একটি পণ্যের দাম ৮০০ টাকা। ১৫% ছাড়ের পর দাম কত?",
      options: ["৬৬০ টাকা", "৬৮০ টাকা", "৭০০ টাকা", "৭২০ টাকা"],
      answerIndex: 1,
      explanation: "ছাড় = ৮০০ × ১৫% = ১২০ টাকা। তাই ছাড়ের পর দাম ৮০০ − ১২০ = ৬৮০ টাকা।",
    },
    {
      prompt: "দুটি সংখ্যার অনুপাত ২:৩ এবং যোগফল ২৫। বড় সংখ্যাটি কত?",
      options: ["১০", "১২", "১৫", "১৮"],
      answerIndex: 2,
      explanation: "মোট অংশ ৫। প্রতি অংশ ২৫ ÷ ৫ = ৫, তাই বড় সংখ্যা ৩ × ৫ = ১৫।",
    },
    {
      prompt: "১০০০ টাকার উপর বার্ষিক ১০% সরল সুদে ২ বছরে সুদ কত?",
      options: ["১০০ টাকা", "১৫০ টাকা", "২০০ টাকা", "২৫০ টাকা"],
      answerIndex: 2,
      explanation: "সরল সুদ = (মূলধন × হার × সময়) ÷ ১০০ = ২০০ টাকা।",
    },
  ],
  percentage: [
    {
      prompt: "একটি পণ্যের দাম ৮০০ টাকা। ১৫% ছাড়ের পর দাম কত?",
      options: ["৬৬০ টাকা", "৬৮০ টাকা", "৭০০ টাকা", "৭২০ টাকা"],
      answerIndex: 1,
      explanation: "ছাড় = ৮০০ × ১৫% = ১২০ টাকা। তাই ছাড়ের পর দাম ৮০০ − ১২০ = ৬৮০ টাকা।",
    },
    {
      prompt: "৪০০-এর ২৫% কত?",
      options: ["৫০", "৭৫", "১০০", "১২৫"],
      answerIndex: 2,
      explanation: "৪০০ × ২৫ ÷ ১০০ = ১০০।",
    },
    {
      prompt: "একটি সংখ্যা ২০% বৃদ্ধি পেয়ে ২৪০ হলে মূল সংখ্যাটি কত?",
      options: ["১৮০", "২০০", "২২০", "২৩০"],
      answerIndex: 1,
      explanation: "মূল সংখ্যার ১২০% = ২৪০। তাই মূল সংখ্যা = ২৪০ ÷ ১.২ = ২০০।",
    },
  ],
  gk: [
    {
      prompt: "বাংলাদেশের সংবিধান কার্যকর হয় কবে?",
      options: ["২৬ মার্চ ১৯৭১", "১৬ ডিসেম্বর ১৯৭১", "৪ নভেম্বর ১৯৭২", "১৬ ডিসেম্বর ১৯৭২"],
      answerIndex: 3,
      explanation: "বাংলাদেশের সংবিধান ৪ নভেম্বর ১৯৭২ গৃহীত হয় এবং ১৬ ডিসেম্বর ১৯৭২ কার্যকর হয়।",
    },
    {
      prompt: "জাতিসংঘ প্রতিষ্ঠিত হয় কোন সালে?",
      options: ["১৯১৯", "১৯৪৫", "১৯৪৮", "১৯৫২"],
      answerIndex: 1,
      explanation: "দ্বিতীয় বিশ্বযুদ্ধের পর ২৪ অক্টোবর ১৯৪৫ জাতিসংঘ প্রতিষ্ঠিত হয়।",
    },
    {
      prompt: "বাংলাদেশের জাতীয় সংসদ ভবনের স্থপতি কে?",
      options: ["মাজহারুল ইসলাম", "লুই আই কান", "ফজলুর রহমান খান", "পল রুডলফ"],
      answerIndex: 1,
      explanation: "জাতীয় সংসদ ভবনের নকশা করেন মার্কিন স্থপতি লুই আই কান।",
    },
  ],
  bangladesh: [
    {
      prompt: "বাংলাদেশের সংবিধান কার্যকর হয় কবে?",
      options: ["২৬ মার্চ ১৯৭১", "১৬ ডিসেম্বর ১৯৭১", "৪ নভেম্বর ১৯৭২", "১৬ ডিসেম্বর ১৯৭২"],
      answerIndex: 3,
      explanation: "বাংলাদেশের সংবিধান ৪ নভেম্বর ১৯৭২ গৃহীত হয় এবং ১৬ ডিসেম্বর ১৯৭২ কার্যকর হয়।",
    },
    {
      prompt: "বাংলাদেশের জাতীয় সংসদ ভবনের স্থপতি কে?",
      options: ["মাজহারুল ইসলাম", "লুই আই কান", "ফজলুর রহমান খান", "পল রুডলফ"],
      answerIndex: 1,
      explanation: "জাতীয় সংসদ ভবনের নকশা করেন মার্কিন স্থপতি লুই আই কান।",
    },
    {
      prompt: "বাংলাদেশের জাতীয় স্মৃতিসৌধ কোথায় অবস্থিত?",
      options: ["মিরপুর", "সাভার", "টঙ্গী", "গাজীপুর"],
      answerIndex: 1,
      explanation: "জাতীয় স্মৃতিসৌধ ঢাকার অদূরে সাভারে অবস্থিত।",
    },
  ],
  science: [
    {
      prompt: "কম্পিউটারের CPU-কে সাধারণত কী বলা হয়?",
      options: ["কম্পিউটারের স্মৃতি", "কম্পিউটারের মস্তিষ্ক", "ইনপুট যন্ত্র", "আউটপুট যন্ত্র"],
      answerIndex: 1,
      explanation: "CPU নির্দেশনা প্রক্রিয়াকরণ ও নিয়ন্ত্রণ করে, তাই একে কম্পিউটারের মস্তিষ্ক বলা হয়।",
    },
    {
      prompt: "পানির রাসায়নিক সংকেত কোনটি?",
      options: ["CO₂", "O₂", "H₂O", "NaCl"],
      answerIndex: 2,
      explanation: "পানির একটি অণুতে দুটি হাইড্রোজেন ও একটি অক্সিজেন পরমাণু থাকে—H₂O।",
    },
    {
      prompt: "উদ্ভিদ সালোকসংশ্লেষণের সময় কোন গ্যাস গ্রহণ করে?",
      options: ["অক্সিজেন", "নাইট্রোজেন", "কার্বন ডাই-অক্সাইড", "হাইড্রোজেন"],
      answerIndex: 2,
      explanation: "উদ্ভিদ সালোকসংশ্লেষণের সময় কার্বন ডাই-অক্সাইড গ্রহণ করে এবং অক্সিজেন ছাড়ে।",
    },
  ],
  mixed: [
    {
      prompt: "‘রাজপুত্র’ কোন সমাসের উদাহরণ?",
      options: ["কর্মধারয়", "ষষ্ঠী তৎপুরুষ", "দ্বন্দ্ব", "বহুব্রীহি"],
      answerIndex: 1,
      explanation: "‘রাজার পুত্র’—ব্যাসবাক্যে ষষ্ঠী বিভক্তি থাকে, তাই এটি ষষ্ঠী তৎপুরুষ সমাস।",
    },
    {
      prompt: "Choose the correct form: She ___ to work every day.",
      options: ["go", "goes", "going", "gone"],
      answerIndex: 1,
      explanation: "With the third-person singular subject “she”, the simple present verb takes -s.",
    },
    {
      prompt: "বাংলাদেশের সংবিধান কার্যকর হয় কবে?",
      options: ["২৬ মার্চ ১৯৭১", "১৬ ডিসেম্বর ১৯৭১", "৪ নভেম্বর ১৯৭২", "১৬ ডিসেম্বর ১৯৭২"],
      answerIndex: 3,
      explanation: "বাংলাদেশের সংবিধান ১৬ ডিসেম্বর ১৯৭২ কার্যকর হয়।",
    },
  ],
};

export const exams: Exam[] = [
  {
    id: "full-bangla-practice",
    name: "বাংলা Full Subject Practice",
    slug: "bangla-full-subject-practice",
    description: "বাংলা · Full Subject",
    status: "PRACTICE",
    duration: 40,
    totalQuestions: 50,
    isActive: true,
    questions: questionSets.bangla,
  },
  {
    id: "bangla-shomash-live",
    name: "সমাস: দ্রুত অনুশীলন",
    slug: "shomash-drut-o-shikkhon",
    description: "বাংলা · সমাস",
    status: "LIVE",
    duration: 15,
    totalQuestions: 20,
    isActive: true,
    endsAt: "আরও ১৮ মিনিট",
    questions: questionSets.shomash,
  },
  {
    id: "daily-bcs-running",
    name: "Daily BCS Model Test #24",
    slug: "daily-bcs-model-test-24",
    description: "বিসিএস · Preliminary",
    status: "LIVE",
    duration: 60,
    totalQuestions: 100,
    isActive: true,
    endsAt: "আজ রাত ১০:০০",
    questions: questionSets.mixed,
  },
  {
    id: "full-english-practice",
    name: "English Full Subject Practice",
    slug: "english-full-subject-practice",
    description: "ইংরেজি · Full Subject",
    status: "PRACTICE",
    duration: 40,
    totalQuestions: 50,
    isActive: true,
    questions: questionSets.english,
  },
  {
    id: "english-tense-practice",
    name: "Tense & Sentence Practice",
    slug: "tense-sentence-practice",
    description: "ইংরেজি · Tense",
    status: "PRACTICE",
    duration: 20,
    totalQuestions: 25,
    isActive: true,
    questions: questionSets.tense,
  },
  {
    id: "primary-upcoming",
    name: "প্রাথমিক শিক্ষক নিয়োগ প্রস্তুতি",
    slug: "primary-teacher-preparation",
    description: "প্রাথমিক শিক্ষক · Full Mock",
    status: "UPCOMING",
    duration: 60,
    totalQuestions: 80,
    isActive: true,
    startsAt: "আজ, সন্ধ্যা ৭:৩০",
    questions: questionSets.mixed,
  },

];

export const statusLabels: Record<ExamStatus, string> = {
  LIVE: "লাইভ",
  UPCOMING: "নির্ধারিত",
  PRACTICE: "Practice",
};
