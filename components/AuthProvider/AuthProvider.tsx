"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("START REFRESH");
      const isAuthorized = await refreshSession();
      if (isAuthorized) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearUser();
      }
    };

    fetchUser();
  }, []);

  return children;
};

export default AuthProvider;
