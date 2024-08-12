import {
  WishlistItem,
  WishlistState,
} from '@/src/store/wishlist/wishlist.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState: WishlistState = {
  wishlistItems: [],
  changeWishlist: () => {},
  removeFromWishlist: () => {},
  assignWishlistToUser: () => {},
};

const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      ...initialState,
      changeWishlist: (info: WishlistItem) => {
        set((prev) => {
          const existingItemIndex = prev.wishlistItems.findIndex(
            (item) => item._id === info._id && item.userId === info.userId,
          );
          if (existingItemIndex !== -1) {
            // if the item is already in the wishlist, remove it
            return {
              wishlistItems: prev.wishlistItems.filter(
                (item) => item._id !== info._id || item.userId !== info.userId,
              ),
            };
          } else {
            // if the item is not in the wishlist, add it
            return {
              wishlistItems: [...prev.wishlistItems, info],
            };
          }
        });
      },

      removeFromWishlist: (userId: string, productId: string) => {
        set((prev) => ({
          wishlistItems: prev.wishlistItems.filter(
            (item) => item._id !== productId || item.userId !== userId,
          ),
        }));
      },

      assignWishlistToUser: (userId: string) => {
        set((prev) => ({
          wishlistItems: prev.wishlistItems.map((item) =>
            item.userId === '' ? { ...item, userId } : item,
          ),
        }));
      },
    }),
    { name: 'wishlist-storage' },
  ),
);

export default useWishlistStore;
