"use client";

import { loginUser, UserData } from "@/lib/api/clientApi";
import css from "./page.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (formData: FormData) => {
    setErrors({ email: "", password: "", general: "" });
    const userData = Object.fromEntries(formData) as unknown as UserData;

    if (!userData.email || !userData.password) {
      setErrors({
        email: !userData.email ? "Required" : "",
        password: !userData.password ? "Required" : "",
        general: "",
      });
      return;
    }

    try {
      const user = await loginUser(userData);
      setUser(user);
      router.push("/profile");
    } catch (err) {
      console.error("Login failed", err);
      setErrors({
        email: "",
        password: "",
        general: "Login failed. Check your credentials.",
      });
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {errors.general && <p className={css.error}>{errors.general}</p>}
      </form>
    </main>
  );
};

export default Login;
