import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  OrderType,
  GetOrdersParamsType,
  GetOrdersByUserIdParamsType,
  AddNewOrderParamsType,
} from '@/src/api/orders/orders.type';
import type { ProductType } from '@/src/api/product/product.type';
import type { User } from '@/src/store/auth/auth.type'; // For user details
import { useProductStore } from '@/src/store/product/product.store'; // To get product details for price calculation
import { useAuthStore } from '@/src/store/auth/auth.store';     // To get user details

// Minimal Sample User for Orders (adapt from User type)
const sampleUser1: User = { id: 'user1', firstname: 'John', lastname: 'Doe', username: 'john.doe', phoneNumber: '123-456-7890', address: '123 Main St', type: 'USER', password: 'password' };
const sampleUser2: User = { id: 'user2', firstname: 'Jane', lastname: 'Smith', username: 'jane.smith', phoneNumber: '987-654-3210', address: '456 Oak Ave', type: 'USER', password: 'password' };

// Sample Products (minimal, ideally use ProductType structure)
const sampleOrderProduct1: ProductType = { _id: 'prod1', name: 'Smartphone X', price: 699, discountPercentage: 10, priceAfterDiscount: 629.10, quantity: 10, category: {} as any, subcategory: {} as any, brand: 'BrandA', description: 'desc', thumbnail: 'thumb.jpg', images: [], slugname: 'smartphone-x' };
const sampleOrderProduct2: ProductType = { _id: 'prod2', name: 'Laptop Pro', price: 1299, discountPercentage: 15, priceAfterDiscount: 1104.15, quantity: 5, category: {} as any, subcategory: {} as any, brand: 'BrandB', description: 'desc', thumbnail: 'thumb.jpg', images: [], slugname: 'laptop-pro' };


const sampleOrdersData: OrderType[] = [
  {
    _id: 'order1',
    user: { ...sampleUser1, _id: sampleUser1.id, __v: 0, role: sampleUser1.type, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    products: [
      { product: sampleOrderProduct1, count: 1, _id: 'item1_order1' },
      { product: sampleOrderProduct2, count: 1, _id: 'item2_order1' },
    ],
    totalPrice: (sampleOrderProduct1.priceAfterDiscount * 1) + (sampleOrderProduct2.priceAfterDiscount * 1),
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryStatus: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'order2',
    user: { ...sampleUser2, _id: sampleUser2.id, __v: 0, role: sampleUser2.type, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    products: [ { product: sampleOrderProduct1, count: 2, _id: 'item1_order2' } ],
    totalPrice: sampleOrderProduct1.priceAfterDiscount * 2,
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryStatus: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export interface OrderState {
  allOrders: OrderType[]; // Master list of all orders
  displayedOrders: OrderType[]; // For views needing all orders with pagination/filters
  userOrders: OrderType[];   // Orders for a specific user
  currentOrder: OrderType | null;
  loading: boolean;
  error: string | null;
  currentPage: number; // For displayedOrders pagination
  totalPages: number;  // For displayedOrders pagination
  totalOrders: number; // Count for displayedOrders
  fetchAllOrders: (params?: GetOrdersParamsType) => void;
  fetchOrderById: (orderId: string) => void;
  fetchOrdersByUserId: (userId: string, params?: GetOrdersByUserIdParamsType) => void;
  addOrder: (orderData: AddNewOrderParamsType) => OrderType | null; // Returns created order or null
  updateOrderStatus: (orderId: string, data: Partial<OrderType>) => OrderType | null; // Returns updated order or null
}

const initialState: Omit< OrderState, 'fetchAllOrders' | 'fetchOrderById' | 'fetchOrdersByUserId' | 'addOrder' | 'updateOrderStatus'> = {
  allOrders: sampleOrdersData,
  displayedOrders: [],
  userOrders: [],
  currentOrder: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalOrders: 0,
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchAllOrders: (params?: GetOrdersParamsType) => {
        set({ loading: true, error: null });
        let ordersToDisplay = [...get().allOrders];
        // Basic filtering example (by deliveryStatus)
        if (params?.deliveryStatus !== undefined) {
          const status = typeof params.deliveryStatus === 'string' ? params.deliveryStatus === 'true' : params.deliveryStatus;
          ordersToDisplay = ordersToDisplay.filter(order => order.deliveryStatus === status);
        }
        // Basic sorting example (by deliveryDate)
        if (params?.sort === 'deliveryDate-asc') {
          ordersToDisplay.sort((a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime());
        } else if (params?.sort === 'deliveryDate-desc') {
          ordersToDisplay.sort((a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime());
        }

        const total = ordersToDisplay.length;
        // const limit = params?.limit || 15; // Assuming limit from GetOrdersParamsType or a default
        const limit = 15; // Hardcoding for now as GetOrdersParamsType doesn't have limit
        const pages = Math.ceil(total / limit);
        const page = params?.page || 1;
        const currentPageClamped = Math.max(1, Math.min(page, pages || 1));
        const paginatedItems = ordersToDisplay.slice((currentPageClamped - 1) * limit, currentPageClamped * limit);

        set({
          displayedOrders: paginatedItems,
          currentPage: currentPageClamped,
          totalPages: pages,
          totalOrders: total,
          loading: false
        });
      },

      fetchOrderById: (orderId: string) => {
        set({ loading: true, error: null });
        const order = get().allOrders.find(o => o._id === orderId);
        set({ currentOrder: order || null, loading: false });
      },

      fetchOrdersByUserId: (userId: string, params?: GetOrdersByUserIdParamsType) => {
        set({ loading: true, error: null });
        let userSpecificOrders = get().allOrders.filter(o => o.user._id === userId);
        if (params?.sort === 'deliveryDate-asc') {
          userSpecificOrders.sort((a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime());
        } else if (params?.sort === 'deliveryDate-desc') {
          userSpecificOrders.sort((a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime());
        }
        set({ userOrders: userSpecificOrders, loading: false });
      },

      addOrder: (orderData: AddNewOrderParamsType) => {
        set({ loading: true, error: null });
        const productStoreState = useProductStore.getState();
        const authStoreState = useAuthStore.getState();

        const userDetail = authStoreState.currentUser?.id === orderData.user ?
                           authStoreState.currentUser :
                           authStoreState.getUsers(1, authStoreState.getUsers().total).users.find(u => u.id === orderData.user);

        if (!userDetail) {
          set({ error: 'User not found for order', loading: false });
          return null;
        }

        const userForOrder: OrderType['user'] = {
            _id: userDetail.id,
            firstname: userDetail.firstname,
            lastname: userDetail.lastname,
            username: userDetail.username,
            phoneNumber: userDetail.phoneNumber,
            address: userDetail.address,
            role: userDetail.type, // Assuming 'type' maps to 'role'
            createdAt: new Date().toISOString(), // Mocked
            updatedAt: new Date().toISOString(), // Mocked
            __v: 0 // Mocked
        };

        let calculatedTotalPrice = 0;
        const productItemsForOrder: OrderType['products'] = orderData.products.map((item, index) => {
          const productDetail = productStoreState.products.find(p => p._id === item.product);
          if (!productDetail) {
            throw new Error(`Product with ID ${item.product} not found for order.`);
          }
          calculatedTotalPrice += (productDetail.priceAfterDiscount || productDetail.price) * item.count;
          return {
            product: productDetail, // Embed full product detail
            count: item.count,
            _id: `item${index}_${Date.now()}` // Generate item ID
          };
        });

        const newOrder: OrderType = {
          _id: `order_${Date.now()}`,
          user: userForOrder,
          products: productItemsForOrder,
          totalPrice: calculatedTotalPrice,
          deliveryDate: orderData.deliveryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default 7 days
          deliveryStatus: orderData.deliveryStatus || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          allOrders: [...state.allOrders, newOrder],
          loading: false,
        }));
        return newOrder;
      },

      updateOrderStatus: (orderId: string, data: Partial<OrderType>) => {
        set({ loading: true, error: null });
        let updatedOrder: OrderType | null = null;
        set(state => {
          const newAllOrders = state.allOrders.map(o => {
            if (o._id === orderId) {
              updatedOrder = { ...o, ...data, updatedAt: new Date().toISOString() };
              return updatedOrder;
            }
            return o;
          });
          return {
            allOrders: newAllOrders,
            currentOrder: state.currentOrder?._id === orderId ? updatedOrder : state.currentOrder,
            userOrders: state.userOrders.map(uo => uo._id === orderId && updatedOrder ? updatedOrder : uo),
            displayedOrders: state.displayedOrders.map(do => do._id === orderId && updatedOrder ? updatedOrder : do),
            loading: false,
          };
        });
        return updatedOrder;
      },
    }),
    {
      name: 'order-store',
      partialize: (state) => ({
         allOrders: state.allOrders, // Persist only the master list of orders
         // Other dynamic parts like userOrders, currentOrder, displayedOrders, pagination will be re-derived
      }),
    }
  )
);
