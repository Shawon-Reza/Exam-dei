import type { Metadata } from "next";
import AdminDashboard from "../../components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Console",
  description: "Chakriova platform management console for exams, content, students and resources.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
