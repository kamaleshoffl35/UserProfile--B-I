import axios from "axios";
const API=axios.create({
  baseURL: "http://localhost:5000/api"
});

export const setUserHeader=(userId) => {
  if (userId) 
    API.defaults.headers.common["x-user-id"] = userId;
  else 
    delete API.defaults.headers.common["x-user-id"];
};

export const login= async(email, password) => {
  const res=await API.post("/users/login",{email,password});
  return res.data;
};

export const register = async (payload) => {
  const res = await API.post("/users/register", payload);
  return res.data;
};

export const getMe = async (userId) => {

  const res = await API.get("/users/me", { params: { userId }});
  return res.data;
};

export const getUserById = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

export default API;
