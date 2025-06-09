export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
}

export interface AuthState {
  currentUser: User | null;
  error: string | null;
  signup: (user: User) => boolean;
  login: (
    username: string,
    password: string,
  ) => { success: boolean; userData: User | null };
  logout: () => void;
}
