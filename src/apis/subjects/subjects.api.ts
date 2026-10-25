import axiosApi from "@/src/lib/axios_instance";

export type SubjectApiItem = {
  id: string;
  slug: string;
  name: string;
  banglaName: string;
  description: string;
  icon?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type SubjectsResponse = {
  data?: {
    count?: number;
    data?: SubjectApiItem[];
  };
};

type SubjectResponse = {
  data?: SubjectApiItem;
};

export type CreateSubjectPayload = {
  name: string;
  banglaName: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder?: number;
  file?: File;
};

export type UpdateSubjectPayload = CreateSubjectPayload & {
  subjectId: string;
  sortOrder?: number;
};

async function getSubjects(): Promise<SubjectApiItem[]> {
  const response = await axiosApi.get<SubjectsResponse>("/api/v1/subjects/");
  return response.data.data?.data ?? [];
}

async function createSubject(payload: CreateSubjectPayload): Promise<SubjectApiItem> {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("banglaName", payload.banglaName);
  formData.append("slug", payload.slug);
  formData.append("description", payload.description);
  formData.append("isActive", String(payload.isActive));
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder));
  if (payload.file) formData.append("file", payload.file);

  const response = await axiosApi.post<SubjectResponse>("/api/v1/subjects/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!response.data.data) {
    throw new Error("Subject creation response did not include the created subject.");
  }

  return response.data.data;
}

async function updateSubject({ subjectId, ...payload }: UpdateSubjectPayload): Promise<SubjectApiItem> {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("banglaName", payload.banglaName);
  formData.append("slug", payload.slug);
  formData.append("description", payload.description);
  formData.append("isActive", String(payload.isActive));
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder));
  if (payload.file) formData.append("file", payload.file);

  const response = await axiosApi.put<SubjectResponse>(`/api/v1/subjects/${subjectId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!response.data.data) {
    throw new Error("Subject update response did not include the updated subject.");
  }

  return response.data.data;
}

async function deleteSubject(subjectId: string): Promise<void> {
  await axiosApi.delete(`/api/v1/subjects/${subjectId}`);
}

export const subjectsApi = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
