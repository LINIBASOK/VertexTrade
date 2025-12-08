import axios, { AxiosInstance } from 'axios';
import { Product, Sale, SalesReport } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  add: async (product: Product): Promise<Product> => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
  },

  update: async (id: number, product: Product): Promise<Product> => {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },
};

export const saleService = {
  getAll: async (): Promise<Sale[]> => {
    const response = await axiosInstance.get('/sales');
    return response.data;
  },

  add: async (sale: Sale): Promise<Sale> => {
    const response = await axiosInstance.post('/sales', sale);
    return response.data;
  },
};

export const reportService = {
  getSummary: async (): Promise<SalesReport> => {
    const response = await axiosInstance.get('/sales-report/summary');
    return response.data;
  },

  downloadCSV: async (): Promise<Blob> => {
    const response = await axiosInstance.get('/sales-report/csv', {
      responseType: 'blob',
    });
    return response.data;
  },
};
