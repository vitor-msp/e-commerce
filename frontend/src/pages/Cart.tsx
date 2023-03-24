import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ProductCartItem } from "../components/ProductCartItem";
import { AppDispatch, RootState } from "../store";
import { userWantsBuyAction } from "../store/user/user.slice";
import { getTotalValueOfProducts } from "../utils/products-utils";

export const Cart = () => {
  const productsInCart = useSelector((state: RootState) =>
    state.products.products.filter((p) => p.cart)
  );
  const userIsLogged = useSelector(
    (state: RootState) => state.user.user.isLogged
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const goToCheckout = () => {
    if (userIsLogged) {
      navigate("/checkout");
      return;
    }
    dispatch(userWantsBuyAction());
    navigate("/signin");
  };
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
        <button onClick={goToCheckout} className="btn btn-primary">
          Revise sua Compra
        </button>
      </div>
    </>
  );
};
