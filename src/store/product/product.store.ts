import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductType as Product, GetProductsParamsType } from '@/src/api/product/product.type';

// Helper to generate slugs (basic version)
const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// Sample Data
const sampleCategory1 = { _id: 'cat1', name: 'Electronics', icon: 'icon-electronics', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'electronics', __v: 0 };
const sampleCategory2 = { _id: 'cat2', name: 'Books', icon: 'icon-books', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'books', __v: 0 };
const sampleSubCategory1_1 = { _id: 'subcat1_1', category: 'cat1', name: 'Mobile Phones', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'mobile-phones', __v: 0 };
const sampleSubCategory1_2 = { _id: 'subcat1_2', category: 'cat1', name: 'Laptops', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'laptops', __v: 0 };
const sampleSubCategory2_1 = { _id: 'subcat2_1', category: 'cat2', name: 'Fiction', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'fiction', __v: 0 };

const sampleProductsData: Product[] = [
  { _id: 'prod1', name: 'Smartphone X', price: 699, discountPercentage: 10, priceAfterDiscount: 629.10, quantity: 50, brand: 'BrandA', description: 'Latest smartphone with advanced features.', thumbnail: 'thumb_smartphone_x.jpg', images: ['img1_smartphone_x.jpg', 'img2_smartphone_x.jpg'], category: sampleCategory1, subcategory: sampleSubCategory1_1, slugname: 'smartphone-x' },
  { _id: 'prod2', name: 'Laptop Pro', price: 1299, discountPercentage: 15, priceAfterDiscount: 1104.15, quantity: 30, brand: 'BrandB', description: 'Powerful laptop for professionals.', thumbnail: 'thumb_laptop_pro.jpg', images: ['img1_laptop_pro.jpg'], category: sampleCategory1, subcategory: sampleSubCategory1_2, slugname: 'laptop-pro' },
  { _id: 'prod3', name: 'The Great Novel', price: 29, discountPercentage: 5, priceAfterDiscount: 27.55, quantity: 100, brand: 'PublisherC', description: 'A captivating novel.', thumbnail: 'thumb_great_novel.jpg', images: ['img1_great_novel.jpg'], category: sampleCategory2, subcategory: sampleSubCategory2_1, slugname: 'the-great-novel' },
  { _id: 'prod4', name: 'Budget Phone', price: 199, discountPercentage: 0, priceAfterDiscount: 199.00, quantity: 75, brand: 'BrandA', description: 'Affordable and reliable smartphone.', thumbnail: 'thumb_budget_phone.jpg', images: ['img1_budget_phone.jpg'], category: sampleCategory1, subcategory: sampleSubCategory1_1, slugname: 'budget-phone' },
  { _id: 'prod5', name: 'Gaming Laptop', price: 1599, discountPercentage: 5, priceAfterDiscount: 1519.05, quantity: 20, brand: 'BrandB', description: 'High-performance gaming laptop.', thumbnail: 'thumb_gaming_laptop.jpg', images: ['img1_gaming_laptop.jpg'], category: sampleCategory1, subcategory: sampleSubCategory1_2, slugname: 'gaming-laptop' },
];

export interface ProductState {
  products: Product[]; // This will hold ALL products
  displayedProducts: Product[]; // For paginated/filtered view
  product: Product | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalProducts: number; // Total products matching current filter, not necessarily all products in store
  sampleProducts: Product[]; // Keep original sample data if needed for reset or reference
  fetchAllProducts: (params?: GetProductsParamsType) => void; // No longer async
  fetchProductById: (id: string) => void; // No longer async
  // FormData removed, using Product type directly for add/update
  addProduct: (productData: Omit<Product, '_id' | 'slugname' | 'priceAfterDiscount'>) => void;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const initialState: Omit<
  ProductState,
  | 'fetchAllProducts'
  | 'fetchProductById'
  | 'addProduct'
  | 'updateProduct'
  | 'deleteProduct'
> = {
  products: sampleProductsData, // Initialize with all sample products
  displayedProducts: [],
  product: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalProducts: 0,
  sampleProducts: sampleProductsData, // Store the initial sample data
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchAllProducts: (params?: GetProductsParamsType) => {
        set({ loading: true, error: null });
        let processedProducts = [...get().products]; // Start with all products from the persisted state

        // Filtering
        if (params?.category) {
          processedProducts = processedProducts.filter(p => p.category?._id === params.category);
        }
        if (params?.subcategory) {
          processedProducts = processedProducts.filter(p => p.subcategory?._id === params.subcategory);
        }
        if (params?.minPrice !== undefined) {
          processedProducts = processedProducts.filter(p => p.priceAfterDiscount >= (params.minPrice || 0));
        }
        if (params?.maxPrice !== undefined) {
          processedProducts = processedProducts.filter(p => p.priceAfterDiscount <= (params.maxPrice || Infinity));
        }

        // Sorting
        if (params?.sort) {
          switch (params.sort) {
            case 'price-asc':
              processedProducts.sort((a, b) => a.priceAfterDiscount - b.priceAfterDiscount);
              break;
            case 'price-desc':
              processedProducts.sort((a, b) => b.priceAfterDiscount - a.priceAfterDiscount);
              break;
            case 'name-asc':
              processedProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'name-desc':
              processedProducts.sort((a, b) => b.name.localeCompare(a.name));
              break;
          }
        }

        const total = processedProducts.length;
        const limit = params?.limit || 10;
        const pages = Math.ceil(total / limit);
        const page = params?.page || 1;
        const currentPageClamped = Math.max(1, Math.min(page, pages || 1)); // Ensure page is within bounds

        const paginatedItems = processedProducts.slice((currentPageClamped - 1) * limit, currentPageClamped * limit);

        set({
          displayedProducts: paginatedItems,
          currentPage: currentPageClamped,
          totalPages: pages,
          totalProducts: total,
          loading: false,
        });
      },

      fetchProductById: (id: string) => {
        set({ loading: true, error: null });
        const foundProduct = get().products.find(p => p._id === id);
        set({ product: foundProduct || null, loading: false });
      },

      addProduct: (productData) => {
        const newId = Date.now().toString();
        const slug = generateSlug(productData.name);
        const priceAfterDisc = productData.price - (productData.price * (productData.discountPercentage || 0) / 100);

        const newProduct: Product = {
          ...productData,
          _id: newId,
          slugname: slug,
          priceAfterDiscount: parseFloat(priceAfterDisc.toFixed(2)),
        };
        set(state => ({
          products: [...state.products, newProduct],
          totalProducts: state.products.length + 1 // Simple update, could be refined by fetchAllProducts
        }));
        // Optionally call fetchAllProducts to refresh displayedProducts and pagination
        // get().fetchAllProducts();
      },

      updateProduct: (productId, productData) => {
        set(state => {
          const updatedProducts = state.products.map(p => {
            if (p._id === productId) {
              const updatedP = { ...p, ...productData };
              if (productData.name) {
                updatedP.slugname = generateSlug(productData.name);
              }
              if (productData.price !== undefined || productData.discountPercentage !== undefined) {
                const price = productData.price !== undefined ? productData.price : p.price;
                const discount = productData.discountPercentage !== undefined ? productData.discountPercentage : p.discountPercentage;
                updatedP.priceAfterDiscount = parseFloat((price - (price * discount / 100)).toFixed(2));
              }
              return updatedP;
            }
            return p;
          });
          const currentProduct = state.product?._id === productId
            ? updatedProducts.find(p => p._id === productId) || null
            : state.product;
          return {
            products: updatedProducts,
            product: currentProduct,
          };
        });
        // Optionally call fetchAllProducts to refresh displayedProducts and pagination
        // get().fetchAllProducts();
      },

      deleteProduct: (id: string) => {
        set(state => ({
          products: state.products.filter(p => p._id !== id),
          product: state.product?._id === id ? null : state.product,
          totalProducts: state.products.length -1 // Simple update
        }));
        // Optionally call fetchAllProducts to refresh displayedProducts and pagination
        // get().fetchAllProducts();
      },
    }),
    {
      name: 'product-store', // name of the item in the storage (must be unique)
      // partialize: (state) => ({ products: state.products, sampleProducts: state.sampleProducts }), // Persist only these
      // For full local experience, persist most things except loading/error/single product view
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['loading', 'error', 'product'].includes(key))
        ),
    }
  )
);
