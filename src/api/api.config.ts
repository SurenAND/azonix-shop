import { BASE_URL } from "@/src/constant/url";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const req = axios.create({ baseURL: BASE_URL });

req.interceptors.request.use((config) => {
  if (config.url !== "/auth/token") {
    const accessToken = getCookie("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

req.interceptors.response.use(
  (response) => {
    return response;
  },

  // 401
  (error) => {
    const config = error.config;
    if (error.response.status === 401 && config.url !== "/auth/login") {
      const refreshToken = getCookie("refreshToken");
      req.post("/auth/token", { refreshToken }).then((res) => {
        const accessToken = res?.data?.token?.accessToken;
        setCookie("accessToken", accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
        return req(config);
      });
    } else if (config.url === "/auth/token") {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      location.href = "/register";
    } else {
      return error.response;
    }
  }
);
