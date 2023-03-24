import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ProductCheckoutItem } from "../components/ProductCheckoutItem";
import { billingApi } from "../factory";
import { AppDispatch, RootState } from "../store";
import { IOrder, IOrderItem } from "../store/orders/orders.types";
import { cleanCart } from "../store/products/products.middleware";
import { userBoughtAction } from "../store/user/user.slice";
import { getTotalValueOfProducts } from "../utils/products-utils";

export const Checkout = () => {
  const productsInCart = useSelector((state: RootState) =>
    state.products.products.filter((p) => p.cart)
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
      clientId: "1",
      date: new Date().toISOString(),
      items: [...orderItems],
    };
    try {
      const orderReturn = await billingApi.postOrder(order);
      dispatch(cleanCart());
      dispatch(userBoughtAction());
      navigate("/products");
      alert(`Id do pedido: ${orderReturn.orderId} - ${orderReturn.status}`);
    } catch (error) {
      alert(error);
    }
  };

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
        <button className={"btn btn-large btn-primary"} onClick={buy}>
          Finalize sua Compra
        </button>
      </div>
    </>
  );
};
