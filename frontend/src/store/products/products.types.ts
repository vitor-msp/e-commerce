export interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountValue: number;
  category: string;
  material: string;
}
export interface IFilters {
  categories: string[];
  materials: string[];
}

export interface IProductsState {
  products: IProduct[];
  filters: IFilters;
}
