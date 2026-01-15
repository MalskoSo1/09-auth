import axios from "axios";
import type { NewNote, Note, UserData } from "../types/note";

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

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

const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
});

interface User {
  username: string;
  email: string;
  avatar: string;
}

export async function getUsers(): Promise<User[]> {
  const { data } = await nextServer.get<User[]>("/users");

  return data;
}

export async function getUserById(id: string): Promise<User> {
  const res = await nextServer.get<User>(`/users/${id}`);
  return res.data;
}

export async function registerUser(userData: UserData) {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
}

export async function loginUser(userData: UserData) {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
}

// export async function logoutUser() {
//   const { data } = await nextServer.post<User>("/auth/register", userData);
//   return data;
// }
