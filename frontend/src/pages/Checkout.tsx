import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ProductCheckoutItem } from "../components/ProductCheckoutItem";
import { AppDispatch, RootState } from "../store";
import { cleanBought } from "../store/order-status/order-status.slice";
import { postOrder } from "../store/orders/orders.middleware";
import { IOrder, IOrderItem } from "../store/orders/orders.types";
import { cleanCart } from "../store/products/products.middleware";
import { userBoughtAction } from "../store/user/user.slice";
import { getTotalValueOfProducts } from "../utils/products-utils";

export const Checkout = () => {
  const productsInCart = useSelector((state: RootState) =>
    state.products.products.filter((p) => p.cart)
  );
  const orderStatus = useSelector(
    (state: RootState) => state.orderStatus.orderStatus
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderStatus.bought) {
      dispatch(cleanCart());
      dispatch(userBoughtAction());
      navigate("/products");
      dispatch(cleanBought());
      alert(orderStatus.message);
    }
  }, [orderStatus]);

  const buy = async (): Promise<void> => {
    const orderItems: IOrderItem[] = productsInCart.map(
      ({ name, supplier, id, cartQuantity, discountValue, price }) => {
        return {
          supplier,
          productId: id,
          name,
          quantity: cartQuantity,
          unitPrice: price * (1 - discountValue),
        };
      }
    );
    const order: IOrder = {
      createdAt: new Date().toISOString(),
      items: [...orderItems],
    };
    dispatch(postOrder(order));
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className="mx-2">Checkout</h2>
        <ul>
          {productsInCart.map((product) => (
            <ProductCheckoutItem key={product.id} product={product} />
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
          <button onClick={buy} className="btn btn-primary mx-2">
            Finalize sua Compra
          </button>
        </div>
      </div>
    </>
  );
};
