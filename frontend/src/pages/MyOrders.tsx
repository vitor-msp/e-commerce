import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
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
      <ul className="list-group">
        {orders.map(({ date, items }) => (
          <li
            className="list-group-item mx-2 my-2 rounded bg-primary"
            key={date}
          >
            <span>Data: {date}</span>
            <div className="d-flex flex-row">
              {items.map(({ name, quantity, unitPrice }) => (
                <div className="mx-2 my-2 bg-light rounded p-2 d-flex flex-column">
                  <span>Nome: {name}</span>
                  <span>Quantidade: {quantity}</span>
                  <span>
                    Preço unitário:{" "}
                    {unitPrice.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
