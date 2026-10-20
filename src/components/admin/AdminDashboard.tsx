"use client";

import { useState } from "react";
import { samplePosts } from "../blogs/blog-data";
import type { BlogPost } from "../blogs/types";
import { exams as sampleExams } from "../exams/exam-data";
import AdminShell from "./layout/AdminShell";
import BlogsSection from "./features/BlogsSection";
import ExamsSection from "./features/ExamsSection";
import OverviewSection from "./features/OverviewSection";
import QuestionsSection from "./features/QuestionsSection";
import SettingsSection from "./features/SettingsSection";
import StudentsSection from "./features/StudentsSection";
import { makeQuestionRows, initialSettings, initialStudents } from "./data";
import type { AdminSection, AdminSettings, QuestionRow, Student } from "./types";

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("overview");
  const [notice, setNotice] = useState("");
  const [exams, setExams] = useState(sampleExams);
  const [questions, setQuestions] = useState<QuestionRow[]>(() => makeQuestionRows(sampleExams));
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);

  function changeSection(nextSection: AdminSection) {
    setSection(nextSection);
    setNotice("");
  }

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
      case "questions":
        return <QuestionsSection questions={questions} exams={exams} onChange={setQuestions} onNotice={setNotice} />;
      case "students":
        return <StudentsSection students={students} onChange={setStudents} onNotice={setNotice} />;
      case "blogs":
        return <BlogsSection posts={posts} onChange={setPosts} onNotice={setNotice} />;
      case "settings":
        return <SettingsSection settings={settings} onChange={setSettings} onNotice={setNotice} />;
    }
  }

  return (
    <AdminShell
      section={section}
      onSectionChange={changeSection}
      questionCount={questions.length}
      notice={notice}
      onDismissNotice={() => setNotice("")}
    >
      {renderSection()}
    </AdminShell>
  );
}
