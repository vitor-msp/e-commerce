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
    console.log(orders);
  }, [orders]);

  return (
    <>
      <Navbar />
      MyRequests
    </>
  );
};
