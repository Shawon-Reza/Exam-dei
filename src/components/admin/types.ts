import type { ExamQuestion, ExamStatus } from "../exams/exam-data";

export type AdminSection =
  | "overview"
  | "exams"
  | "questions"
  | "students"
  | "blogs"
  | "resources"
  | "settings";

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
  title: string;
  subtitle: string;
  subjectId: string;
  status: ExamStatus;
  questionCount: string;
  durationMinutes: string;
};

export type QuestionDraft = {
  prompt: string;
  subjectId: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type QuestionRow = ExamQuestion & {
  id: string;
  subject: string;
  examTitle: string;
};

export type NoticeHandler = (message: string) => void;
