"use server";

import { cookies } from "next/headers";

export async function setSession(sid: string) {
  const cookieStore = await cookies();
  cookieStore.set("sid", sid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set("sid", "", {
    path: "/",
    maxAge: 0,
  });
}
