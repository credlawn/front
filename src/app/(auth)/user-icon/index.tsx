"use client";

import { useSession } from "@/auth/SessionProvider";
import UserIcon from "./userIcon";

interface UserIconContainerProps {
  onIconClick?: () => void;
}

export default function UserIconContainer({ onIconClick }: UserIconContainerProps) {
  const { session } = useSession();
  return <UserIcon isLoggedIn={session.isLoggedin} onIconClick={onIconClick} />;
}