import axios from 'axios';
import type { Post, CreatePostPayload } from '../types/blog';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async (searchQuery?: string): Promise<Post[]> => {
  if (searchQuery && searchQuery.trim()) {
    const response = await api.get<Post[]>(`/posts/search?q=${encodeURIComponent(searchQuery.trim())}`);
    return response.data;
  }
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const response = await api.post<Post>('/posts', payload);
  return response.data;
};

export const updatePost = async (id: string, payload: CreatePostPayload): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, payload);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
