import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateCurrentProductAction } from "../store/current-product/current-product.slice";
import { IProduct } from "../store/products/products.types";
import "../design/index.css";
import { addProductToCart, removeProductFromCart } from "../store/products/products.middleware";
import { useState } from "react";

export type ProductCartItemProps = {
  product: IProduct;
};

export const ProductCartItem = ({ product }: ProductCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const selectProduct = () => {
    dispatch(updateCurrentProductAction(product));
  };
  const {
    category,
    description,
    discountValue,
    id,
    images,
    material,
    name,
    price,
    cart,
    supplier,
  } = product;
  const changeQuantity = (
    event: React.InputHTMLAttributes<HTMLInputElement>
  ): void => {
    //@ts-ignore
    setQuantity(+event.target.value);
  };
  const removeFromCart = (): void => {
    dispatch(removeProductFromCart(product));
  };
  return (
    <li className="list-group-item bg-primary rounded my-2 mx-2 p-2 opacity-product">
      <div className="d-flex flex-row">
        <div>
          <input
            type="number"
            value={quantity}
            onChange={changeQuantity}
            min={1}
            step={1}
            className="form-control"
            style={{ maxWidth: "80px" }}
          />
        </div>
        <div>
          <img
            src={images[0]}
            alt={name}
            width={160}
            height={120}
            className="rounded"
            style={{ cursor: "pointer" }}
            onClick={selectProduct}
          />
        </div>
        <div className="d-flex flex-column">
          <span className="fw-bold">Nome: {name}</span>
          <span>Descrição: {description}</span>
          <span className="fst-italic">Preço: {price}</span>
        </div>
        <div>
          <button
            className="btn btn-large btn-outline-danger"
            onClick={removeFromCart}
          >
            {" x "}
          </button>
        </div>
      </div>
    </li>
  );
};
