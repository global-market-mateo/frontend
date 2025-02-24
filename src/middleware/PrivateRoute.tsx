"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import { useRouter, usePathname } from "next/navigation";
import { Api } from "@/actions/Api";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const getToken = async (token: string) => {
    try {
      const res = await Api.get("/auth/token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const isValid = token ? await getToken(token) : false;

      if (isValid) {
        // Usuario autenticado
        if (pathname === "/login") {
          // Redirige al dashboard si intenta acceder a /login estando autenticado
          router.push("/dashboard");
        } else if (pathname === "/dashboard") {
          // Permitir acceso a /dashboard si está autenticado
          setLoading(false);
        } else {
          // Permitir el acceso a todas las demás rutas
          setLoading(false);
        }
      } else {
        // Usuario no autenticado
        if (pathname === "/dashboard") {
          // Redirige a /login si intenta acceder a /dashboard
          router.push("/login");
        } else {
          // Permitir el acceso a otras rutas no protegidas
          setLoading(false);
        }
      }
    };

    verifyToken();
  }, [router, pathname]);

  if (loading) {
    return <Loading />;
  }

  return children;
}
