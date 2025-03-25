import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const client = axios.create({
  baseURL: "https://api.rajaongkir.com/starter",
  headers: { key: "l8d7DB4Y7cabb5b24abaf680GdkFdQ09" },
  timeout: 1000,
});

export const useGetProvince = () =>
  useQuery({
    queryKey: ["shipping", "get-province"],
    queryFn: async () => {
      const { data } = await client.get("/province");

      console.log(data);
    },
  });
