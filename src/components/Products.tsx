
import { useRef, useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Product } from "../types";
import ProductModal from "./ProductModal";
import DataTable, { DataTableRef } from "./DataTable";
import { productService } from "../services/api";
import "../styles/products.scss";

interface ProductsProps {
  search?: string;
}

export default function Products({ search = "" }: ProductsProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const tableRef = useRef<DataTableRef>(null);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Delete product?")) return;

    try {
      await productService.delete(id);
      tableRef.current?.reload();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const columns = [
    { key: "sno", label: "S.No" },
    { key: "name", label: "Name" },
    {
      key: "price",
      label: "Price",
      render: (p: Product) => `$${p.price.toFixed(2)}`,
    },
    { key: "quantity", label: "Quantity" },
    {
      key: "actions",
      label: "Actions",
      render: (p: Product) => (
        <>
          <button className="edit-delete edit" onClick={() => handleEditClick(p)}>
            <Edit2 size={18} />
          </button>
          <button className="edit-delete delete" onClick={() => handleDelete(p.id)}>
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    tableRef.current?.reload();
  }, [search]);

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Products</h2>
        <button className="btn-primary" onClick={handleAddClick}>
          <Plus size={20} /> Add Product
        </button>
      </div>

      <DataTable
        ref={tableRef}
        columns={columns}
        fetchData={async (page, pageSize) => {
          
          const res = await productService.getPaginated(page, pageSize, search);
          const activeProducts = res.data.filter((p: Product) => p.active !== false);
          return { data: activeProducts, total: activeProducts.length };
        }}
        initialPageSize={10}
      />

      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSave={async (data) => {
            if ("id" in data) {
              await productService.update(data.id, data as Product);
            } else {
              await productService.add(data as Omit<Product, "id">);
            }
            setShowModal(false);
            tableRef.current?.reload();
          }}
        />
      )}
    </div>
  );
}

