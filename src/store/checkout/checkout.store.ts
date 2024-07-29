import {
  CheckoutState,
  PaymentOptionsInfo,
  PersonalInfo,
  ShippingInfo,
  ShoppingCartItem,
} from '@/src/store/checkout/checkout.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState: CheckoutState = {
  activeStep: 0,
  shoppingCartInfo: [],
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    date: new Date().toISOString(),
  },
  shippingInfo: {
    priceSelected: 0,
    selected: 0,
    shippingTitle: '',
    shippingDescription: '',
  },
  paymentOptionsInfo: {
    selected: 0,
    paymentOptionTitle: '',
    paymentOptionDescription: '',
  },
  setActiveStep: () => {},
  setShoppingCartInfo: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeFromCart: () => {},
  clearUserCart: () => {},
  setPersonalInfo: () => {},
  setShippingInfo: () => {},
  setPaymentOptionsInfo: () => {},
  reset: () => {},
};

const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveStep: (activeStep: number) => set({ activeStep }),

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

      setPersonalInfo: (info: PersonalInfo) => set({ personalInfo: info }),
      setShippingInfo: (info: ShippingInfo) => set({ shippingInfo: info }),
      setPaymentOptionsInfo: (info: PaymentOptionsInfo) =>
        set({ paymentOptionsInfo: info }),
      reset: () => set({ ...initialState }),
    }),
    { name: 'checkout-storage' },
  ),
);

export default useCheckoutStore;
