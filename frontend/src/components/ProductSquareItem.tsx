import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateCurrentProductAction } from "../store/current-product/current-product.slice";
import { IProduct } from "../store/products/products.types";

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
  } = product;
  return (
    <li>
      <div
        className="list-group-item bg-primary rounded my-2 mx-2 p-2"
        onClick={selectProduct}
      >
        <img
          src={images[0]}
          alt={name}
          width={320}
          height={240}
          className="rounded"
        />
        <div className="d-flex flex-column">
          <span className="fw-bold">{name}</span>
          <span>{description}</span>
          <span className="fst-italic">{price}</span>
        </div>
      </div>
    </li>
  );
};
