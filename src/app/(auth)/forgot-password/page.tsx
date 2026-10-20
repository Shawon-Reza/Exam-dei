import type { Metadata } from "next";
import ResetPasswordForm from "../../../components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Email OTP দিয়ে আপনার Chakriova account-এর পাসওয়ার্ড রিসেট করুন।",
};

export default function ForgotPasswordPage() {
  return <ResetPasswordForm />;
}
