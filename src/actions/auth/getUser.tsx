import { useQuery } from "@tanstack/react-query";
import { Api } from "../Api";
interface Business {
  id: string;
  name: string;
  ownerId: string;
  paymentMethods: string[];
  deliveryMethods: string[];
  wppNumber: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  businesses: Business[];
  role: "USER" | "ADMIN" | "ROOT";
}

export const getUserFn = async () => {
  const token = localStorage.getItem("token");
  const bererToken = `Bearer ${token}`;
  return (await Api.get("/user", { headers: { Authorization: bererToken } }))
    .data as User;
};

export const getUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserFn,
  });
};
