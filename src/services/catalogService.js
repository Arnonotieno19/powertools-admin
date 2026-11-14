import { api } from "./apiClient";

export const catalogService = {
  getCategories: () => api.get("/admin/categories"),
  createCategory: (payload) => api.post("/admin/categories", payload),
  updateCategory: (id, payload) => api.put(`/admin/categories/${id}`, payload),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
  getBrands: () => api.get("/admin/brands"),
  createBrand: (payload) => api.post("/admin/brands", payload),
  updateBrand: (id, payload) => api.put(`/admin/brands/${id}`, payload),
  deleteBrand: (id) => api.delete(`/admin/brands/${id}`),
};
