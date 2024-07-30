import {
  CheckoutState,
  ShoppingCartItem,
} from '@/src/store/checkout/checkout.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState: CheckoutState = {
  shoppingCartInfo: [],
  setShoppingCartInfo: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeFromCart: () => {},
  clearUserCart: () => {},
};

const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,
      setShoppingCartInfo: (info: ShoppingCartItem) => {
        set((prev) => {
          const existingItemIndex = prev.shoppingCartInfo.findIndex(
            (item) => item._id === info._id && item.userId === info.userId,
          );

          if (existingItemIndex !== -1) {
            // Item exists, update quantity
            const updatedCart = [...prev.shoppingCartInfo];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: info.quantity
                ? info.quantity
                : updatedCart[existingItemIndex].quantity + 1,
            };
            return { shoppingCartInfo: updatedCart };
          } else {
            // Item doesn't exist, add it with qty 1
            return {
              shoppingCartInfo: [
                ...prev.shoppingCartInfo,
                { ...info, quantity: info.quantity || 1 },
              ],
            };
          }
        });
      },

      incrementQuantity: (userId: string, productId: string) => {
        set((prev) => ({
          shoppingCartInfo: prev.shoppingCartInfo.map((item) =>
            item._id === productId && item.userId === userId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      decrementQuantity: (userId: string, productId: string) => {
        set((prev) => ({
          shoppingCartInfo: prev.shoppingCartInfo.map((item) =>
            item._id === productId && item.userId === userId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        }));
      },

      removeFromCart: (userId: string, productId: string) => {
        set((prev) => ({
          shoppingCartInfo: prev.shoppingCartInfo.filter(
            (item) => item._id !== productId || item.userId !== userId,
          ),
        }));
      },

      clearUserCart: (userId: string) => {
        set((prev) => ({
          shoppingCartInfo: prev.shoppingCartInfo.filter(
            (item) => item.userId !== userId,
          ),
        }));
      },
    }),
    { name: 'checkout-storage' },
  ),
);

export default useCheckoutStore;
