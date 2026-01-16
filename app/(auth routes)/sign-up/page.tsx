"use client";

import { AxiosError } from "axios";
import css from "./page.module.css";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = { email: "", password: "", general: "" };

    if (!email) {
      newErrors.email = "Required";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const user = await registerUser({ email, password });
      setUser(user);
      router.push("/profile");
    } catch (err) {
      const error = err as AxiosError;
      setErrors({
        email: "",
        password: "",
        general: error.response?.data?.error || "Registration failed",
      });
      console.error("Registration failed", error);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={() => handleSubmit()}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
};

export default SignUp;
