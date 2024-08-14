import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { updateCurrentProductAction } from "../store/current-product/current-product.slice";
import { IShowOrderItem } from "../store/orders/orders.types";
import { IOrder } from "../store/orders/orders.types";

type IOrderProps = {
  order: IOrder;
};

export const Order = ({ order }: IOrderProps) => {
  const { createdAt, items } = order;
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

  const formattedDate = `${createdAt.slice(8, 10)}/${createdAt.slice(5, 7)}/${createdAt.slice(
    0,
    4
  )}`;

  return (
    <li className="list-group-item mx-2 my-2 rounded bg-primary" key={createdAt}>
      <span>Realizado em: {formattedDate}</span>
      <div className="d-flex flex-row">
        {items.map(({ name, quantity, unitPrice, supplier, productId }) => (
          <div
            onClick={() => selectItem({ supplier, productId })}
            className="mx-2 my-2 bg-light rounded p-2 d-flex flex-column"
            style={{ cursor: "pointer" }}
          >
            <span className="fw-bold">{name}</span>
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
