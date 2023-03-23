import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRoutes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ProductCheckoutItem } from "../components/ProductCheckoutItem";
import { billingApi } from "../factory";
import { Order, OrderItem } from "../services/api/billing/BillingApi";
import { AppDispatch, RootState } from "../store";
import { cleanCart } from "../store/products/products.middleware";
import { getTotalValueOfProducts } from "../utils/products-utils";

export const Checkout = () => {
  const productsInCart = useSelector((state: RootState) =>
    state.products.products.filter((p) => p.cart)
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const buy = async (): Promise<void> => {
    const orderItems: OrderItem[] = productsInCart.map(
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
    const order: Order = {
      clientId: "1",
      date: new Date().toISOString(),
      items: [...orderItems],
    };
    try {
      const orderReturn = await billingApi.postOrder(order);
      dispatch(cleanCart());
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
