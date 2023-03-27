import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { Order } from "../components/Order";
import { AppDispatch, RootState } from "../store";
import { getOrders } from "../store/orders/orders.middleware";

export const MyOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrders());
    }
  }, [orders, dispatch]);

  return (
    <>
      <Navbar />
      <div>
        <h2 className="mx-2">Meus Pedidos</h2>
        <ul className="list-group">
          {orders.map((order) => (
            <Order key={order.date} order={order} />
          ))}
        </ul>
      </div>
    </>
  );
};
