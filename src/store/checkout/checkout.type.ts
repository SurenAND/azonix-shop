export interface ShoppingCartItem {
  _id: string;
  userId: string;
  name: string;
  image: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
}

export interface CheckoutState {
  shoppingCartInfo: ShoppingCartItem[];
  setShoppingCartInfo: (info: ShoppingCartItem) => void;
  incrementQuantity: (userId: string, productId: string) => void;
  decrementQuantity: (userId: string, productId: string) => void;
  removeFromCart: (userId: string, productId: string) => void;
  clearUserCart: (userId: string) => void;
}
