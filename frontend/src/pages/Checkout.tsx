import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ProductCheckoutItem } from "../components/ProductCheckoutItem";
import { RootState } from "../store";
import { getTotalValueOfProducts } from "../utils/products-utils";

export const Checkout = () => {
  const productsInCart = useSelector((state: RootState) =>
    state.products.products.filter((p) => p.cart)
  );
  return (
    <>
      <Navbar />
      <ul>
        {productsInCart.map((product) => (
          <ProductCheckoutItem key={product.id} product={product} />
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
        <button className={"btn btn-large btn-primary"}>
          Finalize sua Compra
        </button>
      </div>
    </>
  );
};
