export interface ICurrentProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountValue: number;
  category: string;
  material: string;
}

export interface ICurrentProductState {
  data: ICurrentProduct;
  showProduct: boolean;
}
