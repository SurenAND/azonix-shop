export type ShoppingCartItem = {
  _id: string;
  userId: string;
  name: string;
  image: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
};

export type DeliveryDate = {
  date: string;
  userId: string;
};

export type CheckoutState = {
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
};
