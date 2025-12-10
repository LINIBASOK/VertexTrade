
import axios, { AxiosInstance } from 'axios';
import { Product, Sale, SalesReport } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token') || '';
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
};

const API_PRODUCTS = '/products';
const API_SALES = '/sales';
const API_REPORTS = '/sales-report';

export const productService = {
 
  add: (data: Omit<Product, 'id'>) =>
    axiosInstance.post(API_PRODUCTS, data, { headers: getAuthHeaders() }).then(res => res.data),


  update: (id: number, data: Product) =>
    axiosInstance.put(`${API_PRODUCTS}/${id}`, data, { headers: getAuthHeaders() }).then(res => res.data),


  delete: (id: number) =>
    axiosInstance.delete(`${API_PRODUCTS}/${id}`, { headers: getAuthHeaders() }),

 
  getPaginated: async (page: number, pageSize: number, search = '', sortBy = 'id', direction = 'asc') => {
    const res = await axiosInstance.get(`${API_PRODUCTS}/paginated`, {
      headers: getAuthHeaders(),
      params: { page, size: pageSize, search, sortBy, direction },
    });
    return { data: res.data.content || [], total: res.data.totalElements || 0 };
  },

  getPaginatedActive: async (page = 0, size = 10, search = '') => {
    const res = await axiosInstance.get(`${API_PRODUCTS}/active`, {
      headers: { 'Cache-Control': 'no-cache', ...getAuthHeaders() },
      params: { page, size, search },
    });
    return res.data || [];
  },
};

export const saleService = {
  getAll: async (): Promise<Sale[]> => {
    const res = await axiosInstance.get(API_SALES, { headers: getAuthHeaders() });
    return res.data;
  },

  add: async (sale: Partial<Sale>): Promise<Sale> => {
    const res = await axiosInstance.post(API_SALES, sale, { headers: getAuthHeaders() });
    return res.data;
  },

  getPaginated: async (
  page: number,
  size: number,
  search = '',
  sortBy = 'id',
  direction: 'asc' | 'desc' = 'asc'
) => {
  const res = await axiosInstance.get(`${API_SALES}/paginated`, {
    headers: getAuthHeaders(),
    params: { page, size, search, sortBy, direction },
  });

 
  return {
    data: res.data.data || [],
    total: res.data.total || 0
  };
},

};

export const reportService = {
  getSummary: async (): Promise<SalesReport> => {
    const res = await axiosInstance.get(`${API_REPORTS}/summary`, { headers: getAuthHeaders() });
    return res.data;
  },

  downloadCSV: async (): Promise<Blob> => {
    const res = await axiosInstance.get(`${API_REPORTS}/excel`, {
      headers: getAuthHeaders(),
      responseType: 'blob',
    });
    return res.data;
  },
};
