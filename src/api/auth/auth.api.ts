import { req } from "@/src/api/api.config";
import { newUserType } from "./auth.type";

export const LoginApi = async (username: string, password: string) => {
  const response = await req.post("/auth/login", { username, password });
  return response.data;
};

export const SignupApi = async (newUser: newUserType) => {
  const response = await req.post("/auth/signup", newUser);
  return response.data;
};

export const logoutApi = async () => {
  const response = await req.get("/auth/logout");
  return response.data;
};
