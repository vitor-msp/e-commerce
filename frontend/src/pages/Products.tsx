import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ProductSquareItem } from "../components/ProductSquareItem";
import { RootState } from "../store";
import { IProduct } from "../store/products/products.types";

export const Products = () => {
  const [currentName, setCurrentName] = useState<string>("");
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(1000);
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [currentMaterials, setCurrentMaterials] = useState<string[]>([]);
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
  }, [
    products,
    currentName,
    currentMaxPrice,
    currentCategories,
    currentMaterials,
  ]);

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
  };

  const toggleMaterial = (
    event: React.ChangeEvent<HTMLInputElement>,
    material: string,
    index: number
  ): void => {
    let newMaterials = [...currentMaterials];
    if (event.target.checked) {
      newMaterials.push(materials[index]);
    } else {
      newMaterials = newMaterials.filter(
        (m) => m.localeCompare(material) !== 0
      );
    }
    setCurrentMaterials(newMaterials);
  };

  const filterProducts = (products: IProduct[]): IProduct[] => {
    return filterMaterials(
      filterCategories(filterMaxPrice(filterName(products)))
    );
  };

  const filterName = (products: IProduct[]): IProduct[] => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(currentName.toLowerCase())
    );
  };

  const filterMaxPrice = (products: IProduct[]): IProduct[] => {
    return products.filter(
      ({ price, discountValue }) =>
        price * (1 - discountValue) <= currentMaxPrice
    );
  };

  const filterCategories = (products: IProduct[]): IProduct[] => {
    if (currentCategories.length === 0) return products;
    return products.filter((product) =>
      currentCategories.some(
        (category) => category.localeCompare(product.category) === 0
      )
    );
  };

  const filterMaterials = (products: IProduct[]): IProduct[] => {
    if (currentMaterials.length === 0) return products;
    return products.filter((product) =>
      currentMaterials.some(
        (material) => material.localeCompare(product.material) === 0
      )
    );
  };

  const changeName = (event: any): void => {
    setCurrentName(event.target.value);
  };

  const changePrice = (event: any): void => {
    setCurrentMaxPrice(+event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
          <div>
            <label htmlFor="">Preço máximo:</label>
            <span>R$ {currentMaxPrice}</span>
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={currentMaxPrice}
              onChange={changePrice}
            />
          </div>
          <div className="d-flex flex-row">
            <div>
              <h6>Categorias</h6>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      value={index}
                      onChange={(event) =>
                        toggleCategory(event, category, index)
                      }
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
                    <input
                      type="checkbox"
                      value={index}
                      onChange={(event) =>
                        toggleMaterial(event, material, index)
                      }
                    />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div>
            <label htmlFor="">Nome</label>
            <input type="text" value={currentName} onChange={changeName} />
          </div>
          <ul className="d-flex flex-row flex-wrap list-group justify-content-center">
            {filteredProducts.map((product) => (
              <ProductSquareItem key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
