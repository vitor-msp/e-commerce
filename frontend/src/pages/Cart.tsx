import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
        <NavLink to={"/checkout"} className={"nav-link btn bg-primary"}>
          Revise sua Compra
        </NavLink>
      </div>
    </>
  );
};
