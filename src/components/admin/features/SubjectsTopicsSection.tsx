"use client";

import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { FiBookOpen, FiEdit2, FiHash, FiPlus, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import type { SubjectApiItem } from "../../../apis/subjects/subjects.api";
import type { TopicApiItem } from "../../../apis/topics/topics.api";
import { useCreateSubject, useDeleteSubject, useSubjects, useUpdateSubject } from "../../../apis/subjects/subjects.hooks";
import { useCreateTopic, useDeleteTopic, useTopics, useUpdateTopic } from "../../../apis/topics/topics.hooks";
import type { ExamTopic } from "../../exams/exam-data";
import type { AdminSubject, NoticeHandler } from "../types";
import { toast } from "../../ui/toast";
import {
  AdminDialog,
  DialogActions,
  EmptyTable,
  Field,
  inputClass,
  Panel,
  PrimaryButton,
  SearchBox,
  SectionHeading,
  SmallStat,
  TableFooter,
} from "../ui/AdminPrimitives";
import Image from "next/image";

type SubjectDraft = {
  label: string;
  englishLabel: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: string;
  file: File | null;
};

type TopicDraft = {
  label: string;
  slug: string;
  description: string;
  searchName: string;
  sortOrder: string;
  isActive: boolean;
  file: File | null;
};

type TopicObjectDraft = {
  slug: string;
  name: string;
  banglaName: string;
  description: string;
  searchName: string;
  sortOrder: number;
  isActive: boolean;
  icon: string;
};

type SubjectObjectDraft = {
  slug: string;
  name: string;
  banglaName: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

const emptySubject: SubjectDraft = { label: "", englishLabel: "", slug: "", description: "", isActive: true, sortOrder: "", file: null };
const emptyTopic: TopicDraft = { label: "", slug: "", description: "", searchName: "", sortOrder: "", isActive: true, file: null };
const initialTopicObject = `{
  "slug": "topic-slug",
  "name": "Topic Name",
  "banglaName": "টপিক নাম",
  "description": "Topic description",
  "searchName": "topic, টপিক",
  "sortOrder": 1,
  "isActive": true,
  "icon": ""
}`;
const initialSubjectObject = `{
  "slug": "english",
  "name": "English",
  "banglaName": "ইংরেজি",
  "description": "English grammar, vocabulary, literature, and language skills for competitive examinations.",
  "icon": "BookOpen",
  "sortOrder": 2,
  "isActive": true
}`;

function makeId(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[^\w বাংলা-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
}

function mapApiSubject(subject: SubjectApiItem): AdminSubject {
  return {
    id: subject.id,
    label: subject.banglaName,
    englishLabel: subject.name,
    description: subject.description ?? "",
    slug: subject.slug,
    sortOrder: subject.sortOrder,
    isActive: subject.isActive,
    iconUrl: subject.icon,
    icon: FiBookOpen,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    topics: [],
  };
}

function mapApiTopic(topic: TopicApiItem): ExamTopic {
  return {
    id: topic.id,
    label: topic.banglaName?.trim() || topic.name,
    slug: topic.slug,
    description: topic.description ?? "",
    searchName: topic.searchName ?? "",
    sortOrder: topic.sortOrder,
    isActive: topic.isActive,
    iconUrl: topic.icon,
    subjectId: topic.subjectId,
  };
}

function getEndpointErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string; detail?: string; error?: string }>(error)) {
    const responseData = error.response?.data;
    return responseData?.message ?? responseData?.detail ?? responseData?.error ?? error.message;
  }

  return error instanceof Error ? error.message : fallback;
}

function showEndpointError(title: string, error: unknown, fallback: string) {
  toast.add({
    title,
    description: getEndpointErrorMessage(error, fallback),
    type: "error",
  });
}

export default function SubjectsTopicsSection({
  subjects,
  onChange,
  onNotice,
}: {
  subjects: AdminSubject[];
  onChange: (subjects: AdminSubject[]) => void;
  onNotice: NoticeHandler;
}) {
  const [search, setSearch] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? "");
  const [subjectDialog, setSubjectDialog] = useState(false);
  const [subjectInputMode, setSubjectInputMode] = useState<"form" | "object">("form");
  const [subjectObject, setSubjectObject] = useState(initialSubjectObject);
  const [topicDialog, setTopicDialog] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [topicInputMode, setTopicInputMode] = useState<"form" | "object">("form");
  const [topicObject, setTopicObject] = useState(initialTopicObject);
  const [subjectDraft, setSubjectDraft] = useState<SubjectDraft>(emptySubject);
  const [topicDraft, setTopicDraft] = useState<TopicDraft>(emptyTopic);
  const activeSubjectId = subjects.some((subject) => subject.id === selectedSubjectId)
    ? selectedSubjectId
    : subjects[0]?.id ?? "";
  const subjectsQuery = useSubjects();
  const createSubjectMutation = useCreateSubject();
  const deleteSubjectMutation = useDeleteSubject();
  const updateSubjectMutation = useUpdateSubject();
  const topicsQuery = useTopics(activeSubjectId, search.trim());
  const createTopicMutation = useCreateTopic();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();

  useEffect(() => {
    if (subjectsQuery.data) {
      onChange(subjectsQuery.data.map(mapApiSubject));
    }
  }, [onChange, subjectsQuery.data]);

  useEffect(() => {
    if (subjectsQuery.error) {
      showEndpointError("বিষয় লোড করা যায়নি", subjectsQuery.error, "বিষয় লোড করা যায়নি");
    }
  }, [subjectsQuery.error]);

  useEffect(() => {
    if (topicsQuery.error) {
      showEndpointError("Topic লোড করা যায়নি", topicsQuery.error, "Topic লোড করা যায়নি");
    }
  }, [topicsQuery.error]);

  useEffect(() => {
    if (!activeSubjectId || !topicsQuery.data) return;

    const nextTopics = topicsQuery.data.map(mapApiTopic);
    const currentTopics = subjects.find((subject) => subject.id === activeSubjectId)?.topics ?? [];
    if (currentTopics.length === nextTopics.length
      && currentTopics.every((topic, index) => topic.id === nextTopics[index]?.id)) {
      return;
    }

    onChange(subjects.map((subject) => subject.id === activeSubjectId
      ? { ...subject, topics: nextTopics }
      : subject));
  }, [activeSubjectId, onChange, subjects, topicsQuery.data]);

  const selectedSubject = subjects.find((subject) => subject.id === activeSubjectId);

  function openSubjectDialog(subject?: AdminSubject) {
    setEditingSubjectId(subject?.id ?? null);
    setSubjectInputMode("form");
    setSubjectObject(initialSubjectObject);
    setSubjectDraft(subject ? {
      label: subject.label,
      englishLabel: subject.englishLabel,
      slug: subject.slug ?? makeId(subject.englishLabel),
      description: subject.description,
      isActive: subject.isActive ?? true,
      sortOrder: subject.sortOrder === undefined ? "" : String(subject.sortOrder),
      file: null,
    } : emptySubject);
    setSubjectDialog(true);
  }

  async function saveSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = subjectDraft.label.trim();
    const englishLabel = subjectDraft.englishLabel.trim();
    let payload;
    if (subjectInputMode === "object" && !editingSubjectId) {
      let parsedObject: Partial<SubjectObjectDraft>;
      try {
        parsedObject = JSON.parse(subjectObject) as Partial<SubjectObjectDraft>;
      } catch {
        showEndpointError("বিষয় object সঠিক নয়", new Error("Valid JSON object দিন।"), "Valid JSON object দিন।");
        return;
      }

      if (typeof parsedObject.name !== "string" || !parsedObject.name.trim()
        || typeof parsedObject.banglaName !== "string" || !parsedObject.banglaName.trim()) {
        showEndpointError("বিষয় object সঠিক নয়", new Error("name এবং banglaName field আবশ্যক।"), "name এবং banglaName field আবশ্যক।");
        return;
      }

      payload = {
        name: parsedObject.name.trim(),
        banglaName: parsedObject.banglaName.trim(),
        slug: typeof parsedObject.slug === "string" && parsedObject.slug.trim()
          ? parsedObject.slug.trim()
          : makeId(parsedObject.name),
        description: typeof parsedObject.description === "string" ? parsedObject.description.trim() : "",
        isActive: typeof parsedObject.isActive === "boolean" ? parsedObject.isActive : true,
        sortOrder: typeof parsedObject.sortOrder === "number" ? parsedObject.sortOrder : undefined,
        file: undefined,
      };
    } else {
      if (!label || !englishLabel) return;
      payload = {
        name: englishLabel,
        banglaName: label,
        slug: subjectDraft.slug.trim() || makeId(englishLabel),
        description: subjectDraft.description.trim(),
        isActive: subjectDraft.isActive,
        sortOrder: subjectDraft.sortOrder.trim() ? Number(subjectDraft.sortOrder) : undefined,
        file: subjectDraft.file ?? undefined,
      };
    }

    if (editingSubjectId) {
      try {
        const updatedSubject = await updateSubjectMutation.mutateAsync({
          subjectId: editingSubjectId,
          ...payload,
        });
        onChange(subjects.map((subject) => subject.id === editingSubjectId
          ? {
            ...subject,
            label: updatedSubject.banglaName,
            englishLabel: updatedSubject.name,
            description: updatedSubject.description ?? "",
            slug: updatedSubject.slug,
            sortOrder: updatedSubject.sortOrder,
            isActive: updatedSubject.isActive,
            iconUrl: updatedSubject.icon,
          }
          : subject));
        onNotice("বিষয়ের তথ্য আপডেট হয়েছে");
        setSubjectDialog(false);
      } catch (error) {
        showEndpointError("বিষয় আপডেট করা যায়নি", error, "বিষয় আপডেট করা যায়নি");
      }
      return;
    }

    try {
      const createdSubject = await createSubjectMutation.mutateAsync(payload);
      setSelectedSubjectId(createdSubject.id);
      onNotice("নতুন বিষয় যোগ হয়েছে");
      setSubjectDialog(false);
    } catch (error) {
      showEndpointError("বিষয় তৈরি করা যায়নি", error, "বিষয় তৈরি করা যায়নি");
    }
  }

  async function removeSubject(subject: AdminSubject) {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `“${subject.label}” বিষয়টি মুছে ফেললে এর topic-ও মুছে যাবে।`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "বাতিল",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteSubjectMutation.mutateAsync(subject.id);
      if (selectedSubjectId === subject.id) setSelectedSubjectId("");
      onNotice("বিষয়টি মুছে ফেলা হয়েছে");
    } catch (error) {
      showEndpointError("বিষয় মুছে ফেলা যায়নি", error, "বিষয় মুছে ফেলা যায়নি");
    }
  }

  function openTopicDialog(topic?: ExamTopic) {
    setEditingTopicId(topic?.id ?? null);
    setTopicInputMode("form");
    setTopicObject(initialTopicObject);
    setTopicDraft(topic ? {
      label: topic.label,
      slug: topic.slug ?? makeId(topic.label),
      description: topic.description ?? "",
      searchName: topic.searchName ?? "",
      sortOrder: topic.sortOrder === undefined ? "" : String(topic.sortOrder),
      isActive: topic.isActive ?? true,
      file: null,
    } : emptyTopic);
    setTopicDialog(true);
  }

  async function saveTopic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = topicDraft.label.trim();
    if (!selectedSubject) return;

    let payload;
    if (topicInputMode === "object" && !editingTopicId) {
      let parsedObject: Partial<TopicObjectDraft>;
      try {
        parsedObject = JSON.parse(topicObject) as Partial<TopicObjectDraft>;
      } catch {
        showEndpointError("Topic object সঠিক নয়", new Error("Valid JSON object দিন।"), "Valid JSON object দিন।");
        return;
      }

      if (typeof parsedObject.name !== "string" || !parsedObject.name.trim()) {
        showEndpointError("Topic object সঠিক নয়", new Error("name field আবশ্যক।"), "name field আবশ্যক।");
        return;
      }

      payload = {
        slug: typeof parsedObject.slug === "string" && parsedObject.slug.trim()
          ? parsedObject.slug.trim()
          : makeId(parsedObject.name),
        name: parsedObject.name.trim(),
        banglaName: typeof parsedObject.banglaName === "string" ? parsedObject.banglaName.trim() : undefined,
        description: typeof parsedObject.description === "string" ? parsedObject.description.trim() : "",
        subjectId: selectedSubject.id,
        searchName: typeof parsedObject.searchName === "string" && parsedObject.searchName.trim()
          ? parsedObject.searchName.trim()
          : parsedObject.name.trim(),
        sortOrder: typeof parsedObject.sortOrder === "number" ? parsedObject.sortOrder : undefined,
        isActive: typeof parsedObject.isActive === "boolean" ? parsedObject.isActive : true,
        file: undefined,
      };
    } else {
      if (!label) return;
      payload = {
        slug: topicDraft.slug.trim() || makeId(label),
        name: label,
        description: topicDraft.description.trim(),
        subjectId: selectedSubject.id,
        searchName: topicDraft.searchName.trim() || label,
        sortOrder: topicDraft.sortOrder.trim() ? Number(topicDraft.sortOrder) : undefined,
        isActive: topicDraft.isActive,
        file: topicDraft.file ?? undefined,
      };
    }

    try {
      if (editingTopicId) {
        await updateTopicMutation.mutateAsync({ topicId: editingTopicId, ...payload });
        onNotice("Topic-এর তথ্য আপডেট হয়েছে");
      } else {
        await createTopicMutation.mutateAsync(payload);
        onNotice("নতুন topic যোগ হয়েছে");
      }
      setTopicDialog(false);
    } catch (error) {
      showEndpointError(
        editingTopicId ? "Topic আপডেট করা যায়নি" : "Topic তৈরি করা যায়নি",
        error,
        editingTopicId ? "Topic আপডেট করা যায়নি" : "Topic তৈরি করা যায়নি",
      );
    }
  }

  async function removeTopic(topic: ExamTopic) {
    if (!selectedSubject) return;

    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `“${topic.label}” topic-টি মুছে ফেলবেন?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "বাতিল",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteTopicMutation.mutateAsync(topic.id);
      onNotice("Topic-টি মুছে ফেলা হয়েছে");
    } catch (error) {
      showEndpointError("Topic মুছে ফেলা যায়নি", error, "Topic মুছে ফেলা যায়নি");
    }
  }

  return (
    <>
      <SectionHeading
        eyebrow="Curriculum management"
        title="বিষয় ও Topic"
        description="Userside-এর subject catalog, topic এবং learning structure এক জায়গা থেকে পরিচালনা করুন।"
        action={<PrimaryButton onClick={() => openSubjectDialog()}><FiPlus aria-hidden="true" /> বিষয় যোগ করুন</PrimaryButton>}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SmallStat label="মোট বিষয়" value={subjects.length.toLocaleString("bn-BD")} icon={<FiBookOpen />} />
        <SmallStat label="মোট Topic" value={subjects.reduce((total, subject) => total + subject.topics.length, 0).toLocaleString("bn-BD")} icon={<FiHash />} />
        <SmallStat label="সর্বশেষ ব্যবস্থাপনা" value="—" icon={<FiEdit2 />} />
      </div>

      <Panel>
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 lg:border-r dark:border-zinc-800">

            {subjectsQuery.isLoading ? <div className="p-8 text-center text-sm text-zinc-500">বিষয় লোড হচ্ছে...</div> : subjects.map((subject) => {
              const active = selectedSubject?.id === subject.id;
              return (
                <div key={subject.id} className={`flex items-center gap-3 p-4 transition ${active ? "bg-emerald-50/70 dark:bg-emerald-950/20" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/30"}`}>
                  <button type="button" onClick={() => { setSelectedSubjectId(subject.id); setSearch(""); }} className="flex min-w-0 flex-1 items-center gap-3 text-left">

                    <span className={`rounded-xl ${subject.color} h-10 w-10 shrink-0 grid place-items-center`}>
                      <Image
                        src={subject.iconUrl ?? "/default-subject-icon.svg"}
                        alt={`${subject.label} আইকন`}
                        width={24}
                        height={24}
                        className=" rounded-lg object-cover h-10 w-10 border-1"
                      />

                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-zinc-900 dark:text-white">{subject.label}</span>
                      <span className="block truncate text-xs text-zinc-500">{subject.englishLabel} · {subject.topics.length} topic</span>
                    </span>
                  </button>
                  <div className="flex shrink-0">
                    <button type="button" onClick={() => openSubjectDialog(subject)} aria-label={`${subject.label} সম্পাদনা`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><FiEdit2 aria-hidden="true" size={14} /></button>
                    <button type="button" disabled={deleteSubjectMutation.isPending} onClick={() => removeSubject(subject)} aria-label={`${subject.label} মুছুন`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-rose-950/40"><FiTrash2 aria-hidden="true" size={14} /></button>
                  </div>
                </div>
              );
            })}
            {!subjectsQuery.isLoading && subjects.length === 0 && <div className="p-8 text-center text-sm text-zinc-500">কোনো বিষয় পাওয়া যায়নি।</div>}
          </div>

          <div className="min-w-0">
            {selectedSubject ? (
              <>
                <div className="flex flex-col gap-3 border-b border-zinc-100 p-5 sm:flex-row sm:items-start sm:justify-between dark:border-zinc-800">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">{selectedSubject.englishLabel}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-white">{selectedSubject.label}</h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{selectedSubject.description || "এই বিষয়ের topic গুলো পরিচালনা করুন।"}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:min-w-64 sm:items-end">
                    <SearchBox value={search} onChange={setSearch} placeholder="এই বিষয়ের topic খুঁজুন..." />
                    <PrimaryButton onClick={() => openTopicDialog()}><FiPlus aria-hidden="true" /> Topic যোগ করুন</PrimaryButton>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60">
                      <tr><th className="px-5 py-3 font-bold">Topic</th><th className="px-4 py-3 font-bold">ID</th><th className="px-4 py-3 text-right font-bold">Action</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {topicsQuery.isLoading ? (
                        <tr><td colSpan={3} className="p-8 text-center text-sm text-zinc-500">Topic লোড হচ্ছে...</td></tr>
                      ) : selectedSubject.topics.map((topic) => (
                        <tr key={topic.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
                          <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">
                            <span className="flex items-center gap-2">
                              <Image src={topic.iconUrl ?? "/default-subject-icon.svg"} alt={`${topic.label} আইকন`} width={28} height={28} className="size-7 rounded-lg object-cover" />
                              {topic.label}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-zinc-500">{topic.id}</td>
                          <td className="px-4 py-4"><div className="flex justify-end gap-1"><button type="button" onClick={() => openTopicDialog(topic)} aria-label={`${topic.label} সম্পাদনা`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><FiEdit2 aria-hidden="true" /></button><button type="button" disabled={deleteTopicMutation.isPending} onClick={() => removeTopic(topic)} aria-label={`${topic.label} মুছুন`} className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-rose-950/40"><FiTrash2 aria-hidden="true" /></button></div></td>
                        </tr>
                      ))}
                      {!topicsQuery.isLoading && selectedSubject.topics.length === 0 && <EmptyTable colSpan={3} text={search.trim() ? "এই search-এর সাথে কোনো topic মেলেনি।" : "এই বিষয়ে এখনো কোনো topic নেই।"} />}
                    </tbody>
                  </table>
                </div>
                <TableFooter count={selectedSubject.topics.length} label="টি topic" />
              </>
            ) : <div className="p-10 text-center text-sm text-zinc-500">Topic দেখতে একটি বিষয় নির্বাচন করুন।</div>}
          </div>
        </div>
      </Panel>

      {subjectDialog && <AdminDialog title={editingSubjectId ? "বিষয় সম্পাদনা" : "নতুন বিষয় যোগ করুন"} onClose={() => setSubjectDialog(false)}>
        <form onSubmit={saveSubject} className="space-y-4">
          {!editingSubjectId && <div className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-sm dark:bg-zinc-800">
            <button type="button" onClick={() => setSubjectInputMode("form")} className={`rounded-lg px-3 py-2 font-semibold ${subjectInputMode === "form" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Form format</button>
            <button type="button" onClick={() => setSubjectInputMode("object")} className={`rounded-lg px-3 py-2 font-semibold ${subjectInputMode === "object" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Object format</button>
          </div>}
          {subjectInputMode === "object" && !editingSubjectId ? (
            <Field label="Subject object (JSON)">
              <textarea required rows={14} value={subjectObject} onChange={(event) => setSubjectObject(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} />
              <p className="mt-1 text-xs text-zinc-500">`icon` fieldটি তথ্য হিসেবে রাখা যাবে; upload icon-এর জন্য Form format ব্যবহার করুন।</p>
            </Field>
          ) : <>
            <Field label="বাংলা নাম"><input required value={subjectDraft.label} onChange={(event) => setSubjectDraft({ ...subjectDraft, label: event.target.value })} className={inputClass} placeholder="যেমন: বাংলা" /></Field>
            <Field label="English name"><input required value={subjectDraft.englishLabel} onChange={(event) => setSubjectDraft({ ...subjectDraft, englishLabel: event.target.value, slug: makeId(event.target.value) })} className={inputClass} placeholder="যেমন: Bangla" /></Field>
            <Field label="Slug"><input required value={subjectDraft.slug} onChange={(event) => setSubjectDraft({ ...subjectDraft, slug: event.target.value })} className={inputClass} placeholder="যেমন: bangla" /></Field>
            <Field label="সংক্ষিপ্ত বর্ণনা"><textarea rows={3} value={subjectDraft.description} onChange={(event) => setSubjectDraft({ ...subjectDraft, description: event.target.value })} className={`${inputClass} resize-y`} placeholder="এই বিষয়ের সম্পর্কে লিখুন..." /></Field>
            <Field label="Icon"><input type="file" accept="image/*" onChange={(event) => setSubjectDraft({ ...subjectDraft, file: event.target.files?.[0] ?? null })} className={inputClass} /></Field>
            <Field label="Sort order"><input type="number" min="0" value={subjectDraft.sortOrder} onChange={(event) => setSubjectDraft({ ...subjectDraft, sortOrder: event.target.value })} className={inputClass} /></Field>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={subjectDraft.isActive} onChange={(event) => setSubjectDraft({ ...subjectDraft, isActive: event.target.checked })} /> সক্রিয় বিষয়</label>
          </>}
          <DialogActions onCancel={() => setSubjectDialog(false)} submitLabel={createSubjectMutation.isPending || updateSubjectMutation.isPending ? "সংরক্ষণ হচ্ছে..." : editingSubjectId ? "পরিবর্তন সংরক্ষণ" : <><FiPlus aria-hidden="true" /> বিষয় যোগ করুন</>} />
        </form>
      </AdminDialog>}

      {topicDialog && <AdminDialog title={editingTopicId ? "Topic সম্পাদনা" : `${selectedSubject?.label ?? "বিষয়"}-এ Topic যোগ করুন`} onClose={() => setTopicDialog(false)}>
        <form onSubmit={saveTopic} className="space-y-4">
          {!editingTopicId && <div className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-sm dark:bg-zinc-800">
            <button type="button" onClick={() => setTopicInputMode("form")} className={`rounded-lg px-3 py-2 font-semibold ${topicInputMode === "form" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Form format</button>
            <button type="button" onClick={() => setTopicInputMode("object")} className={`rounded-lg px-3 py-2 font-semibold ${topicInputMode === "object" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Object format</button>
          </div>}
          {topicInputMode === "object" && !editingTopicId ? (
            <Field label="Topic object (JSON)">
              <textarea required rows={14} value={topicObject} onChange={(event) => setTopicObject(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} />
              <p className="mt-1 text-xs text-zinc-500">`subjectId` selected subject থেকে automatically যুক্ত হবে।</p>
            </Field>
          ) : <>
            <Field label="Topic-এর নাম"><input required value={topicDraft.label} onChange={(event) => setTopicDraft({ ...topicDraft, label: event.target.value, slug: makeId(event.target.value) })} className={inputClass} placeholder="যেমন: সমাস" /></Field>
            <Field label="Slug"><input required value={topicDraft.slug} onChange={(event) => setTopicDraft({ ...topicDraft, slug: event.target.value })} className={inputClass} placeholder="যেমন: shomash" /></Field>
            <Field label="Description"><textarea rows={3} value={topicDraft.description} onChange={(event) => setTopicDraft({ ...topicDraft, description: event.target.value })} className={`${inputClass} resize-y`} /></Field>
            <Field label="Search name"><input value={topicDraft.searchName} onChange={(event) => setTopicDraft({ ...topicDraft, searchName: event.target.value })} className={inputClass} placeholder="যেমন: shomash, সমাস" /></Field>
            <Field label="Icon"><input type="file" accept="image/*" onChange={(event) => setTopicDraft({ ...topicDraft, file: event.target.files?.[0] ?? null })} className={inputClass} /></Field>
            <Field label="Sort order"><input type="number" min="0" value={topicDraft.sortOrder} onChange={(event) => setTopicDraft({ ...topicDraft, sortOrder: event.target.value })} className={inputClass} /></Field>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={topicDraft.isActive} onChange={(event) => setTopicDraft({ ...topicDraft, isActive: event.target.checked })} /> সক্রিয় Topic</label>
          </>}
          <DialogActions onCancel={() => setTopicDialog(false)} submitLabel={createTopicMutation.isPending || updateTopicMutation.isPending ? "সংরক্ষণ হচ্ছে..." : editingTopicId ? "পরিবর্তন সংরক্ষণ" : <><FiPlus aria-hidden="true" /> Topic যোগ করুন</>} />
        </form>
      </AdminDialog>}
    </>
  );
}
