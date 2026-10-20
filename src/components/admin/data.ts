import { examCategories, examSubjects, type Exam } from "../exams/exam-data";
import type { AdminSettings, QuestionRow, Student } from "./types";

export const initialStudents: Student[] = [
  { id: "ST-2048", name: "তানজিলা রহমান", email: "tanjila.rahman@gmail.com", initials: "তা", joined: "১৫ Oct, ২০২৬", exams: 24, status: "Active" },
  { id: "ST-2047", name: "আরিফুল ইসলাম", email: "ariful.islam@gmail.com", initials: "আ", joined: "১৪ Oct, ২০২৬", exams: 18, status: "Active" },
  { id: "ST-2046", name: "নাফিসা জাহান", email: "nafisa.jahan@gmail.com", initials: "না", joined: "১৪ Oct, ২০২৬", exams: 31, status: "Active" },
  { id: "ST-2045", name: "মাহমুদ হাসান", email: "mahmud.hasan@gmail.com", initials: "মা", joined: "১৩ Oct, ২০২৬", exams: 9, status: "Suspended" },
  { id: "ST-2044", name: "সাব্বির আহমেদ", email: "sabbir.ahmed@gmail.com", initials: "সা", joined: "১২ Oct, ২০২৬", exams: 16, status: "Active" },
  { id: "ST-2043", name: "মেহেদী হাসান", email: "mehedi.hasan@gmail.com", initials: "মে", joined: "১১ Oct, ২০২৬", exams: 12, status: "Active" },
  { id: "ST-2042", name: "ফারজানা আক্তার", email: "farzana.akter@gmail.com", initials: "ফা", joined: "১০ Oct, ২০২৬", exams: 27, status: "Active" },
  { id: "ST-2041", name: "ইমরান হোসেন", email: "imran.hossain@gmail.com", initials: "ই", joined: "০৯ Oct, ২০২৬", exams: 7, status: "Active" },
];

export const activity = [
  { day: "শনি", value: 48 },
  { day: "রবি", value: 72 },
  { day: "সোম", value: 57 },
  { day: "মঙ্গল", value: 88 },
  { day: "বুধ", value: 65 },
  { day: "বৃহঃ", value: 94 },
  { day: "শুক্র", value: 76 },
];

export const initialSettings: AdminSettings = {
  siteName: "Chakriova",
  supportEmail: "support@chakriova.com",
  maintenanceMode: false,
  emailNotifications: true,
  examNotifications: true,
};

export function makeQuestionRows(exams: Exam[]): QuestionRow[] {
  return exams.flatMap((exam) =>
    exam.questions.map((question, index) => ({
      ...question,
      id: `${exam.id}-${index}`,
      subject:
        examSubjects.find((item) => item.id === exam.subjectId)?.label ??
        examCategories.find((item) => item.id === exam.categoryId)?.label ??
        "সাধারণ",
      examTitle: exam.title,
    })),
  );
}
