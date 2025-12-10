
import { useState, useEffect } from 'react';
import { Sale, Product } from '../types';
import '../styles/modal.scss';
import { X } from 'lucide-react';

interface SaleModalProps {
  products: Product[];
  onSave: (sale: Sale) => void;
  onClose: () => void;
}

export default function SaleModal({ products, onSave, onClose }: SaleModalProps) {
  const initialProduct = products.length > 0 ? products[0] : { id: 0, name: '', price: 0, quantity: 0 };

  const [formData, setFormData] = useState<Sale>({
    id: 0,
    productId: initialProduct.id,
    product: initialProduct,
    quantity: 1,
    date: new Date().toISOString().split('T')[0],
    totalAmount: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (products.length > 0 && !products.find(p => p.id === formData.productId)) {
      setFormData(prev => ({ ...prev, productId: products[0].id || 0 }));
    }
  }, [products]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const selectedProduct = products.find(p => p.id === formData.productId);

    if (!formData.productId) newErrors.productId = 'Please select a product';
    if (formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!formData.date) newErrors.date = 'Date is required';
    if (selectedProduct && formData.quantity > selectedProduct.quantity)
      newErrors.quantity = `Quantity exceeds available stock (${selectedProduct.quantity})`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'productId' ? parseInt(value) || 0 : value,
    }));
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const selectedProduct = products.find(p => p.id === formData.productId);
  const totalPrice = selectedProduct ? selectedProduct.price * formData.quantity : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Sale</h3>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="productId">Product *</label>
           <select
  id="productName"
  name="product"
  value={formData.product.name} 
  onChange={(e) => {
    const selectedProduct = products.find(p => p.name === e.target.value);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        product: selectedProduct 
      }));
    }
  }}
  className={errors.productId ? 'error' : ''}
>
  <option value="">Select a product</option>
  {products.map(p => (
    <option key={p.id} value={p.name}>
      {p.name} (${p.price.toFixed(2)})
    </option>
  ))}
</select>

            {errors.productId && <span className="error-message">{errors.productId}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input id="quantity" type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min={1} className={errors.quantity ? 'error' : ''} />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input id="date" type="date" name="date" value={formData.date} onChange={handleInputChange} className={errors.date ? 'error' : ''} />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="summary-box">
            <div className="summary-row">
              <span>Unit Price:</span>
              <span className="price">${selectedProduct?.price.toFixed(2) || '0.00'}</span>
            </div>
            <div className="summary-row">
              <span>Quantity:</span>
              <span>{formData.quantity}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span className="price">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Sale</button>
          </div>
        </form>
      </div>
    </div>
  );
}
