export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  avatar?: string;
  lastLogin: string;
  // createdAt: string;
  // updatedAt: string;
  // deletedAt: string | null;
}
