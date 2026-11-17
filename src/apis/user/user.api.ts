import axiosApi from "@/src/lib/axios_instance";

export type PointTransaction = {
  id: string;
  points: number;
  type: string;
  reason: string;
  description: string;
  createdAt: string;
};

export type TestSummary = {
  completedTests: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  averageAccuracy: number;
};

export type RecentResult = {
  id: string;
  testId: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  createdAt: string;
  test: {
    id: string;
    name: string;
    slug: string;
  };
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  userStatus: string;
  needPasswordChange: boolean;
  createdAt: string;
  updatedAt: string;
  points: number;
  pointSummary: {
    transactionCount: number;
    total: number;
    recentTransactions: PointTransaction[];
  };
  testSummary: TestSummary;
  recentResults: RecentResult[];
};

export type UserProfileResponse = {
  status: number;
  success: boolean;
  message: string;
  data: UserProfile;
};

const getUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await axiosApi.get<UserProfileResponse>("/api/v1/user");
  return response.data;
};

export const userApi = {
  getUserProfile,
};
