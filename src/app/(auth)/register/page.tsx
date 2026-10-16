import type { Metadata } from "next";
import DemoAuthForm from "../../../components/auth/DemoAuthForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Chakriova-তে account তৈরি করে আপনার exam preparation শুরু করুন।",
};

export default function RegisterPage() {
  return <DemoAuthForm mode="register" />;
}
