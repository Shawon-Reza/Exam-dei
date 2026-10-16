import type { Metadata } from "next";
import DemoAuthForm from "../../../components/auth/DemoAuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Chakriova-তে login করে আপনার exam preparation চালিয়ে যান।",
};

export default function LoginPage() {
  return <DemoAuthForm mode="login" />;
}
