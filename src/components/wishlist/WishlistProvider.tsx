'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from '@/auth/session';
import { fetchWishlist, mergeWishlist } from '@/redux/features/wishlist-slice';
import { AppDispatch } from '@/redux/store'; // Assuming AppDispatch is exported from store

interface WishlistProviderProps {
  children: React.ReactNode;
}

export default function WishlistProvider({ children }: WishlistProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const { isLoggedin, user, uid } = session;
  const previousIsLoggedin = useRef(isLoggedin);

  useEffect(() => {
    // Fetch wishlist on initial load or when session changes
    if (isLoggedin && user?.email) {
      dispatch(fetchWishlist({ user: user.email }));
    } else if (uid) {
      dispatch(fetchWishlist({ guestUid: uid }));
    }
  }, [isLoggedin, user, uid, dispatch]);

  useEffect(() => {
    // Merge wishlist when a guest logs in
    if (isLoggedin && !previousIsLoggedin.current && user?.email && uid) {
      dispatch(mergeWishlist({ guestUid: uid, user: user.email }));
    }
    previousIsLoggedin.current = isLoggedin;
  }, [isLoggedin, user, uid, dispatch]);

  return <>{children}</>;
}
