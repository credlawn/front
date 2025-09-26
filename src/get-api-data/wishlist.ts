import { api } from "@/lib/fetch";
import { WishlistItem } from "@/types/wishlist";

interface WishlistApiArgs {
  user?: string;
  guestUid?: string;
}

interface AddRemoveWishlistApiArgs extends WishlistApiArgs {
  productId: string;
}

interface MergeWishlistApiArgs {
  guestUid: string;
  user: string;
}

const getWishlistAPI = async (args: WishlistApiArgs): Promise<WishlistItem[]> => {
  try {
    const response = await api("wishlist.get_wishlist_items", {
      method: "POST",
      body: JSON.stringify(args),
    });
    if (!response.ok) throw new Error("Failed to fetch wishlist");
    const data = await response.json();
    return data.message || [];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
};

const addToWishlistAPI = async (args: AddRemoveWishlistApiArgs): Promise<WishlistItem[]> => {
  try {
    const response = await api("wishlist.add_to_wishlist", {
      method: "POST",
      body: JSON.stringify(args),
    });
    if (!response.ok) throw new Error("Failed to add item to wishlist");
    const data = await response.json();
    return data.message || [];
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    return [];
  }
};

const removeFromWishlistAPI = async (args: AddRemoveWishlistApiArgs): Promise<WishlistItem[]> => {
  try {
    const response = await api("wishlist.remove_from_wishlist", {
      method: "POST",
      body: JSON.stringify(args),
    });
    if (!response.ok) throw new Error("Failed to remove item from wishlist");
    const data = await response.json();
    return data.message || [];
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    return [];
  }
};

const mergeWishlistAPI = async (args: MergeWishlistApiArgs): Promise<WishlistItem[]> => {
  try {
    const response = await api("wishlist.merge_wishlist", {
      method: "POST",
      body: JSON.stringify(args),
    });
    if (!response.ok) throw new Error("Failed to merge wishlists");
    const data = await response.json();
    return data.message || [];
  } catch (error) {
    console.error("Error merging wishlists:", error);
    return [];
  }
};

export { getWishlistAPI, addToWishlistAPI, removeFromWishlistAPI, mergeWishlistAPI };