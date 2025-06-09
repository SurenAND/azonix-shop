export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
  type: 'ADMIN' | 'USER';
}

export interface PaginatedResult {
  users: User[];
  total: number;
  page: number;
  pages: number;
}

export interface AuthState {
  currentUser: User | null;
  error: string | null;
  signup: (user: User) => boolean;
  login: (
    username: string,
    password: string,
  ) => { success: boolean; userData: User | null };
  updateUser: (profile: User) => void;
  updateUserAsAdmin: (profile: User) => void;
  logout: () => void;
  getUsers: (page?: number, limit?: number) => PaginatedResult;
  getUsersByType: (
    type: string,
    page?: number,
    limit?: number,
  ) => PaginatedResult;
  getUserById: (id: string) => User | null;
  deleteUser: (id: string) => void;
}
