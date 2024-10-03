export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  type: string;
  status: string;
  avatar?: string;
  lastLogin: string;
  created_at: string;
  // createdAt: string;
  // updatedAt: string;
  // deletedAt: string | null;
}
