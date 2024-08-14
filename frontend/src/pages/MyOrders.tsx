import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { Order } from "../components/Order";
import { AppDispatch, RootState } from "../store";
import { getOrders } from "../store/orders/orders.middleware";
import { useNavigate } from "react-router-dom";

export const MyOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrders(navigate));
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
