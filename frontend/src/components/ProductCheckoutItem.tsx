import { IProduct } from "../store/products/products.types";

export type ProductCheckoutItemProps = {
  product: IProduct;
};

export const ProductCheckoutItem = ({ product }: ProductCheckoutItemProps) => {
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
    cartQuantity,
  } = product;
  return (
    <li className="list-group-item bg-primary rounded my-2 mx-2 p-2">
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
          <span>Quantidade:</span>
          <span>{cartQuantity} itens</span>
        </div>
        <div>
          <img
            src={images[0]}
            alt={name}
            width={160}
            height={120}
            className="rounded"
          />
        </div>
        <div className="d-flex flex-column">
          <span className="fw-bold">Nome: {name}</span>
          <span>Descrição: {description}</span>
          <span className="fst-italic">Preço: {price}</span>
        </div>
      </div>
    </li>
  );
};
