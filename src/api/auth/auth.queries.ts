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
import { AuthReducerAction } from '@/src/types/enums';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'sonner';

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
      if (data.status === 'success') {
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
    },
    onError() {
      toast.warning(
        'User Not Found Please Sign Up or enter valid username and password!',
      );
    },
  });
};

export const useSignup = () => {
  const { push: pushRouter } = useRouter();
  const { dispatch } = useUserContext();
  return useMutation({
    mutationFn: (newUser: newUserType) => SignupApi(newUser),
    onSuccess(data) {
      if (data.status === 'success') {
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
      if (data.status === 'fail') {
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
    mutationFn: ({ newUser, data }: { newUser: UserDataType; data: any }) =>
      updateUserApi(newUser, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};
