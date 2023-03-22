import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ProductSquareItem } from "../components/ProductSquareItem";
import { RootState } from "../store";
import { IProduct } from "../store/products/products.types";

export const Products = () => {
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  // const [currentMaterials, setCurrentMaterials] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector(
    (state: RootState) => state.products.filters.categories
  );
  const materials = useSelector(
    (state: RootState) => state.products.filters.materials
  );
  useEffect(() => {
    setFilteredProducts(filterProducts(products));
  }, [products, currentCategories]);
  const toggleCategory = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string,
    index: number
  ): void => {
    let newCategories = [...currentCategories];
    if (event.target.checked) {
      newCategories.push(categories[index]);
    } else {
      newCategories = newCategories.filter(
        (c) => c.localeCompare(category) !== 0
      );
    }
    setCurrentCategories(newCategories);
    console.log(newCategories);
  };
  const filterProducts = (products: IProduct[]): IProduct[] => {
    if (currentCategories.length === 0) return products;
    return products.filter((product) =>
      currentCategories.some(
        (category) => category.localeCompare(product.category) === 0
      )
    );
  };
  return (
    <>
      <Navbar />
      <div className="d-flex flex-row">
        <div>
          <h6>Categorias</h6>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  value={index}
                  onChange={(event) => toggleCategory(event, category, index)}
                />
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Materiais</h6>
          <ul>
            {materials.map((material, index) => (
              <li key={index}>
                <input type="checkbox" value={index} />
                <span>{material}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="d-flex flex-row flex-wrap list-group justify-content-center">
          {filteredProducts.map((product) => (
            <ProductSquareItem key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  );
};
