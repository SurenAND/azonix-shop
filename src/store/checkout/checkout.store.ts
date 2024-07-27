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
            (item) => item._id === info._id,
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
