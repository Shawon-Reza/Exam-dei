import axiosApi from "@/src/lib/axios_instance";
import type { CurrentUser } from "./auth.types";


const login = async (payload: { email: string; password: string }
) => {
    const res = await axiosApi.post("/api/v1/auth/login", payload);
    return res.data;
};

const register = async (payload: { name: string, email: string; password: string }
) => {
    const res = await axiosApi.post("/api/v1/auth/register", payload);
    return res.data;
};

const verifyOtp = async (payload: { email: string; otp: string }) => {
    const res = await axiosApi.post("/api/v1/auth/otp-verification", payload);
    return res.data;
};

const resendVerificationOtp = async (payload: {
    email: string;
    type: "email-verification";
}) => {
    const res = await axiosApi.post("/api/v1/auth/send-verification-otp", payload);
    return res.data;
};

const requestPasswordReset = async (payload: { email: string }) => {
    const res = await axiosApi.post("/api/v1/auth/request-password-reset", payload);
    return res.data;
};

const resetPassword = async (payload: {
    email: string;
    otp: string;
    password: string;
}) => {
    const res = await axiosApi.post("/api/v1/auth/reset-password", payload);
    return res.data;
};


const me = async (): Promise<CurrentUser | null> => {
    const res = await axiosApi.get("/api/v1/auth/me");
    console.log("login")
    console.log(res, res.data, res.data.data)
    return res.data;
}

const logout = async () => {
    const res = await axiosApi.post("/api/v1/auth/logout")
    return res.data
}


export const authApi = {
    login,
    register,
    verifyOtp,
    resendVerificationOtp,
    requestPasswordReset,
    resetPassword,
    me,
    logout,
};