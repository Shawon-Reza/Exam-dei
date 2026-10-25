import axiosApi from "@/src/lib/axios_instance";

export type TopicApiItem = {
  id: string;
  slug: string;
  name: string;
  banglaName?: string | null;
  searchName?: string | null;
  description?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  icon?: string | null;
  subjectId: string;
  createdAt?: string;
  updatedAt?: string;
};

type TopicsResponse = {
  data?: {
    data?: TopicApiItem[];
    totalCount?: number;
  };
};

type TopicResponse = {
  data?: TopicApiItem;
};

export type CreateTopicPayload = {
  slug: string;
  name: string;
  banglaName?: string;
  description: string;
  subjectId: string;
  searchName?: string;
  sortOrder?: number;
  isActive: boolean;
  file?: File;
};

export type UpdateTopicPayload = CreateTopicPayload & {
  topicId: string;
};

function toFormData(payload: CreateTopicPayload) {
  const formData = new FormData();
  formData.append("slug", payload.slug);
  formData.append("name", payload.name);
  if (payload.banglaName) formData.append("banglaName", payload.banglaName);
  formData.append("description", payload.description);
  formData.append("subjectId", payload.subjectId);
  if (payload.searchName) formData.append("searchName", payload.searchName);
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder));
  formData.append("isActive", String(payload.isActive));
  if (payload.file) formData.append("icon", payload.file);
  return formData;
}

async function getTopics(subjectId: string, search?: string): Promise<TopicApiItem[]> {
  const response = await axiosApi.get<TopicsResponse>("/api/v1/topics/", {
    params: {
      subjectId,
      ...(search ? { search } : {}),
    },
  });
  return response.data.data?.data ?? [];
}

async function createTopic(payload: CreateTopicPayload): Promise<TopicApiItem> {
  const response = await axiosApi.post<TopicResponse>("/api/v1/topics/", toFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!response.data.data) {
    throw new Error("Topic creation response did not include the created topic.");
  }

  return response.data.data;
}

async function updateTopic({ topicId, ...payload }: UpdateTopicPayload): Promise<TopicApiItem> {
  const response = await axiosApi.put<TopicResponse>(`/api/v1/topics/${topicId}`, toFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!response.data.data) {
    throw new Error("Topic update response did not include the updated topic.");
  }

  return response.data.data;
}

async function deleteTopic(topicId: string): Promise<void> {
  await axiosApi.delete(`/api/v1/topics/${topicId}`);
}

export const topicsApi = {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
};
