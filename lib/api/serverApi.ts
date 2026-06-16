import { api } from './api'
import { cookies } from 'next/headers';
import type { User } from '@/types/user'
import type { Note } from '@/types/note';
import { FetchNotesResponse, capitalizeTag } from './clientApi'

export const fetchNotes = async (searchWord: string, currentPage: number, category?: string): Promise<FetchNotesResponse> => {
  const formattedTag = category ? capitalizeTag(category) : undefined;
  const cookieStore = await cookies();
  
  const response = await api.get<FetchNotesResponse>(
    `/notes`,
    {
      params: {
        search: searchWord,
        page: currentPage,
        perPage: 12,
        tag: formattedTag,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  )
  return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const response = await api.get<Note>(
    `/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};