export type UserDataType = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  password: string;
};

export type newUserType = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
};

export type AllUsersType = {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    users: UserDataType[];
  };
};

export type GetUsersParamsType = {
  page?: number;
  limit?: number;
  role?: string;
};

export type UserByIdType = {
  status: string;
  data: {
    user: UserDataType;
  };
};
