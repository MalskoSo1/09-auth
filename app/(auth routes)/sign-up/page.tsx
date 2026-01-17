"use client";

import css from "./page.module.css";
import { registerUser, UserData } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
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
      const user = await registerUser(userData);
      setUser(user);
      router.push("/profile");
    } catch (err) {
      console.error("Registration failed", err);
      setErrors({
        email: "",
        password: "",
        general: "Registration failed. Check your data or try again.",
      });
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
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
            Register
          </button>
        </div>

        {errors.general && <p className={css.error}>{errors.general}</p>}
      </form>
    </main>
  );
};

export default Register;
