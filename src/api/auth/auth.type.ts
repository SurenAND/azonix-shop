export type UserDataType = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
      password: string;
      phoneNumber: string;
      address: string;
      role: string;
    };
  };
};

export type newUserType = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
};
