import AdminDashboard from "../../../components/admin/AdminDashboard";
import { adminSectionPaths } from "../../../components/admin/types";

export function generateStaticParams() {
  return Object.keys(adminSectionPaths)
    .filter((section) => section !== "overview")
    .map((section) => ({ section }));
}

export default function AdminSectionPage() {
  return <AdminDashboard />;
}
