export type SubjectDraft = {
  label: string;
  englishLabel: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: string;
  file: File | null;
};

export const emptySubject: SubjectDraft = {
  label: "",
  englishLabel: "",
  slug: "",
  description: "",
  isActive: true,
  sortOrder: "",
  file: null,
};

export const initialSubjectObject = `{
  "slug": "english",
  "name": "English",
  "banglaName": "ইংরেজি",
  "description": "English grammar, vocabulary, literature, and language skills for competitive examinations.",
  "icon": "BookOpen",
  "sortOrder": 2,
  "isActive": true
}`;
