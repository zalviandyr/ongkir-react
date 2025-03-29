import { capitalize } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type IUserData = {
  username: string;
  password: string;
};

export const useRegister = () =>
  useMutation({
    mutationFn: async (data: IUserData) => {
      try {
        await axios.post("/api/register", data);
      } catch (e) {
        if (e instanceof AxiosError) {
          const message = e.response?.data?.message ?? "Server error";

          throw Error(capitalize(message));
        }
      }
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: IUserData): Promise<IUserData | undefined> => {
      try {
        const response = await axios.post("/api/login", data);
        const result = response.data as IUserData;

        localStorage.setItem("user", JSON.stringify(result));

        return result;
      } catch (e) {
        if (e instanceof AxiosError) {
          const message = e.response?.data?.message ?? "Server error";

          throw Error(capitalize(message));
        }
      }
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      localStorage.clear();
    },
  });

export const useIsAuthenticated = () =>
  useQuery({
    queryKey: ["auth", "is-authenticated"],
    queryFn: (): boolean => {
      const user = localStorage.getItem("user");

      return user ? true : false;
    },
  });
