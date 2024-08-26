import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
export const useStore = create((set, get) => ({
  products: [],
  cart: [],
  search: '',
  sortOrder: '',
  sortBy: 'price',
  page: 1,
  hasMore: true,
  loading: false,
  user: null, 
  total:0,
  
  setSearch: (search) => set({ search }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSortBy: (sortBy) => set({ sortBy }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setLoading: (loading) => set({ loading }),
  fetchCart: async ()=>{
    try {
      const response = await axios.get(API_URL+'/api/cart', { withCredentials: true });
      const {calculateTotal} =get();
      set({ cart: response.data });
      
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  },
  fetchProducts: async () => {
    const { page, sortBy, sortOrder, search, loading, products } = get();
    if (loading) return;

    set({ loading: true });
    try {
      const limit = 12;
      const skip = (page - 1) * limit;
      console.log(skip+"skip",page);
      let url = 'https://dummyjson.com/products';

      if (search) {
        url += `/search?q=${encodeURIComponent(search)}`;
      }

      const queryParams = new URLSearchParams({
        limit,
        skip,
        sortBy,
        order: sortOrder,
      }).toString();

      url += (search ? `&${queryParams}` : `?${queryParams}`);
      console.log(url)
      const response = await axios.get(url,{ withCredentials: false });
      console.log(response);
      const data = response.data;
      console.log("Fetched products:", data);

      if (data.products.length < limit) {
        set({ hasMore: false });
      }
      console.log("Fetched products:", data);
      
      set({
        products: page === 1 ? data.products : [
          ...products.filter(p => !data.products.some(dp => dp.id === p.id)),
          ...data.products,
        ],
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product) => {
    const { cart, user,calculateTotal } = get();

    const existingProduct = cart.find((item) => item.id === product.id);

    const updatedCart = existingProduct
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    set({ cart: updatedCart });
    calculateTotal(updatedCart);

    try {
      await axios.post(API_URL+'/api/cart/add/', {
        productId: product.id,
        quantity: 1,
        userId: user,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },

  updateCartQuantity: async (id, increment) => {
    const { cart } = get();
    const {calculateTotal} =get();
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max((item.quantity || 1) + increment, 1),
          }
        : item
    );

    set({ cart: updatedCart });
    calculateTotal(updatedCart);

    try {
      await axios.post(API_URL+'/api/cart/add', {
        productId: id,
        quantity: increment,
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  },
removeCartItem: async (id) => {
    try {
      await axios.delete(API_URL+`/api/cart/remove/${id}`);
      const { cart,calculateTotal } = get();
      const updatedCart = cart.filter((item) => item.id !== id);
      set({ cart: updatedCart });
      calculateTotal(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  },
  calculateTotal : (items) => {
    console.log('Calculating total')
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    set({total: totalAmount});
  },

}));

export default useStore;
