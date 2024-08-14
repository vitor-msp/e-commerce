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
    dispatch(getOrders());
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h2 className="mx-2">Meus Pedidos</h2>
        <ul className="list-group">
          {orders.length === 0 ? (
            <p className="p-5">Você ainda não possui pedidos.</p>
          ) : (
            orders.map((order) => <Order key={order.createdAt} order={order} />)
          )}
        </ul>
      </div>
    </>
  );
};
