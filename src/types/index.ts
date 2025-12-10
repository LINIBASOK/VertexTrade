import { ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
    active?: boolean;
}

export interface Sale {
  id: number;
  productId?: number;
  product: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  quantity: number;
  totalAmount: number;
  date: string;
}

export interface SalesReport {
  totalOrders: ReactNode;
  salesTrend: any[] | undefined;
  totalSales: number;
  totalProductsSold: number;
}
