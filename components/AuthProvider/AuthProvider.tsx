"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const [loading, setLoading] = useState(true);

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
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <Loader />;
  return children;
};

export default AuthProvider;
