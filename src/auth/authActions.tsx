"use server";

import axios from "axios";
import axiosInstance from "@/lib/axios";

interface LoginProps {
  email: string;
  password: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  sid?: string;
  error?: string;
}

export async function loginUser({ email, password }: LoginProps): Promise<ApiResponse> {
  try {
    const res = await axiosInstance.post("/api/method/login", { usr: email, pwd: password });
    const data = res.data;
    const setCookieHeader = res.headers["set-cookie"] || res.headers["Set-Cookie"];
    const sid = Array.isArray(setCookieHeader)
      ? setCookieHeader.find(cookie => cookie.includes("sid="))?.match(/sid=([^;]+)/)?.[1]
      : setCookieHeader?.match(/sid=([^;]+)/)?.[1];

    return { success: true, data, sid };
  } catch (error: unknown) {
    let message = "Unknown error";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { success: false, error: message };
  }
}
