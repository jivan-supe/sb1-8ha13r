import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import AddProductModal from '../product/AddProductModal';

export default function ProductDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { products } = useProducts();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
      >
        <span>Products</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                  >
                    {product.name}
                  </button>
                ))}
                <div className="border-t my-1" />
              </>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No products found</div>
            )}
            
            <button
              onClick={() => {
                setShowModal(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-4 py-2 text-left text-indigo-600 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      )}

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}