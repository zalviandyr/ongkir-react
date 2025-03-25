import { useMutation, useQuery } from "@tanstack/react-query";

export type IUserData = {
  username: string;
  password: string;
};

export const useRegister = () =>
  useMutation({
    mutationFn: async (data: IUserData) => {
      let saved = fetchAllData();
      const user = getData(data);

      // avoid duplicate username
      if (user) {
        saved = saved.filter((e) => e.username !== user.username);
      }

      saved.push(data);

      localStorage.setItem("user-data", JSON.stringify(saved));
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: IUserData): Promise<IUserData> => {
      const user = getData(data);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        return user as IUserData;
      }

      throw Error("Invalid username or password");
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

const fetchAllData = (): IUserData[] => {
  const data = localStorage.getItem("user-data");
  if (data && data.length > 0) {
    return JSON.parse(data) as IUserData[];
  }

  return [];
};

const getData = (data: IUserData): IUserData | null => {
  const saved = fetchAllData();
  const exist = saved.find((e) => e.username === data.username && e.password === data.password);

  if (exist) {
    return exist as IUserData;
  }

  return null;
};
