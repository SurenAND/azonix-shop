export type UserStoreType = {
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
};

export type UserStore = {
  userData: UserStoreType | null;
  setUserData: (profile: UserStoreType) => void;
};
