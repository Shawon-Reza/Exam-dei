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

export type PdfCatalogItem = PdfApiItem & {
  title: string;
  topicName: string;
  subjectName: string;
};

export type PdfCatalogFilters = {
  search: string;
  subjectId: string;
  page: number;
  limit: number;
};

export type PdfCatalogResponse = {
  pdfs: PdfCatalogItem[];
  subjects: Array<{ id: string; name: string }>;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
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

type PdfCatalogApiResponse = {
  data?: PdfCatalogResponse;
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

async function getPdfCatalog(
  filters: PdfCatalogFilters,
): Promise<PdfCatalogResponse> {
  const response = await axiosApi.get<PdfCatalogApiResponse>(
    "/api/v1/pdfs/catalog",
    { params: filters },
  );

  if (!response.data.data) {
    throw new Error("PDF catalog response did not include the catalog.");
  }

  return response.data.data;
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
  getPdfCatalog,
  createPdf,
  deletePdf,
};
