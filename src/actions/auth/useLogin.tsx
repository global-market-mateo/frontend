"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Api } from "../Api";

export const loginFn = async (loginData: {
  password: string;
  email: string;
}) => {
  return (await Api.post("/auth/login", loginData)).data;
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Error durante el login:", error || error.message);
      return { message: "No autorizado", status: 401 };
    },
  });
};
