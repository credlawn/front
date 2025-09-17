
'use client'

import { useEffect } from 'react';
import { ensureUid } from '@/auth/setSession';

export default function UIDGenerator() {
  useEffect(() => {
    ensureUid();
  }, []);
  
  return null; 
}