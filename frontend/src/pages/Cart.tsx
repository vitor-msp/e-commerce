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
      <div>
        <h2 className="mx-2">Carrinho</h2>
        <ul>
          {productsInCart.map((product) => (
            <ProductCartItem key={product.id} product={product} />
          ))}
        </ul>
        <div className="d-flex flex-row justify-content-center align-items-center my-2">
          <div className="mx-2">
            <span>Total: </span>
            <span className="fw-bold">
              {getTotalValueOfProducts(productsInCart).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button onClick={goToCheckout} className="btn btn-primary mx-2">
            Revise sua Compra
          </button>
        </div>
      </div>
    </>
  );
};
