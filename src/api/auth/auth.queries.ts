import { useUserContext } from "@/src/context/authContext";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { LoginApi, SignupApi, logoutApi } from "@/src/api/auth/auth.api";
import { AuthReducerAction } from "@/src/types/enums";
import { MainRoutes } from "@/src/constant/routes";
import { toast } from "sonner";
import { newUserType } from "./auth.type";

export const useLogin = () => {
  const { push: pushRouter } = useRouter();
  const { dispatch } = useUserContext();
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => LoginApi(username, password),
    onSuccess(data) {
      if (data.status === "success") {
        dispatch({
          type: AuthReducerAction.SET_USER,
          payload: {
            ...data.data.user,
            accessToken: data.token.accessToken,
            refreshToken: data.token.refreshToken,
          },
        });
        pushRouter(MainRoutes.HOME);
      }
      if (data.status === "fail") {
        toast.warning(
          "User Not Found Please Sign Up or enter valid username and password!"
        );
      }
    },
  });
};

export const useSignup = () => {
  const { push: pushRouter } = useRouter();
  const { dispatch } = useUserContext();
  return useMutation({
    mutationFn: (newUser: newUserType) => SignupApi(newUser),
    onSuccess(data) {
      if (data.status === "success") {
        dispatch({
          type: AuthReducerAction.SET_USER,
          payload: {
            ...data.data.user,
            accessToken: data.token.accessToken,
            refreshToken: data.token.refreshToken,
          },
        });
        pushRouter(MainRoutes.HOME);
      }
      if (data.status === "fail") {
        toast.error(data.message);
      }
    },
  });
};

export const useLogout = () => {
  const { dispatch } = useUserContext();
  return useMutation({
    mutationFn: () => logoutApi(),
    onSuccess() {
      dispatch({ type: AuthReducerAction.LOGOUT });
    },
  });
};
