"use client";

import Image from "next/image";
import css from "./page.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@/types/user";
import { updateMe } from "@/lib/api/clientApi";

const Edit = () => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.username || "");

  if (!user) return null;

  const handleSubmit = async () => {
    setError("");

    try {
      const updatedUser: User = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update username. Try again.");
    }
  };

  const handleCancel = () => {
    router.back();
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "/default-avatar.png"}
          alt={`Avatar ${user?.username}`}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={() => handleSubmit()}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit;
