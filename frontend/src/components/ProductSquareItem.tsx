import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateCurrentProductAction } from "../store/current-product/current-product.slice";
import { IProduct } from "../store/products/products.types";
import "../design/index.css";
import { addProductToCart } from "../store/products/products.middleware";

export type ProductSquareItemProps = {
  product: IProduct;
};

export const ProductSquareItem = ({ product }: ProductSquareItemProps) => {
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
  const addToCart = (): void => {
    dispatch(addProductToCart(product));
  };
  return (
    <li
      className="list-group-item bg-primary rounded my-2 mx-2 p-2 opacity-product"
      style={{ width: "280px", height: "380px" }}
    >
      <div className="d-flex flex-column align-items-center">
        <img
          src={images[0]}
          alt={name}
          width={256}
          height={192}
          className="rounded"
          style={{ cursor: "pointer" }}
          onClick={selectProduct}
        />
        <div className="d-flex flex-column align-content-between">
          <span className="fw-bold" style={{ fontSize: "1.2em" }}>
            {name}
          </span>
          {discountValue > 0 ? (
            <>
              <p className="py-0 my-0">
                De:{" "}
                <span className="fw-bold mx-2" style={{ fontSize: "1.2em" }}>
                  {price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
              <p className="py-0 my-0">
                Por apenas:{" "}
                <span className="fw-bold mx-2" style={{ fontSize: "1.8em" }}>
                  {(price * (1 - discountValue)).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            </>
          ) : (
            <p className="py-0 my-0">
              Por apenas:{" "}
              <span className="fw-bold mx-2" style={{ fontSize: "1.8em" }}>
                {price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </p>
          )}

          <span className="fst-italic"></span>
          <button
            type="button"
            className="btn btn-light"
            disabled={cart}
            onClick={addToCart}
          >
            {cart ? "Já está no carrinho" : "Adicione ao carrinho"}
          </button>
        </div>
      </div>
    </li>
  );
};
