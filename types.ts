export type Video = {
  title: string;
  thumbnail: string;
  description: string;
  duration: number;
  youtubeid: string;
  date: string;
  id: string;
  fav: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ApiUser = Omit<User, "password">;
export type LoginUser = Omit<User, "id" | "name">;
export type RegisterUser = Omit<User, "id">;
