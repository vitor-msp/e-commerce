import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { updateCurrentProductAction } from "../store/current-product/current-product.slice";
import {
  IShowOrderItem,
} from "../store/orders/orders.middleware";
import { IOrder } from "../store/orders/orders.types";

type IOrderProps = {
  order: IOrder;
};

export const Order = ({ order }: IOrderProps) => {
  const { date, items } = order;
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();
  const selectItem = (orderItem: IShowOrderItem): void => {
    const product = products.find(
      (product) => product.id === orderItem.supplier + orderItem.productId
    );
    if (!product) {
      alert("Item não encontrrado.");
      return;
    }
    dispatch(updateCurrentProductAction(product));
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
