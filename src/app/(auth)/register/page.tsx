"use client";

import { useSearchParams } from "next/navigation";
import DemoAuthForm from "../../../components/auth/DemoAuthForm";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  return <DemoAuthForm mode="register" redirectUrl={redirect} />;
}
