"use client";

import { useSession } from "@/auth/SessionProvider";
import UserIcon from "./userIcon";

export default function UserIconContainer() {
  const { session } = useSession();
  return <UserIcon isLoggedIn={session.isLoggedin} />;
}