export interface IProduct {
  supplier: string;
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountValue: number;
  category: string;
  material: string;
  cart: boolean;
  cartQuantity: number;
}
export interface IFilters {
  categories: string[];
  materials: string[];
}
export interface IProductLocalStorage {
  supplier: string;
  id: string;
  cartQuantity: number;
}
export const LOCAL_STORAGE_CART_KEY_NAME: string = "e-commerce:cart";
export interface IProductsState {
  products: IProduct[];
  filters: IFilters;
}
