import { api } from './api'
import type { Note, PostNote, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[],
  totalPages: number,
  categoryId?: NoteTag
};

export const capitalizeTag = (tag: string): string => {
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
};

export const fetchNotes = async (searchWord: string, currentPage: number, category?: string): Promise<FetchNotesResponse> => {
  const formattedTag = category ? capitalizeTag(category) : undefined;
  const response = await api.get<FetchNotesResponse>(
    `/notes`,
    {
      params: {
        search: searchWord,
        page: currentPage,
        perPage: 12,
        tag: formattedTag,
      },
    }
  )
  return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(
    `/notes/${id}`,
  );
  return response.data;
};

export const createNote = async (newToDo: PostNote): Promise<Note> => {
  const response = await api.post<Note>(
    `/notes`,
    newToDo,
  )
  return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(
    `/notes/${id}`,
  )
  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>('/users/me', payload);
  return res.data;
};

