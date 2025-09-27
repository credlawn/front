'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from '@/auth/session';
import { fetchWishlist } from '@/redux/features/wishlist-slice';
import { AppDispatch } from '@/redux/store';

interface WishlistProviderProps {
  children: React.ReactNode;
}

export default function WishlistProvider({ children }: WishlistProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const { isLoggedin, user, uid } = session;

  useEffect(() => {
    dispatch(fetchWishlist({ user: user?.email, guestUid: uid }));
  }, [isLoggedin, user, uid, dispatch]);

  return <>{children}</>;
}
