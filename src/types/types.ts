import { AuthReducerAction } from "@/src/types/enums";

export type AuthStateType = {
  isLogin: boolean;
  username: string;
  role: string;
  userId: string;
  firstname: string;
};

export type AuthReducerActionType =
  | {
      type: AuthReducerAction.SET_USER;
      payload: {
        username: string;
        role: string;
        _id: string;
        accessToken: string;
        refreshToken: string;
        firstname: string;
      };
    }
  | {
      type: AuthReducerAction.LOGOUT;
    };

export type NewUserType = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
};
