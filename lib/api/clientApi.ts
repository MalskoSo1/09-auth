import { NewNote, Note } from "@/types/note";
import api from "./api";
import { User } from "@/types/user";

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface UserData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
}

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

  const response = await api.get<fetchNotesProps>("/notes", { params });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await api.post<Note>("/notes", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

// User
export async function registerUser(userData: UserData): Promise<User> {
  const { data } = await api.post<User>("/auth/register", userData);
  return data;
}

export async function loginUser(userData: UserData): Promise<User> {
  const { data } = await api.post<User>("/auth/login", userData);
  return data;
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get<User>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(userData: UpdateUserData): Promise<User> {
  const { data } = await api.patch<User>("/users/me", userData);
  return data;
}
