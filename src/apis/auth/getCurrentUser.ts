// src/lib/auth/get-current-user.ts

import "server-only";
import { cookies } from "next/headers";
import { BASE_URL } from "@/src/config/config";
import type { CurrentUser } from "./auth.types";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  let response: Response;

  try {
    response = await fetch(
      `${process.env.API_URL ?? BASE_URL}/api/v1/auth/me`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );
  } catch (error) {
    console.error("Unable to load the current user because the API request failed:", error);
    return null;
  }

  if (!response.ok) return null;

  const result: { data: CurrentUser | null } = await response.json();
  return result.data;
}