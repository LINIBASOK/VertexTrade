export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id?: number;
  productId: number;
  quantity: number;
  date: string;
}

export interface SalesReport {
  totalSales: number;
  totalProductsSold: number;
}
