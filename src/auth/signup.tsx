"use server";

import { cookies } from 'next/headers';
import axiosInstance from "@/lib/axios";

interface UserRequestData {
  full_name: string;
  email: string;
  mobile: string;
  password: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  uid?: string; 
}

export async function createUserRequest(data: UserRequestData): Promise<ApiResponse> {
  try {
    const cookieStore = await cookies();
    const uidCookie = cookieStore.get('uid')?.value;
    
    if (!uidCookie) {
      return {
        success: false,
        error: "UUID not found in cookies"
      };
    }
    
    const response = await axiosInstance.post("/api/method/myecom.api.signup.create_user_request", {
      id: uidCookie, 
      full_name: data.full_name,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      status: "Pending",
      requested_on: new Date().toISOString()
    });

    return {
      success: true,
      data: response.data,
      uid: uidCookie 
    };
    
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return {
      success: false,
      error: message
    };
  }
}

export async function checkPendingRequest(): Promise<{hasPendingRequest: boolean; success: boolean; error?: string}> {
  try {
    const cookieStore = await cookies();
    const uidCookie = cookieStore.get('uid')?.value;
    
    if (!uidCookie) {
      return {
        hasPendingRequest: false,
        success: false,
        error: "No UID found in cookies"
      };
    }
    
    const response = await axiosInstance.post("/api/method/myecom.api.signup.check_pending_request", {
      id: uidCookie
    });

    return {
      success: true,
      hasPendingRequest: response.data?.message?.has_pending || false
    };
    
  } catch (error: unknown) {
    return {
      hasPendingRequest: false,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}