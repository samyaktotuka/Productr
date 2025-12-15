// import api from "./axiosInstance";

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/products",
// });

// /* GET all products */
// export const fetchProducts = async () => {
//   const res = await api.get("/");
//   return res.data;
// };

// /* CREATE product */
// export const createProduct = async (product) => {
//   const res = await api.post("/", product);
//   return res.data;
// };

// /* UPDATE product */
// export const updateProduct = async (id, data) => {
//   const res = await api.put(`/${id}`, data);
//   return res.data;
// };

// /* DELETE product */
// export const deleteProduct = async (id) => {
//   const res = await api.delete(`/${id}`);
//   return res.data;
// };

// /* TOGGLE publish */
// export const togglePublish = async (id, published) => {
//   const res = await api.put(`/${id}`, { published });
//   return res.data;
// };

//
//
//
//
// import axios from "axios";

// const API = axios.create({
//   baseURL: "/api/products",
// });

// export const fetchProducts = () => API.get("/");
// export const createProduct = (data) => API.post("/", data);
// export const updateProduct = (id, data) => API.put(`/${id}`, data);
// export const deleteProduct = (id) => API.delete(`/${id}`);
// export const togglePublish = (id, published) =>
//   API.put(`/${id}`, { published });
//
//

import api from "./axiosInstance";

/* GET all products */
export const fetchProducts = async () => {
  const { data } = await api.get("/");
  return data;
};

/* CREATE product */
export const createProduct = async (product) => {
  const { data } = await api.post("/", product);
  return data;
};

/* UPDATE product */
export const updateProduct = async (id, updatedProduct) => {
  const { data } = await api.put(`/${id}`, updatedProduct);
  return data;
};

/* DELETE product */
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

/* TOGGLE publish */
export const togglePublish = async (id, published) => {
  const { data } = await api.put(`/${id}`, { published });
  return data;
};
