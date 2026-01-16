"use client";
import { useQuery } from "@tanstack/react-query";

import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return <p className="text-loading text-loading-modal">Loading...</p>;
  if (error || !data) throw error;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{data.title}</h2>
          <button className={css.backBtn} onClick={() => router.back()}>
            X
          </button>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </Modal>
  );
};

export default NotePreview;
