import { useState, useEffect, useRef } from 'react';
import { Sale, Product } from '../types';
import SaleModal from './SaleModal';
import DataTable, { Column, DataTableRef } from './DataTable';
import { Plus } from 'lucide-react';
import { saleService, productService } from '../services/api';
import '../styles/sales.scss';

interface SalesProps {
  search?: string;
}

export default function Sales({ search = '' }: SalesProps) {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const tableRef = useRef<DataTableRef>(null);


  useEffect(() => {
    productService.getPaginatedActive(0, 1000, "")
      .then(productsArray => {
        setProducts(productsArray); 
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

 
  const columns: Column<Sale>[] = [
    { 
      key: 'sno', 
      label: 'S.No', 
      render: (_: Sale, index?: number) => index !== undefined ? index + 1 : '-' 
    },
    { 
      key: 'product', 
      label: 'Product', 
      render: (s: Sale) => s.product?.name || 'Deleted Product' 
    },
    { key: 'quantity', label: 'Quantity' },
    { 
      key: 'totalAmount', 
      label: 'Total Amount', 
      render: (s: Sale) => `$${s.totalAmount?.toFixed(2) || 0}`
    },
    { key: 'date', label: 'Date' }
  ];

  
  useEffect(() => {
    tableRef.current?.reload();
  }, [search]);

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h2>Sales</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Add Sale
        </button>
      </div>

      <DataTable
        ref={tableRef}
        columns={columns}
        fetchData={async (page, pageSize) => {
          try {
            const res = await saleService.getPaginated(page, pageSize, search);
        
            const salesArray = Array.isArray(res) ? res : res.data || [];

            return {
              data: salesArray,
              total: Array.isArray(res) ? salesArray.length : res.total || salesArray.length
            };
          } catch (err) {
            console.error("Failed to fetch sales:", err);
            return { data: [], total: 0 };
          }
        }}
        initialPageSize={10}
      />

      {showModal && (
        <SaleModal
          products={products}
          onClose={() => setShowModal(false)}
          onSave={async (sale :Partial<Sale>) => { 
            await saleService.add( sale ); 
            setShowModal(false);
            tableRef.current?.reload();  
          }}
        />
      )}
    </div>
  );
}
