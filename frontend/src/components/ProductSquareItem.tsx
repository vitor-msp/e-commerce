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
      style={{ width: "370px", height: "490px" }}
    >
      <div className="d-flex flex-column align-items-center">
        <img
          src={images[0]}
          alt={name}
          width={320}
          height={240}
          className="rounded"
          style={{ cursor: "pointer" }}
          onClick={selectProduct}
        />
        <div className="d-flex flex-column">
          <span className="fw-bold">Nome: {name}</span>
          <span>Descrição: {description}</span>
          <span className="fst-italic">Preço: {price}</span>
          <button className="btn btn-light" disabled={cart} onClick={addToCart}>
            {cart ? "Já está no carrinho" : "Adicione ao carrinho"}
          </button>
        </div>
      </div>
    </li>
  );
};
