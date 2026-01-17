import { Metadata } from "next";
import css from "./page.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile | Notes App",
  description: "View and manage your profile information in Notes App.",
  keywords: ["profile", "user", "notes app"],
  openGraph: {
    title: "Profile | Notes App",
    description: "View and manage your profile information in Notes App.",
    url: "https://08-zustand-brown-gamma.vercel.app/profile",
    siteName: "Notes App",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes App – User Profile",
      },
    ],
  },
};

const Profile = async () => {
  // const user = useAuthStore((s) => s.user);

  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt={`Avatar ${user?.username}`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
