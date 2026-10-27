import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesApi, type NotePayload } from "./notes.api";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notesApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notesApi.updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useGetNoteByTopicId = (topicId: string) => {
  return useQuery({
    queryKey: ["notes", topicId],
    queryFn: () => notesApi.getNoteByTopicId(topicId),
    enabled: !!topicId,
  });
};