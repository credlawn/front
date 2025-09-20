'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { checkCurrentUser } from './login';

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

interface SessionContextType {
  session: SessionData;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children, session: initialSession }: { children: ReactNode; session: SessionData }) {
  const [session, setSession] = useState<SessionData>(initialSession);

  const refreshSession = useCallback(async () => {
    const newSessionData = await checkCurrentUser();
    setSession(s => ({...s, ...newSessionData, isLoggedin: newSessionData.isLoggedin, user: newSessionData.data}));
  }, []);

  return (
    <SessionContext.Provider value={{ session, refreshSession }}>
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
