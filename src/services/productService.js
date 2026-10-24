import { api } from "./apiClient";
import { products, productBrands, productCategories } from "@/mocks/products";
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
const paginate = (rows, page = 0, size = 10) => ({ content: rows.slice(page * size, (page + 1) * size), page, size, totalElements: rows.length, totalPages: Math.max(1, Math.ceil(rows.length / size)) });
export const productService = {
  getProducts: (params = {}) => {
    if (!useMocks) return api.get(`/admin/products?${new URLSearchParams(params)}`);
    const { search = "", brand = "", category = "", status = "", page = 0, size = 10 } = params;
    const query = search.toLowerCase();
    const rows = products.filter((product) =>
      (!query || `${product.name} ${product.sku} ${product.brand}`.toLowerCase().includes(query)) &&
      (!brand || product.brand === brand) && (!category || product.category === category) && (!status || product.status === status)
    );
    return Promise.resolve(paginate(rows, Number(page), Number(size)));
  },
  getProduct: (id) => useMocks ? Promise.resolve(products.find((p) => String(p.id) === String(id))) : api.get(`/admin/products/${id}`),
  getProductOptions: () => useMocks ? Promise.resolve({ brands:productBrands, categories:productCategories }) : api.get("/admin/products/options"),
  createProduct(payload) { if (!useMocks) return api.post("/admin/products", payload); const created={ id:Date.now(),productId:Date.now(),variantId:Date.now()+1,stock:0,image:null,...payload }; products.push(created); return Promise.resolve(created); },
  updateProduct(id, payload) { if (!useMocks) return api.put(`/admin/products/${id}`, payload); const index=products.findIndex((item)=>String(item.id)===String(id)); const updated={...products[index],...payload,id:products[index]?.id??id}; if(index>=0)products[index]=updated; return Promise.resolve(updated); },
};
