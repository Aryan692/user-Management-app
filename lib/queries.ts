import axios from "axios";

export const createUser = async (data: any) => {
  const res = await axios.post("/api/users", data);
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get("/api/users");
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axios.get(`/api/users/${id}`);
  return res.data;
};