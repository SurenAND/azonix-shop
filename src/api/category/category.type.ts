export type CategoryType = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
};

export type AllCategoriesType = {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    categories: CategoryType[];
  };
};

export type GetSubCategoriesParamsType = {
  category?: string;
};

export type SubCategoryType = {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
};

export type AllSubCategoriesType = {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    subcategories: SubCategoryType[];
  };
};
