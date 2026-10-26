import axiosApi from "@/src/lib/axios_instance";

export type PdfApiItem = {
  id: string;
  name: string;
  banglaName?: string | null;
  description?: string | null;
  url: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  topicId: string;
  subjectId: string;
};

type PdfsResponse = {
  data?: {
    result?: PdfApiItem[];
    count?: number;
  };
};

type PdfResponse = {
  data?: PdfApiItem;
};

export type CreatePdfPayload = {
  name: string;
  banglaName: string;
  description: string;
  url: string;
  topicId: string;
  subjectId: string;
};

async function getPdfs(topicId: string): Promise<PdfApiItem[]> {
  const response = await axiosApi.get<PdfsResponse>("/api/v1/pdfs/", {
    params: { topicId },
  });
  return response.data.data?.result ?? [];
}

async function createPdf(payload: CreatePdfPayload): Promise<PdfApiItem> {
  const response = await axiosApi.post<PdfResponse>("/api/v1/pdfs/", payload);

  if (!response.data.data) {
    throw new Error("PDF creation response did not include the created PDF.");
  }

  return response.data.data;
}

async function deletePdf(pdfId: string): Promise<void> {
  await axiosApi.delete(`/api/v1/pdfs/${pdfId}`);
}

export const pdfsApi = {
  getPdfs,
  createPdf,
  deletePdf,
};
