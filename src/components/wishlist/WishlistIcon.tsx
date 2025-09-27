'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { addToWishlist, removeFromWishlist, selectWishlistItems } from '@/redux/features/wishlist-slice';
import { selectSession } from '@/redux/features/session-slice';
import { cn } from '@/lib/utils';

interface WishlistIconProps {
  productId: string;
  className?: string;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ productId, className }) => {
  const dispatch: AppDispatch = useDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);
  const session = useAppSelector(selectSession);

  const isInWishlist = wishlistItems.some((item) => item.product === productId);

  const identifiers = {
    user: session.isLoggedin ? session.user?.email : undefined,
    guestUid: session.uid,
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      dispatch(removeFromWishlist({ productId, ...identifiers }));
    } else {
      dispatch(addToWishlist({ productId, ...identifiers }));
    }
  };

  return (
    <div className="relative group/tooltip flex items-center">
      <button
        onClick={handleToggle}
        className={cn(
          "p-2 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out cursor-pointer",
          "hover:scale-110 active:scale-95",
          className
        )}
        aria-label={isInWishlist ? 'Added' : 'Add to wishlist'}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            isInWishlist ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          )}
          fill={isInWishlist ? 'currentColor' : 'none'}
        />
      </button>
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-max px-3 py-2 bg-gray-100 text-red-500 text-sm font-semibold rounded-md scale-0 transition-all origin-right group-hover/tooltip:scale-100 hidden md:block">
        {isInWishlist ? 'Added' : 'Add to wishlist'}
      </span>
    </div>
  );
};

export default WishlistIcon;
