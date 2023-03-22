import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ProductSquareItem } from "../components/ProductSquareItem";
import { RootState } from "../store";

export const Products = () => {
  const products = useSelector(
    (state: RootState) => state.products.data.products
  );
  return (
    <>
      <Navbar />
      <ul className="d-flex flex-row flex-wrap list-group justify-content-center">
        {products.map((product) => {
          return <ProductSquareItem key={product.id} product={product} />;
        })}
      </ul>
    </>
  );
};
