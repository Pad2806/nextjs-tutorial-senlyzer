export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: "pending" | "active";
  date: string;
};
export type UserField = {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active";
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  date: string;
  status: "pending" | "active";
};
