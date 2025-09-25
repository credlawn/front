'use client';

import { useEffect, useRef } from 'react';
import { useSession } from '@/auth/session';
import { recordVisitorAction, updateSessionAction } from '@/get-api-data/visitor';
import { useSelector } from 'react-redux';
import { selectSettings } from '@/redux/features/settings-slice';

export default function VisitorsRecord() {
  const session = useSession();
  const { visitorTracking } = useSelector(selectSettings);
  const visitStartTime = useRef(Date.now());
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (visitorTracking) {
      const getSlug = () => window.location.pathname;

      const sendVisitorIdToFrappe = async (slug: string) => {
        const { isLoggedin, user, uid } = session;
        await recordVisitorAction(slug, isLoggedin ? user?.email : undefined, uid);
      };

      const sendSessionTimeUpdate = async (slug: string) => {
        const { isLoggedin, user, uid } = session;
        const timeSpent = Math.floor((Date.now() - visitStartTime.current) / 1000);
        await updateSessionAction(slug, isLoggedin ? user?.email : undefined, uid, timeSpent);
      };

      const initVisitorTracking = async () => {
        const slug = getSlug();
        await sendVisitorIdToFrappe(slug);
      };

      const handleVisibilityChange = async () => {
        const slug = getSlug();
        if (document.visibilityState === 'visible' && !isInitialLoad.current) {
          visitStartTime.current = Date.now();
          await sendVisitorIdToFrappe(slug);
        } else if (document.visibilityState === 'hidden') {
          await sendSessionTimeUpdate(slug);
        }
        isInitialLoad.current = false;
      };

      const handleBeforeUnload = async () => {
        const slug = getSlug();
        await sendSessionTimeUpdate(slug);
      };

      initVisitorTracking();
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [session, visitorTracking]);

  return null;
}
