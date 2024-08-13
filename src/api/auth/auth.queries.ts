import {
  deleteUserApi,
  getAllUsersApi,
  getUserByIdApi,
  LoginApi,
  logoutApi,
  SignupApi,
  updateUserApi,
} from '@/src/api/auth/auth.api';
import {
  AllUsersType,
  GetUsersParamsType,
  newUserType,
  UserByIdType,
  UserDataType,
} from '@/src/api/auth/auth.type';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { useUserStore } from '@/src/store/user/user.store';
import useWishlistStore from '@/src/store/wishlist/wishlist.store';
import { AuthReducerAction } from '@/src/types/enums';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLogin = () => {
  const { t } = useTranslation();
  const { push: pushRouter } = useRouter();
  const { dispatch } = useUserContext();
  const { assignCartToUser } = useCheckoutStore();
  const { setUserData } = useUserStore();
  const { assignWishlistToUser } = useWishlistStore();
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => LoginApi(username, password),
    onSuccess(data) {
      if (data?.status === 'success') {
        dispatch({
          type: AuthReducerAction.SET_USER,
          payload: {
            ...data?.data.user,
            accessToken: data?.token.accessToken,
            refreshToken: data?.token.refreshToken,
          },
        });
        setUserData({
          firstname: data?.data.user.firstname,
          lastname: data?.data.user.lastname,
          username: data?.data.user.username,
          phoneNumber: data?.data.user.phoneNumber,
          address: data?.data.user.address,
        });
        assignCartToUser(data?.data.user._id);
        assignWishlistToUser(data?.data.user._id);
        pushRouter(MainRoutes.HOME);
      }
    },
    onError() {
      toast.warning(t('login-user-not-found'));
    },
  });
};

export const useSignup = () => {
  const { push: pushRouter } = useRouter();
  const { dispatch } = useUserContext();
  const { assignCartToUser } = useCheckoutStore();
  const { setUserData } = useUserStore();
  const { assignWishlistToUser } = useWishlistStore();
  return useMutation({
    mutationFn: (newUser: newUserType) => SignupApi(newUser),
    onSuccess(data) {
      if (data?.status === 'success') {
        dispatch({
          type: AuthReducerAction.SET_USER,
          payload: {
            ...data?.data.user,
            accessToken: data?.token.accessToken,
            refreshToken: data?.token.refreshToken,
          },
        });
        setUserData({
          firstname: data?.data.user.firstname,
          lastname: data?.data.user.lastname,
          username: data?.data.user.username,
          phoneNumber: data?.data.user.phoneNumber,
          address: data?.data.user.address,
        });
        assignCartToUser(data?.data.user._id);
        assignWishlistToUser(data?.data.user._id);
        pushRouter(MainRoutes.HOME);
      }
      if (data?.status === 'fail') {
        toast.error(data?.message);
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

export const useGetUsers = (params: GetUsersParamsType) => {
  return useQuery<AllUsersType>({
    queryKey: ['users'],
    queryFn: () => getAllUsersApi(params),
    refetchOnMount: 'always',
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserApi(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};

export const useGetUserById = (id: string) => {
  return useQuery<UserByIdType>({
    queryKey: ['users', 'single', id],
    queryFn: () => getUserByIdApi(id),
    refetchOnMount: 'always',
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      newUser,
      data,
    }: {
      newUser: UserDataType;
      data: Partial<UserDataType>;
    }) => updateUserApi(newUser, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};
