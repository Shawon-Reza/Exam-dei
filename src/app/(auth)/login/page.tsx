"use client";

import { useSearchParams } from "next/navigation";
import DemoAuthForm from "../../../components/auth/DemoAuthForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("callbackUrl") ?? "/";



  return <DemoAuthForm mode="login" redirectUrl={redirect} />;
}
