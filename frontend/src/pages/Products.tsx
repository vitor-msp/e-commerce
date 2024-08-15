import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ProductSquareItem } from "../components/ProductSquareItem";
import { RootState } from "../store";
import { IProduct } from "../store/products/products.types";

export const Products = () => {
  const MAX_PRICE_TO_SHOW = 100;
  const [currentName, setCurrentName] = useState<string>("");
  const [currentMaxPrice, setCurrentMaxPrice] =
    useState<number>(MAX_PRICE_TO_SHOW);
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
      <div className="d-flex flex-row px-4">
        <div className="d-flex flex-column px-2">
          <div className="d-flex flex-column align-items-center">
            <div>
              <label htmlFor="max-price">Preço máximo:</label>
              <span className="mx-2 fw-bold">R$ {currentMaxPrice}</span>
            </div>
            <input
              type="range"
              id="max-price"
              min={5}
              max={MAX_PRICE_TO_SHOW}
              step={5}
              value={currentMaxPrice}
              onChange={changePrice}
              className="w-100"
            />
          </div>
          <div className="d-flex flex-row my-2">
            <div className="d-flex flex-column align-items-center">
              <h6>Categorias</h6>
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="list-group-item d-flex flex-row">
                    <input
                      type="checkbox"
                      value={index}
                      onChange={(event) =>
                        toggleCategory(event, category, index)
                      }
                    />
                    <span className="mx-1">{category}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h6>Materiais</h6>
              <ul className="">
                {materials.map((material, index) => (
                  <li key={index} className="list-group-item d-flex flex-row">
                    <input
                      type="checkbox"
                      value={index}
                      onChange={(event) =>
                        toggleMaterial(event, material, index)
                      }
                    />
                    <span className="mx-1">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex d-row justify-content-center align-items-center">
            <label htmlFor="produto">Produto: </label>
            <input
              type="text"
              id="produto"
              className="form-control mx-2 w-100"
              value={currentName}
              onChange={changeName}
              placeholder="Digite o nome do produto buscado..."
            />
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
