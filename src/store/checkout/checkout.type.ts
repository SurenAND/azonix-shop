export interface ShoppingCartItem {
  _id: string;
  userId: string;
  name: string;
  image: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
}

export interface DeliveryDate {
  date: string;
  userId: string;
}

export interface CheckoutState {
  deliveryDate: DeliveryDate[];
  setDeliveryDate: (data: DeliveryDate) => void;
  resetUserDeliveryDate: (userId: string) => void;
  shoppingCartInfo: ShoppingCartItem[];
  setShoppingCartInfo: (info: ShoppingCartItem) => void;
  incrementQuantity: (userId: string, productId: string) => void;
  decrementQuantity: (userId: string, productId: string) => void;
  removeFromCart: (userId: string, productId: string) => void;
  assignCartToUser: (userId: string) => void;
  clearUserCart: (userId: string) => void;
}
