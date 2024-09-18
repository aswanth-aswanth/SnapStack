export interface User {
  _id: string;
  email: string;
  phoneNumber: string;
}

export interface Image {
  id: string;
  title: string;
  url: string;
  src: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}
