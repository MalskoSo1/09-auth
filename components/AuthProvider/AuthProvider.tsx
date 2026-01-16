"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { usePathname, useRouter } from "next/navigation";

const privateRoutes = ["/notes", "/profile"];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthorized = await checkSession();

      if (isAuthorized) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearUser();
        if (privateRoutes.some((path) => pathname.startsWith(path))) {
          router.replace("/sign-in");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [pathname, router, setUser, clearUser]);

  if (loading) return <Loader />;
  return children;
};

export default AuthProvider;
