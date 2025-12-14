import api from "./axiosInstance";

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

/* GET all products */
export const fetchProducts = async () => {
  const res = await api.get("/");
  return res.data;
};

/* CREATE product */
export const createProduct = async (product) => {
  const res = await api.post("/", product);
  return res.data;
};

/* UPDATE product */
export const updateProduct = async (id, data) => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

/* DELETE product */
export const deleteProduct = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

/* TOGGLE publish */
export const togglePublish = async (id, published) => {
  const res = await api.put(`/${id}`, { published });
  return res.data;
};
