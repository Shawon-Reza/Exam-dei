"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { BlogPost } from "../blogs/types";
import type { Exam } from "../exams/exam-data";
import AdminShell from "./layout/AdminShell";
import BlogsSection from "./features/BlogsSection";
import ExamsSection from "./features/ExamsSection";
import OverviewSection from "./features/OverviewSection";
import QuestionsSection from "./features/QuestionsSection";
import SettingsSection from "./features/SettingsSection";
import StudentsSection from "./features/StudentsSection";
import ResourcesSection from "./features/ResourcesSection";
import SubjectsTopicsSection from "./features/SubjectsTopicsSection";
import { initialSettings } from "./data";
import { adminSectionPaths, getAdminSectionFromPath, type AdminSection, type AdminSettings, type AdminSubject, type QuestionRow, type Student } from "./types";

export default function AdminDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const section = getAdminSectionFromPath(pathname);
  const [notice, setNotice] = useState("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<AdminSubject[]>([]);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);

  function changeSection(nextSection: AdminSection) {
    setNotice("");
    router.push(adminSectionPaths[nextSection]);
  }

  const changeSubjects = useCallback((nextSubjects: AdminSubject[]) => {
    setSubjects(nextSubjects);
    setQuestions((currentQuestions) => currentQuestions.map((question) => {
      const subject = nextSubjects.find((item) => item.id === question.subjectId)
        ?? nextSubjects.find((item) => item.label === question.subject);
      const topic = subject?.topics.find((item) => item.id === question.topicId);
      return subject ? { ...question, subject: subject.label, topic: topic?.label } : question;
    }));
  }, []);

  function renderSection() {
    switch (section) {
      case "overview":
        return (
          <OverviewSection
            exams={exams}
            students={students}
            questionsCount={questions.length}
            postsCount={posts.length}
            onNavigate={changeSection}
          />
        );
      case "exams":
        return <ExamsSection exams={exams} onChange={setExams} onNotice={setNotice} />;
      case "subjects":
        return <SubjectsTopicsSection subjects={subjects} onChange={changeSubjects} onNotice={setNotice} />;
      case "questions":
        return <QuestionsSection subjects={subjects} questions={questions} exams={exams} onChange={setQuestions} onNotice={setNotice} />;
      case "students":
        return <StudentsSection students={students} onChange={setStudents} onNotice={setNotice} />;
      case "blogs":
        return <BlogsSection posts={posts} onChange={setPosts} onNotice={setNotice} />;
      case "resources":
        return <ResourcesSection onNotice={setNotice} />;
      case "settings":
        return <SettingsSection settings={settings} onChange={setSettings} onNotice={setNotice} />;
    }
  }

  return (
    <AdminShell
      section={section}
      questionCount={questions.length}
      notice={notice}
      onDismissNotice={() => setNotice("")}
    >
      {renderSection()}
    </AdminShell>
  );
}
