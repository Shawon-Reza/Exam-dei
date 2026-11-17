import type { Metadata } from "next";
import ProfilePageContent from "./components/ProfilePageContent";

export const metadata: Metadata = {
  title: "Profile",
  description: "আপনার Chakriova profile, test performance ও point activity দেখুন।",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
