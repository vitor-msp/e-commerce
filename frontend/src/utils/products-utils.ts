import { IProduct } from "../store/products/products.types";

export const getCategoriesFromProducts = (products: IProduct[]): string[] => {
  const categories = new Set<string>();
  products.forEach((product) => categories.add(product.category));
  return Array.from(categories.values());
};

export const getMaterialsFromProducts = (products: IProduct[]): string[] => {
  const materials = new Set<string>();
  products.forEach((product) => materials.add(product.material));
  return Array.from(materials.values());
};
