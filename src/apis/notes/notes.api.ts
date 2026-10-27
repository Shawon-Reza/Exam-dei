import axiosApi from "@/src/lib/axios_instance";

export type NoteContent = {
  type: string;
  content?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
    content?: Array<{ type: string; text: string }>;
  }>;
};

export type NotePayload = {
  topicId: string;
  topicName: string;
  subjectId: string;
  content: NoteContent;
  textContent: string;
};

export type NoteResponse = {
  id: string;
  topicId: string;
  topicName: string;
  subjectId: string;
  content: NoteContent;
  textContent: string;
  createdAt: string;
  updatedAt: string;
};

async function createNote(payload: NotePayload): Promise<NoteResponse> {
  const res = await axiosApi.post("/api/v1/notes", payload);
  return res.data;
}

async function updateNote(payload: NotePayload): Promise<NoteResponse> {
  const res = await axiosApi.patch("/api/v1/notes", payload);
  return res.data;
}

async function getNoteByTopicId(topicId: string): Promise<NoteResponse | null> {
  const res = await axiosApi.get(`/api/v1/notes?topicID=${topicId}`);
  return res.data?.data ?? null;
}

export const notesApi = {
  createNote,
  updateNote,
  getNoteByTopicId,
};