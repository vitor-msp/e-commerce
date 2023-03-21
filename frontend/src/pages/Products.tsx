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
      <div className="row">
        <div className="col-12">
          <ul className="d-flex flex-row list-group">
            {products.map((product) => {
              return <ProductSquareItem key={product.id} product={product} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
