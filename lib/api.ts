import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${apiKey}`,
  },
});

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: string
): Promise<fetchNotesProps> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = {
    page,
    perPage,
  };

  if (search.trim()) params.search = search;

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const response = await instance.get<fetchNotesProps>("/notes", { params });
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await instance.post<Note>("/notes", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
}
