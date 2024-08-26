import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProductDetailsPopup = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close on backdrop click
      >
        <motion.div
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-lg w-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the backdrop
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <button onClick={onClose} className="text-gray-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4">
            {/* Product details */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover mb-4"
            />
            <p className="text-gray-400 mb-2">{product.description}</p>
            <p className="text-gray-400 mb-2">Price: ${product.price}</p>
            <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
            <p className="text-gray-400 mb-2">SKU: {product.sku}</p>
            <p className="text-gray-400 mb-2">Category: {product.category}</p>
            <p className="text-gray-400 mb-2">Rating: {product.rating}</p>
            <p className="text-gray-400 mb-2">
              Availability: {product.availabilityStatus}
            </p>
            <p className="text-gray-400 mb-2">Return Policy: {product.returnPolicy}</p>
            <p className="text-gray-400 mb-2">Shipping: {product.shippingInformation}</p>
            <p className="text-gray-400 mb-2">Warranty: {product.warrantyInformation}</p>
            <p className="text-gray-400 mb-2">Weight: {product.weight}g</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailsPopup;
