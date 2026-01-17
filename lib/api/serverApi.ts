import { cookies } from "next/headers";
import api from "./api";
import { Note } from "@/types/note";

export const checkServer = async () => {
  const cookiStore = await cookies();

  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookiStore.toString(),
    },
  });

  return res;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

// Notes
interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: string
): Promise<FetchNotesProps> {
  const cookieStore = cookies();

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
  if (tag && tag !== "all") params.tag = tag;

  const response = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export const fetchNoteById = async (id: string) => {
  const cookieStore = cookies();
  const res = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};
