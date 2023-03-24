import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  IShowOrderItem,
  showOrderItem,
} from "../store/orders/orders.middleware";
import { IOrder } from "../store/orders/orders.types";

type IOrderProps = {
  order: IOrder;
};

export const Order = ({ order }: IOrderProps) => {
  const { date, items } = order;
  const dispatch = useDispatch<AppDispatch>();
  const selectItem = (orderItem: IShowOrderItem): void => {
    dispatch(showOrderItem(orderItem));
  };
  return (
    <li className="list-group-item mx-2 my-2 rounded bg-primary" key={date}>
      <span>Data: {date}</span>
      <div className="d-flex flex-row">
        {items.map(({ name, quantity, unitPrice, supplier, productId }) => (
          <div
            onClick={() => selectItem({ supplier, productId })}
            className="mx-2 my-2 bg-light rounded p-2 d-flex flex-column"
          >
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
  );
};
