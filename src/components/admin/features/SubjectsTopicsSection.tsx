"use client";

import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { FiBookOpen, FiEdit2, FiHash, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import type { SubjectApiItem } from "../../../apis/subjects/subjects.api";
import type { TopicApiItem } from "../../../apis/topics/topics.api";
import { useCreateSubject, useDeleteSubject, useSubjects, useUpdateSubject } from "../../../apis/subjects/subjects.hooks";
import { useCreateTopic, useDeleteTopic, useTopics, useUpdateTopic } from "../../../apis/topics/topics.hooks";
import type { ExamTopic } from "../../exams/exam-data";
import type { AdminSubject, NoticeHandler } from "../types";
import { toast } from "../../ui/toast";
import {
  emptySubject,
  emptyTopic,
  initialSubjectObject,
  initialQuestionsObject,
  QuestionsDialog,
  initialTopicObject,
  SubjectDialog,
  TopicDialog,
  type SubjectDraft,
  type TopicDraft,
} from "./SubjectsTopicsDialogs";
import { SubjectsTopicsPanel } from "./SubjectsTopicsPanels";
import { TopicPdfsModal } from "./TopicPdfsModal";
import { PrimaryButton, SectionHeading, SmallStat } from "../ui/AdminPrimitives";
import { useAddQuestionToTopic } from "@/src/apis/questions/question.useHooks";

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
    pdfCount: topic._count?.pdfs ?? 0,
    _count: {
      pdfs: topic._count?.pdfs ?? 0,
      questions: topic._count?.questions ?? 0,
      tests: topic._count?.tests ?? 0,
    },
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
  const [questionsDialog, setQuestionsDialog] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ExamTopic | null>(null);
  const [questionsObject, setQuestionsObject] = useState(initialQuestionsObject);
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
  const addQuestionToTopicMutation = useAddQuestionToTopic();

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

  function openQuestionsDialog(topic: ExamTopic) {
    setSelectedTopic(topic);
    setQuestionsObject(initialQuestionsObject);
    setQuestionsDialog(true);
  }

  function openPdfModal(topic: ExamTopic) {
    setSelectedTopic(topic);
    setPdfModal(true);
  }

  async function submitQuestions(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSubject || !selectedTopic) return;

    try {
      const questions = JSON.parse(questionsObject);
      if (!Array.isArray(questions)) throw new Error("Questions must be an array.");
      console.log({
        subjectId: selectedSubject.id,
        topicId: selectedTopic.id,
        questions,
      });
      onNotice("Questions console-এ পাঠানো হয়েছে");

      const response = await addQuestionToTopicMutation.mutateAsync({
        subjectId: selectedSubject.id,
        topicId: selectedTopic.id,
        questions,
      });


      toast.add(
        {
          title: `${response?.message}`,
          description: `${response?.data?.count} টি question যোগ হয়েছে`
        }
      );

      console.log("===================", response)
      setQuestionsDialog(false);



    } catch (error) {
      showEndpointError("Questions JSON সঠিক নয়", error, "একটি valid JSON array দিন।");
    }
  }

  function submitPdf(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSubject || !selectedTopic) return;

    onNotice("PDF console-এ পাঠানো হয়েছে");
    setPdfModal(false);
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
      <SectionHeading eyebrow="Curriculum management" title="বিষয় ও Topic" description="Userside-এর subject catalog, topic এবং learning structure এক জায়গা থেকে পরিচালনা করুন।" action={<PrimaryButton onClick={() => openSubjectDialog()}><FiPlus aria-hidden="true" /> বিষয় যোগ করুন</PrimaryButton>} />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SmallStat label="মোট বিষয়" value={subjects.length.toLocaleString("bn-BD")} icon={<FiBookOpen />} />

        <SmallStat label="মোট Topic" value={subjects.reduce((total, subject) => total + subject.topics.length, 0).toLocaleString("bn-BD")} icon={<FiHash />} />
        <SmallStat label="সর্বশেষ ব্যবস্থাপনা" value="—" icon={<FiEdit2 />} />
      </div>
      <SubjectsTopicsPanel subjects={subjects} isLoading={subjectsQuery.isLoading} selectedSubjectId={activeSubjectId} selectedSubject={selectedSubject} search={search} onSelect={(subject) => { setSelectedSubjectId(subject.id); setSearch(""); }} onSearch={setSearch} onEditSubject={openSubjectDialog} onDeleteSubject={removeSubject} onAddTopic={() => openTopicDialog()} onEditTopic={openTopicDialog} onDeleteTopic={removeTopic} onAddQuestions={openQuestionsDialog} onAddPdf={openPdfModal} />

      {subjectDialog && <SubjectDialog editingId={editingSubjectId} draft={subjectDraft} inputMode={subjectInputMode} objectValue={subjectObject} saving={createSubjectMutation.isPending || updateSubjectMutation.isPending} onDraftChange={setSubjectDraft} onInputModeChange={setSubjectInputMode} onObjectChange={setSubjectObject} onSubmit={saveSubject} onClose={() => setSubjectDialog(false)} />}
      {topicDialog && <TopicDialog subjectLabel={selectedSubject?.label} editingId={editingTopicId} draft={topicDraft} inputMode={topicInputMode} objectValue={topicObject} saving={createTopicMutation.isPending || updateTopicMutation.isPending} onDraftChange={setTopicDraft} onInputModeChange={setTopicInputMode} onObjectChange={setTopicObject} onSubmit={saveTopic} onClose={() => setTopicDialog(false)} />}
      {questionsDialog && selectedSubject && selectedTopic && <QuestionsDialog subjectId={selectedSubject.id} topicId={selectedTopic.id} topicLabel={selectedTopic.label} value={questionsObject} onChange={setQuestionsObject} onSubmit={submitQuestions} onClose={() => setQuestionsDialog(false)} />}
      {pdfModal && selectedSubject && selectedTopic && (
        <TopicPdfsModal
          topicId={selectedTopic.id}
          subjectId={selectedSubject.id}
          topicLabel={selectedTopic.label}
          onClose={() => setPdfModal(false)}
        />
      )}
    </>
  );
}
