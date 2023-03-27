import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateCurrentProductAction } from "../store/current-product/current-product.slice";
import { IProduct } from "../store/products/products.types";
import "../design/index.css";
import {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
} from "../store/products/products.middleware";
import { useState } from "react";

export type ProductCartItemProps = {
  product: IProduct;
};

export const ProductCartItem = ({ product }: ProductCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(product.cartQuantity);
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
    const cartQuantity: number = +event.target.value;
    setQuantity(cartQuantity);
    dispatch(updateQuantity({ ...product, cartQuantity }));
  };
  const removeFromCart = (): void => {
    dispatch(removeProductFromCart(product));
  };
  return (
    <li className="list-group-item bg-primary rounded my-2 mx-2 p-2 opacity-product">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center justify-content-left">
          <input
            type="number"
            value={quantity}
            onChange={changeQuantity}
            min={1}
            step={1}
            className="form-control"
            style={{ maxWidth: "70px" }}
          />
          <img
            src={images[0]}
            alt={name}
            width={160}
            height={120}
            className="rounded mx-1"
            style={{ cursor: "pointer" }}
            onClick={selectProduct}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold">{name}</span>
            <span>{description}</span>
            <span className="fst-italic">
              Preço:{" "}
              {price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            {discountValue > 0 && (
              <>
                <span className="fst-italic">
                  Desconto: {discountValue * 100}
                </span>
                <span className="fst-italic">
                  Preço com desconto:{" "}
                  {(price * (1 - discountValue)).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
        <div>
          <button
            type="button"
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
