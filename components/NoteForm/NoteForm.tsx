"use client";

import css from "./NoteForm.module.css";
import type { NewNote } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { useState } from "react";
import { createNote } from "@/lib/api/clientApi";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    tag: "",
  });

  const createNoteMutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: (data: NewNote) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      router.back();
      clearDraft();
    },
  });

  const handleSubmit = () => {
    if (!draft.title || !draft.content) {
      setErrors({
        title: !draft.title ? "Required" : "",
        content: !draft.content ? "Required" : "",
        tag: "",
      });
      return;
    }

    createNoteMutation.mutate(draft);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      action={() => handleSubmit()}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   handleSubmit();
      // }}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft.title}
        />
        <span className={css.error}>{errors.title}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={draft.content}
        />
        <span className={css.error}>{errors.content}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error}>{errors.tag}</span>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
