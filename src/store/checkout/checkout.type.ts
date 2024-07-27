export interface ShoppingCartItem {
  _id: string;
  userId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: number | string;
  address: string;
  date: string;
}

export interface ShippingInfo {
  shippingTitle: string;
  shippingDescription: string;
  priceSelected: number;
  selected: number;
}

export interface PaymentOptionsInfo {
  selected: number;
  paymentOptionTitle: string;
  paymentOptionDescription: string;
}

export interface CheckoutState {
  activeStep: number;
  setActiveStep: (step: number) => void;
  shoppingCartInfo: ShoppingCartItem[];
  setShoppingCartInfo: (info: ShoppingCartItem) => void;
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  paymentOptionsInfo: PaymentOptionsInfo;
  setPaymentOptionsInfo: (info: PaymentOptionsInfo) => void;
  reset: () => void;
}
