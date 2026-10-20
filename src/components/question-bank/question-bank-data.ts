export type QuestionBankItem = {
  id: string;
  organization: string;
  organizationLabel: string;
  position: string;
  positionLabel: string;
  title: string;
  year: string;
  questionCount: number;
  subjects: string[];
  color: string;
};

export const questionBankItems: QuestionBankItem[] = [
  {
    id: "bcs-46-preliminary",
    organization: "bcs",
    organizationLabel: "বিসিএস",
    position: "general",
    positionLabel: "BCS General",
    title: "৪৬তম BCS Preliminary",
    year: "২০২৪",
    questionCount: 200,
    subjects: ["বাংলা", "ইংরেজি", "গণিত", "সাধারণ জ্ঞান"],
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  {
    id: "ntrca-school-18",
    organization: "ntrca",
    organizationLabel: "NTRCA",
    position: "school",
    positionLabel: "School Level",
    title: "১৮তম NTRCA School",
    year: "২০২৪",
    questionCount: 100,
    subjects: ["বাংলা", "ইংরেজি", "সাধারণ জ্ঞান"],
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  {
    id: "ntrca-college-18",
    organization: "ntrca",
    organizationLabel: "NTRCA",
    position: "college",
    positionLabel: "College Level",
    title: "১৮তম NTRCA College",
    year: "২০২৪",
    questionCount: 100,
    subjects: ["বাংলা", "ইংরেজি", "ICT"],
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  },
  {
    id: "ntrca-madrasa-18",
    organization: "ntrca",
    organizationLabel: "NTRCA",
    position: "madrasa",
    positionLabel: "Madrasa Level",
    title: "১৮তম NTRCA Madrasa",
    year: "২০২৪",
    questionCount: 100,
    subjects: ["বাংলা", "ইংরেজি", "সাধারণ জ্ঞান"],
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    id: "bank-officer-it",
    organization: "bank",
    organizationLabel: "ব্যাংক জব",
    position: "officer-it",
    positionLabel: "Officer IT",
    title: "সমন্বিত ব্যাংক Officer IT",
    year: "২০২৩",
    questionCount: 100,
    subjects: ["ICT", "ইংরেজি", "গণিত"],
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  },
  {
    id: "bank-so",
    organization: "bank",
    organizationLabel: "ব্যাংক জব",
    position: "so",
    positionLabel: "Senior Officer",
    title: "সমন্বিত ব্যাংক Senior Officer",
    year: "২০২৩",
    questionCount: 100,
    subjects: ["বাংলা", "ইংরেজি", "গণিত", "সাধারণ জ্ঞান"],
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  {
    id: "bank-cash",
    organization: "bank",
    organizationLabel: "ব্যাংক জব",
    position: "cash",
    positionLabel: "Officer Cash",
    title: "ব্যাংক Officer Cash",
    year: "২০২২",
    questionCount: 100,
    subjects: ["বাংলা", "ইংরেজি", "গণিত"],
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  },
  {
    id: "bank-ar",
    organization: "bank",
    organizationLabel: "ব্যাংক জব",
    position: "ar",
    positionLabel: "Assistant Relationship",
    title: "ব্যাংক Assistant Relationship",
    year: "২০২২",
    questionCount: 80,
    subjects: ["ইংরেজি", "গণিত", "সাধারণ জ্ঞান"],
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
];

export const questionBankOrganizations = [
  { id: "all", label: "সবগুলো", englishLabel: "All" },
  { id: "bcs", label: "বিসিএস", englishLabel: "BCS" },
  { id: "ntrca", label: "NTRCA", englishLabel: "Teacher Registration" },
  { id: "bank", label: "ব্যাংক জব", englishLabel: "Bank Jobs" },
];
