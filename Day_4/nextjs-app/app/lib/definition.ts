export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: "pending" | "active";
  date: string;
  image_url: string | null;
};
export type UserField = {
  id: string;
  name: string;
  image_url: string | null;
  email: string;
  status: "pending" | "active";
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  date: string;
  status: "pending" | "active";
};
