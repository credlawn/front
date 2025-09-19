'use client';

import { createContext, useContext, ReactNode } from 'react';

interface SessionData {
  isLoggedin: boolean;
  user?: {
    email: string;
    full_name: string;
    mobile: string;
  };
  sid?: string;
  uid?: string;
}

const SessionContext = createContext<SessionData | undefined>(undefined);

export function SessionProvider({ children, session }: { children: ReactNode; session: SessionData }) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
