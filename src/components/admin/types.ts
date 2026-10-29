import type { ExamQuestion, ExamStatus, ExamSubject, ExamTopic } from "../exams/exam-data";

export type AdminSection =
  | "overview"
  | "subjects"
  | "exams"
  | "questions"
  | "students"
  | "blogs"
  | "resources"
  | "settings";

export const adminSectionPaths: Record<AdminSection, string> = {
  overview: "/admin",
  subjects: "/admin/subjects",
  exams: "/admin/exams",
  questions: "/admin/questions",
  students: "/admin/students",
  blogs: "/admin/blogs",
  resources: "/admin/resources",
  settings: "/admin/settings",
};

export function getAdminSectionFromPath(pathname: string): AdminSection {
  const section = pathname.split("/")[2];

  switch (section) {
    case "subjects":
    case "exams":
    case "questions":
    case "students":
    case "blogs":
    case "resources":
    case "settings":
      return section;
    default:
      return "overview";
  }
}

export type StudentStatus = "Active" | "Suspended";

export type Student = {
  id: string;
  name: string;
  email: string;
  initials: string;
  joined: string;
  exams: number;
  status: StudentStatus;
};

export type AdminSettings = {
  siteName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  examNotifications: boolean;
};

export type ExamDraft = {
  name: string;
  slug: string;
  description: string;
  duration: number;
  totalQuestions: number;
  isActive: boolean;
  status: ExamStatus;
};

export type QuestionDraft = {
  prompt: string;
  subjectId: string;
  topicId: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type QuestionRow = ExamQuestion & {
  id: string;
  subjectId?: string;
  subject: string;
  topic?: string;
  topicId?: string;
  examTitle: string;
};

export type AdminSubject = Pick<ExamSubject, "id" | "label" | "englishLabel" | "description" | "icon" | "color"> & {
  slug?: string;
  sortOrder?: number;
  isActive?: boolean;
  iconUrl?: string | null;
  topics: ExamTopic[];
};

export type NoticeHandler = (message: string) => void;
