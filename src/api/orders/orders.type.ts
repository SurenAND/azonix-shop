export type OrderType = {
  _id: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    phoneNumber: string;
    address: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  products: [
    {
      product: {
        rating: {
          rate: number;
          count: number;
        };
        _id: string;
        category: string;
        subcategory: string;
        name: string;
        price: number;
        quantity: number;
        brand: string;
        description: string;
        thumbnail: string;
        images: string[];
        createdAt: string;
        updatedAt: string;
        slugname: string;
        __v: number;
      };
      count: number;
      _id: string;
    },
  ];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AllOrdersType = {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: OrderType[];
  };
};

export type SingleOrderType = {
  status: string;
  data: {
    order: OrderType;
  };
};

export type GetOrdersParamsType = {
  page?: number;
  sort?: string;
  deliveryStatus?: boolean | string;
};

export type AddNewOrderParamsType = {
  user: string;
  products: { product: string; count: number }[];
  deliveryStatus: boolean;
  deliveryDate: string;
};

export type AddOrderResponseType = {
  status: string;
  data: {
    order: {
      user: string;
      products: [
        {
          product: {
            _id: string;
            price: number;
            quantity: number;
            priceAfterDiscount: number;
          };
          count: number;
          _id: string;
        },
      ];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
};

export type ProductInOrderResponseType =
  AddOrderResponseType['data']['order']['products'][0];

export type GetOrdersByUserIdParamsType = {
  sort?: string;
};
