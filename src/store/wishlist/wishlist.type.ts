export type WishlistItem = {
  _id: string;
  userId: string;
  name: string;
  image: string;
  brand: string;
  category: string;
};

export type WishlistState = {
  wishlistItems: WishlistItem[];
  changeWishlist: (info: WishlistItem) => void;
  removeFromWishlist: (userId: string, productId: string) => void;
  assignWishlistToUser: (userId: string) => void;
};
