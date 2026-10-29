

"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import CreateTestModal from "./CreateTestModal";
import { useTests } from "@/src/apis/test/test.useHooks";
import TestsCard from "./testsCard";

type TopicTestsModalProps = {
  topicId: string;
  subjectId: string;
  onClose: () => void;
};

export default function TopicTestsModal({
  topicId,
  subjectId,
  onClose,
}: TopicTestsModalProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false);


  const testList = useTests(topicId)

  console.log("From TopicTestModal", testList?.data?.data)
  console.log("From TopicTestModal", testList?.data)




  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl dark:bg-gray-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Topic Tests
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Topic ID: {topicId}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-2">
          {testList?.data?.data?.length > 0 ? (
            testList.data.data.map((test: any) => (
              <TestsCard key={test.id ?? test._id} data={test} subjectId={subjectId} topicId={topicId} />
            ))
          ) : (
            <p className="col-span-full py-8 text-center text-sm text-gray-500">
              No tests found.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add new test
          </button>
        </div>

        {createModalOpen && (
          <CreateTestModal
            topicId={topicId}
            subjectId={subjectId}
            onClose={() => setCreateModalOpen(false)}
          // onSubmit={handleCreateTest}
          />
        )}
      </div>
    </div>
  );
}