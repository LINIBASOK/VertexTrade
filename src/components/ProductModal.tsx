import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Product } from "../types";
import "../styles/modal.scss";

interface ProductModalProps {
  product: Product | null;
  onSave: (data: Product | Omit<Product, "id">) => Promise<void>;
  onClose: () => void;
}

export default function ProductModal({ product, onSave, onClose }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({ name: "", price: 0, quantity: 0 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) setFormData(product);
    else setFormData({ name: "", price: 0, quantity: 0 });
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!(formData.name?.trim())) newErrors.name = "Product name is required";
    if ((formData.price ?? 0) <= 0) newErrors.price = "Price must be greater than 0";
    if ((formData.quantity ?? 0) < 0) newErrors.quantity = "Quantity cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = product
      ? { ...formData, id: product.id } as Product
      : { name: formData.name!, price: formData.price!, quantity: formData.quantity! };

    await onSave(payload);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "name" ? value : parseFloat(value) || 0 }));
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{product ? "Edit Product" : "Add New Product"}</h3>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name ?? ""}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price ?? 0}
                onChange={handleInputChange}
                step={0.01}
                min={0}
                className={errors.price ? "error" : ""}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={formData.quantity ?? 0}
                onChange={handleInputChange}
                min={0}
                className={errors.quantity ? "error" : ""}
              />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{product ? "Update" : "Add"} Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
