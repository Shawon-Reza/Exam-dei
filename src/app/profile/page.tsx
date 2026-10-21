import type { Metadata } from "next";
import ProfileActivity from "@/src/components/profile/ProfileActivity";
import ProfileDetails from "@/src/components/profile/ProfileDetails";
import ProfileHeader from "@/src/components/profile/ProfileHeader";

export const metadata: Metadata = {
  title: "Profile",
  description: "Chakriova user profile, education, experience and learning activity.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex-1 bg-zinc-50 py-6 dark:bg-zinc-950 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ProfileHeader />
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ProfileDetails />
          <ProfileActivity />
        </div>
      </div>
    </main>
  );
}
