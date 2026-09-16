export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  author: string;
}

export interface User {
  username: string;
  role: 'teacher' | 'student';
}
