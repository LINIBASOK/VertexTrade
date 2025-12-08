import { useState, useEffect } from 'react';
import { Sale, Product } from '../types';
import { saleService, productService } from '../services/api';
import SaleModal from './SaleModal';
import '../styles/sales.scss';
import { Plus } from 'lucide-react';

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [salesData, productsData] = await Promise.all([
        saleService.getAll(),
        productService.getAll(),
      ]);
      setSales(salesData);
      setProducts(productsData);
    } catch (err) {
      setError('Failed to load data. Make sure the backend is running on http://localhost:8080');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (sale: Sale) => {
    try {
      await saleService.add(sale);
      await loadData();
      setShowModal(false);
    } catch (err) {
      setError('Failed to create sale');
      console.error('Error creating sale:', err);
    }
  };

  const getProductName = (productId: number): string => {
    const product = products.find((p) => p.id === productId);
    return product?.name || `Product #${productId}`;
  };

  const getProductPrice = (productId: number): number => {
    const product = products.find((p) => p.id === productId);
    return product?.price || 0;
  };

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h2>Sales</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Create Sale
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading sales...</p>
        </div>
      ) : sales.length === 0 ? (
        <div className="empty-state">
          <p>No sales found</p>
          <p className="empty-text">Click "Create Sale" to add a new sale</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => {
                const price = getProductPrice(sale.productId);
                const total = price * sale.quantity;
                return (
                  <tr key={sale.id}>
                    <td>{sale.id}</td>
                    <td className="name-cell">{getProductName(sale.productId)}</td>
                    <td>{sale.quantity}</td>
                    <td>${price.toFixed(2)}</td>
                    <td className="total-cell">${total.toFixed(2)}</td>
                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <SaleModal
          products={products}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
