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
    <li className="list-group-item bg-primary rounded my-2 mx-2 p-2 opacity-product">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center justify-content-left">
          <div className="d-flex flex-column">
            <span>Quantidade:</span>
            <span>
              {cartQuantity} {cartQuantity === 1 ? "item" : "itens"}
            </span>
          </div>
          <img
            src={images[0]}
            alt={name}
            width={160}
            height={120}
            className="rounded mx-1"
            style={{ cursor: "pointer" }}
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
      </div>
    </li>
  );
};
