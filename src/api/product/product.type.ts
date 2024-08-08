export type ProductType = {
  _id: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  subcategory: {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  name: string;
  price: number;
  discountPercentage: number;
  priceAfterDiscount: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  slugname: string;
};

export type AllProductsType = {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: ProductType[];
  };
};

export type ProductByIdType = {
  status: string;
  data: {
    product: ProductType;
  };
};

export type GetProductsParamsType = {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  price?: {
    gte?: number;
    lt?: number;
  };
  sort?: string;
};
