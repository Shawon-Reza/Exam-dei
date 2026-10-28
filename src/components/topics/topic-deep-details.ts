export type TopicDeepDetailNote = {
  id: string;
  topicId: string;
  topicName: string;
  subjectId: string;
  content: {
    type: string;
    content: Array<{
      type: string;
      attrs?: Record<string, unknown>;
      content?: Array<{ type: string; text: string; marks?: Array<{ type: string; attrs?: Record<string, unknown> }> }>;
    }>;
  };
  textContent: string;
  createdAt: string;
  updatedAt: string;
};

export type TopicDeepDetailTest = {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  totalQuestions: number;
  isActive: boolean;
  topicId: string;
  createdAt: string;
  updatedAt: string;
};

export type TopicDeepDetailPdf = {
  id: string;
  name: string;
  banglaName: string;
  description: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  topicId: string;
  subjectId: string;
};

export type TopicDeepDetailsData = {
  id: string;
  slug: string;
  name: string;
  banglaName: string;
  searchName: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  icon: string;
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  tests: TopicDeepDetailTest[];
  notes: TopicDeepDetailNote[];
  pdfs: TopicDeepDetailPdf[];
};

export type TopicDeepDetailsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TopicDeepDetailsData;
};