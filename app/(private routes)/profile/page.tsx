import { Metadata } from "next";
import css from "./page.module.css";
import Image from "next/image";

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

const Profile = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a src="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
