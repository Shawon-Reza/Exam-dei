"use client";

import { FiPlus } from "react-icons/fi";
import type { NoticeHandler } from "../types";
import { Panel, PrimaryButton, SectionHeading } from "../ui/AdminPrimitives";

export default function ResourcesSection({ onNotice }: { onNotice: NoticeHandler }) {
  return (
    <>
      <SectionHeading
        eyebrow="Content workspace"
        title="Resources ও leaderboard"
        description="Userside-এর notes, books এবং ranking experience-এর content এক জায়গা থেকে পরিকল্পনা করুন।"
        action={
          <PrimaryButton onClick={() => onNotice("Resource creation flow শীঘ্রই যুক্ত হবে")}>
            <FiPlus aria-hidden="true" /> নতুন resource
          </PrimaryButton>
        }
      />
      <Panel className="p-10 text-center">
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">এখনো কোনো resource বা leaderboard data নেই।</p>
        <p className="mt-2 text-xs text-zinc-500">Data যোগ হলে এখানে দেখা যাবে।</p>
      </Panel>
    </>
  );
}
