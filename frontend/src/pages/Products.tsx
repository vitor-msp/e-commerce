import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { RootState } from "../store";

export const Products = () => {
  const products = useSelector(
    (state: RootState) => state.products.data.products
  );
  return (
    <>
      <Navbar />
      <div>
        <ul>
          {products.map((product) => {
            return <li key={product.id}>{product.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};
