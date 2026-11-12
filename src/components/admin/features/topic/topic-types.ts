export type TopicDraft = {
  label: string;
  slug: string;
  description: string;
  searchName: string;
  sortOrder: string;
  isActive: boolean;
  file: File | null;
};

export const emptyTopic: TopicDraft = {
  label: "",
  slug: "",
  description: "",
  searchName: "",
  sortOrder: "",
  isActive: true,
  file: null,
};

export const initialTopicObject = `{
  "slug": "topic-slug",
  "name": "Topic Name",
  "banglaName": "টপিক নাম",
  "description": "Topic description",
  "searchName": "topic, টপিক",
  "sortOrder": 1,
  "isActive": true,
  "icon": ""
}`;
