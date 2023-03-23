import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ProductCartItem } from "../components/ProductCartItem";
import { RootState } from "../store";
import { getTotalValueOfProducts } from "../utils/products-utils";

export const Cart = () => {
  const productsInCart = useSelector((state: RootState) =>
    state.products.products.filter((p) => p.cart)
  );
  return (
    <>
      <Navbar />
      <ul>
        {productsInCart.map((product) => (
          <ProductCartItem key={product.id} product={product} />
        ))}
      </ul>
      <div>
        <span>Total: </span>
        <span>
          {getTotalValueOfProducts(productsInCart).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </>
  );
};
