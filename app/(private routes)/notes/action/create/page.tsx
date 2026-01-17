import { Metadata } from "next";
import css from "./page.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note | Notes App",
  description:
    "Add a new note to your Notes App. Enter title, content, and choose a tag.",
  keywords: ["note", "reminder", "create", "new note"],
  openGraph: {
    title: "Create Note | Notes App",
    description:
      "Add a new note to your Notes App. Enter title, content, and choose a tag.",
    url: "https://09-auth-six-dusky.vercel.app/notes/action/create",
    siteName: "Notes App",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes App – Create Note",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
