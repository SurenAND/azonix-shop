import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CategoryType,
  SubCategoryType,
  GetCategoriesParamsType,
  GetSubCategoriesParamsType,
} from '@/src/api/category/category.type'; // Keep types

// Sample Data
const sampleCategoriesData: CategoryType[] = [
  { _id: 'cat1', name: 'Electronics', icon: 'icon-electronics', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'electronics', __v: 0 },
  { _id: 'cat2', name: 'Books', icon: 'icon-books', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'books', __v: 0 },
  { _id: 'cat3', name: 'Clothing', icon: 'icon-clothing', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'clothing', __v: 0 },
];

const sampleSubCategoriesData: SubCategoryType[] = [
  { _id: 'subcat1_1', category: 'cat1', name: 'Mobile Phones', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'mobile-phones', __v: 0 },
  { _id: 'subcat1_2', category: 'cat1', name: 'Laptops', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'laptops', __v: 0 },
  { _id: 'subcat1_3', category: 'cat1', name: 'Cameras', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'cameras', __v: 0 },
  { _id: 'subcat2_1', category: 'cat2', name: 'Fiction', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'fiction', __v: 0 },
  { _id: 'subcat2_2', category: 'cat2', name: 'Science', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'science', __v: 0 },
  { _id: 'subcat3_1', category: 'cat3', name: 'Men\'s Apparel', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'mens-apparel', __v: 0 },
  { _id: 'subcat3_2', category: 'cat3', name: 'Women\'s Apparel', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), slugname: 'womens-apparel', __v: 0 },
];

export interface CategoryState {
  categories: CategoryType[]; // Holds all categories, or filtered categories based on fetchAllCategories params
  allSampleCategories: CategoryType[]; // Persisted original sample categories
  currentCategorySubcategories: SubCategoryType[];
  allSampleSubcategories: SubCategoryType[]; // Persisted original sample subcategories
  loading: boolean;
  error: string | null;
  fetchAllCategories: (params?: GetCategoriesParamsType) => void;
  fetchSubcategoriesByCategory: (params: GetSubCategoriesParamsType) => void;
  addCategory: (categoryData: Omit<CategoryType, '_id' | 'slugname' | 'createdAt' | 'updatedAt' | '__v'>) => void;
  updateCategory: (categoryId: string, categoryData: Partial<Omit<CategoryType, '_id' | 'slugname' | 'createdAt' | 'updatedAt' | '__v'>>) => void;
  deleteCategory: (categoryId: string) => void;
}

// Helper to generate slugs (basic version)
const generateCategorySlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


const initialState: Omit<
  CategoryState,
  | 'fetchAllCategories'
  | 'fetchSubcategoriesByCategory'
  | 'addCategory'
  | 'updateCategory'
  | 'deleteCategory'
> = {
  categories: sampleCategoriesData,
  allSampleCategories: sampleCategoriesData,
  currentCategorySubcategories: [],
  allSampleSubcategories: sampleSubCategoriesData,
  loading: false,
  error: null,
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchAllCategories: (params?: GetCategoriesParamsType) => {
        set({ loading: true, error: null });
        const allCategoriesSource = get().allSampleCategories; // Source of truth for all categories
        let processedCategories = [...allCategoriesSource]; // Make a copy to work with

        if (params?.slugname) {
          processedCategories = allCategoriesSource.filter(c => c.slugname === params.slugname);
        }
        // If no params, `categories` will be set to all sample categories.
        // If slugname is provided, `categories` will be the filtered list.
        set({ categories: processedCategories, loading: false });
      },

      fetchSubcategoriesByCategory: (params: GetSubCategoriesParamsType) => {
        set({ loading: true, error: null });
        const allSubcategories = get().allSampleSubcategories;
        let filteredSubcategories: SubCategoryType[] = [];

        if (params.category) { // category is categoryId
          filteredSubcategories = allSubcategories.filter(sc => sc.category === params.category);
        }
        set({ currentCategorySubcategories: filteredSubcategories, loading: false });
      },

      addCategory: (categoryData) => {
        const newCategory: CategoryType = {
          _id: `cat_${Date.now()}`,
          slugname: generateCategorySlug(categoryData.name),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
          ...categoryData,
        };
        set(state => ({
          allSampleCategories: [...state.allSampleCategories, newCategory],
          categories: [...state.allSampleCategories, newCategory], // Also update the main view list
        }));
      },

      updateCategory: (categoryId, categoryData) => {
        set(state => {
          const updatedCategories = state.allSampleCategories.map(cat => {
            if (cat._id === categoryId) {
              const newName = categoryData.name || cat.name;
              return {
                ...cat,
                ...categoryData,
                slugname: generateCategorySlug(newName),
                updatedAt: new Date().toISOString(),
              };
            }
            return cat;
          });
          return {
            allSampleCategories: updatedCategories,
            categories: updatedCategories, // Also update the main view list
          };
        });
      },

      deleteCategory: (categoryId: string) => {
        set(state => {
          const remainingCategories = state.allSampleCategories.filter(cat => cat._id !== categoryId);
          const remainingSubcategories = state.allSampleSubcategories.filter(subcat => subcat.category !== categoryId);
          return {
            allSampleCategories: remainingCategories,
            categories: remainingCategories, // Also update the main view list
            allSampleSubcategories: remainingSubcategories,
            currentCategorySubcategories: state.currentCategorySubcategories.filter(subcat => subcat.category !== categoryId),
          };
        });
      }
    }),
    {
      name: 'category-store',
      partialize: (state) => ({
        // Persist allSampleCategories and allSampleSubcategories
        // categories and currentCategorySubcategories are derived/view states,
        // but persisting them can be fine for simple cases or to retain last view.
        // Let's persist them to keep the last filtered view.
        categories: state.categories,
        currentCategorySubcategories: state.currentCategorySubcategories,
        allSampleCategories: state.allSampleCategories,
        allSampleSubcategories: state.allSampleSubcategories,
      }),
    }
  )
);
