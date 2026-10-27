"use client";

import { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { useCreateTest } from "@/src/apis/test/test.useHooks";

type CreateTestModalProps = {
    topicId: string;
    onClose: () => void;
};

export default function CreateTestModal({
    topicId,
    onClose,
}: CreateTestModalProps) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(30);
    const [totalQuestions, setTotalQuestions] = useState(25);
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const createTestMutation = useCreateTest();

    const generateSlug = (value: string) =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleNameChange = (value: string) => {
        setName(value);
        setSlug(generateSlug(value));
    };


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const testData = {
                name: name.trim(),
                slug: slug.trim(),
                description: description.trim(),
                duration: Number(duration),
                totalQuestions: Number(totalQuestions),
                isActive,
                topicId,
            };

            const result = await createTestMutation.mutateAsync(testData);

            console.log("Test created successfully:", result);

            // সফল হলে modal বন্ধ করতে চাইলে
            onClose();
        } catch (err) {
            console.error("Failed to create test:", err);
            setError("Failed to create test. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-test-title"
                className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
                    <div>
                        <h2
                            id="create-test-title"
                            className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                            Create New Test
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Fill in the test information below.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 overflow-y-auto p-5"
                >
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="test-name"
                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Test Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="test-name"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="বাংলা ব্যাকরণ মডেল টেস্ট - ১"
                            required
                            maxLength={200}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label
                            htmlFor="test-slug"
                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Slug <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="test-slug"
                            value={slug}
                            onChange={(e) => setSlug(generateSlug(e.target.value))}
                            placeholder="bangla-bakaron-model-test-1"
                            required
                            pattern="[a-z0-9]+(-[a-z0-9]+)*"
                            title="Use lowercase English letters, numbers, and hyphens."
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Automatically generated from the name. You can edit it.
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="test-description"
                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Description
                        </label>

                        <textarea
                            id="test-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe this test..."
                            rows={3}
                            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Duration and Total Marks */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="test-duration"
                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Duration (minutes) <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="test-duration"
                                type="number"
                                min={1}
                                step={1}
                                required
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="test-total-marks"
                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Total Questions <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="test-total-marks"
                                type="number"
                                min={0}
                                step="1"
                                required
                                value={totalQuestions}
                                onChange={(e) => setTotalQuestions(Number(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Active Status
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                                Whether this test is available to users.
                            </p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={isActive}
                            onClick={() => setIsActive((current) => !current)}
                            className={`relative h-6 w-11 rounded-full transition ${isActive ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${isActive ? "left-[22px]" : "left-0.5"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Topic ID */}
                    <div>
                        <label
                            htmlFor="test-topic-id"
                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Topic ID
                        </label>

                        <input
                            id="test-topic-id"
                            value={topicId}
                            readOnly
                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 size={17} className="animate-spin" />
                            ) : (
                                <Plus size={17} />
                            )}
                            {loading ? "Creating..." : "Create Test"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}