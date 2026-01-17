"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe } from "@/lib/api/clientApi";

const privateRoutes = ["/notes", "/profile"];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      if (privateRoutes.some((path) => pathname?.startsWith(path))) {
        try {
          const isAuthorized = await checkSession();
          if (isAuthorized) {
            const user = await getMe();
            if (user) {
              setUser(user);
            }
          } else {
            clearIsAuthenticated();
            router.replace("/sign-in");
          }
        } catch {
          clearIsAuthenticated();
          router.replace("/sign-in");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) return <Loader />;
  return children;
};

export default AuthProvider;
