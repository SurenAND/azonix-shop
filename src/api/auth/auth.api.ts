import { req } from '@/src/api/api.config';
import {
  GetUsersParamsType,
  newUserType,
  UserDataType,
} from '@/src/api/auth/auth.type';

export const LoginApi = async (username: string, password: string) => {
  const response = await req.post('/auth/login', { username, password });
  return response.data;
};

export const SignupApi = async (newUser: newUserType) => {
  const response = await req.post('/auth/signup', newUser);
  return response.data;
};

export const logoutApi = async () => {
  const response = await req.get('/auth/logout');
  return response.data;
};

export const getAllUsersApi = async (params: GetUsersParamsType) => {
  const _params: any = {};
  if (params.page) _params.page = params.page;
  if (params.role) _params.role = params.role;
  if (params.limit) _params.limit = params.limit;

  const response = await req.get('/users', { params: _params });
  return response.data;
};

export const deleteUserApi = async (id: string) => {
  const response = await req.delete(`/users/${id}`);
  return response.data;
};

export const getUserByIdApi = async (id: string) => {
  const response = await req.get(`/users/${id}`);
  return response.data;
};

export const updateUserApi = async (user: UserDataType, data: any) => {
  const response = await req.patch(`/users/${user._id}`, data);
  return response.data;
};
