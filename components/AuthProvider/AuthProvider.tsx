"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { usePathname, useRouter } from "next/navigation";
import { getMe } from "@/lib/api/clientApi";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/sign-in", "/sign-up"];

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const isAuthorized = await checkSession();
  //       if (isAuthorized) {
  //         const user = await getMe();
  //         if (user) {
  //           setUser(user);
  //         }
  //       } else {
  //         clearIsAuthenticated();

  //         if (!publicRoutes.includes(pathname)) {
  //           router.replace("/sign-in");
  //         }
  //       }
  //     } catch {
  //       clearIsAuthenticated();
  //       if (pathname !== "/") {
  //         router.replace("/sign-in");
  //       }
  //     }

  //     setLoading(false);
  //   };

  //   fetchUser();
  // }, [pathname, router, setUser, clearIsAuthenticated]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();

        if (!publicRoutes.includes(pathname)) {
          router.replace("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loader />;
  return children;
};

export default AuthProvider;
