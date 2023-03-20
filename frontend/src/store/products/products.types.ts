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
export interface IProducts {
  products: IProduct[];
}

export interface IProductsState {
  data: IProducts;
}
