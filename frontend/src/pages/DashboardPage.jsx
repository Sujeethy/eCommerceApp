import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import useStore from "../store/useStore";
import ProductDetailsPopup from "../components/ProductDetailsPopup";

const DashboardPage = () => {
  const {
    products,
    cart,
    search,
    sortBy,
    sortOrder,
    page,
    hasMore,
    loading,
    setSearch,
    setSortOrder,
    setPage,
    fetchProducts,
    addToCart,
    updateCartQuantity,
    fetchCart,
  } = useStore();

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy, sortOrder, search, fetchProducts]);

  const handleScroll = useCallback(() => {
    const container = document.querySelector("#Content");
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
      setPage(page + 1);
    }
  }, [hasMore, loading, page, setPage]);

  useEffect(() => {
    const container = document.querySelector("#Content");
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleAddToCartClick = (event, product) => {
    event.stopPropagation(); // Prevent click from bubbling up to product container
    addToCart(product);
  };

  const handleUpdateCartQuantity = (event, productId, quantityChange) => {
    event.stopPropagation(); // Prevent click from bubbling up to product container
    updateCartQuantity(productId, quantityChange);
  };

  return (
    <div className="flex-1 p-6 z-10 overflow-y-auto" id="Content">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 rounded border border-gray-700 bg-gray-800 text-gray-100 w-full sm:w-1/2"
        />
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 rounded border border-gray-700 bg-gray-800 text-gray-100 w-full sm:w-auto"
        >
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setSelectedProduct(product)} // Set the selected product for the popup
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <div className="text-gray-400 mt-2 flex items-center justify-between">
                <p>${product.price}</p>
                <div className="flex items-center gap-2">
                  {cart.find((item) => item.id === product.id) ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleUpdateCartQuantity(e, product.id, -1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                        disabled={
                          (cart.find((item) => item.id === product.id)?.quantity || 1) <= 1
                        }
                      >
                        <Minus className="w-4 h-4 text-gray-300" />
                      </button>
                      <span className="text-gray-100">
                        {cart.find((item) => item.id === product.id)?.quantity || 1}
                      </span>
                      <button
                        onClick={(e) => handleUpdateCartQuantity(e, product.id, 1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                      >
                        <Plus className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCartClick(e, product)}
                      className="p-2 z-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {loading && (
        <p className="text-gray-400 text-center mt-4">
          Loading more products...
        </p>
      )}

      {!hasMore && (
        <p className="text-gray-400 text-center mt-4">
          No more products to display.
        </p>
      )}

      {/* Render the product details popup if a product is selected */}
      {selectedProduct && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
