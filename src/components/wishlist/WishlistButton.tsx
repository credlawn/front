"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { addToWishlist, removeFromWishlist, selectWishlistItems } from "@/redux/features/wishlist-slice";
import { selectSession } from "@/redux/features/session-slice";
import { WishlistItem } from "@/types/wishlist";
import { Button } from "@/ui/button"; // Assuming a Button component exists in "@/ui/button"

interface WishlistButtonProps {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  slug: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  productName,
  productImage,
  price,
  slug,
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);
  const session = useAppSelector(selectSession);

  const isInWishlist = wishlistItems.some((item) => item.product === productId);

  const identifiers = {
    user: session.isLoggedin ? session.user?.email : undefined,
    guestUid: session.uid,
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist({ productId, identifiers }));
    } else {
      dispatch(addToWishlist({ productId, identifiers }));
    }
  };

  return (
    <Button onClick={handleWishlistToggle} variant="outline">
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default WishlistButton;
