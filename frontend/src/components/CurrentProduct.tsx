import { useEffect, useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { cleanCurrentProductAction } from "../store/current-product/current-product.slice";
import { addProductToCart } from "../store/products/products.middleware";

export const CurrentProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const currentProduct = useSelector(
    (state: RootState) => state.currentProduct
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setShowModal(true);
  }, [currentProduct.showProduct]);

  const closeModal = () => {
    dispatch(cleanCurrentProductAction());
    setShowModal(false);
  };

  const addToCart = (): void => {
    dispatch(addProductToCart(currentProduct.data));
    closeModal();
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
  } = currentProduct.data;

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel>
          {images.map((url) => {
            return (
              <Carousel.Item>
                <img src={url} className="d-block w-100" alt={name} />
                <Carousel.Caption>
                  <span>{name}</span>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <div className="d-flex flex-column">
          <div className="my-2">
            <span>{description}</span>
          </div>
          <div className="d-flex flex-row flex-wrap">
            <ul className="list-group m-1">
              <li className="list-group-item active">Categoria</li>
              <li className="list-group-item">
                <span>{category}</span>
              </li>
            </ul>
            <ul className="list-group m-1">
              <li className="list-group-item active">Material</li>
              <li className="list-group-item">
                <span>{material}</span>
              </li>
            </ul>
            <ul className="list-group m-1">
              <li className="list-group-item active">Preço</li>
              <li className="list-group-item">
                <span>
                  {price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </li>
            </ul>
            {discountValue > 0 && (
              <>
                <ul className="list-group m-1">
                  <li className="list-group-item active">Desconto</li>
                  <li className="list-group-item">
                    <span>{discountValue * 100} %</span>
                  </li>
                </ul>
                <ul className="list-group m-1">
                  <li className="list-group-item active">Preço com desconto</li>
                  <li className="list-group-item">
                    <span>
                      {(price * (1 - discountValue)).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary"
          disabled={cart}
          onClick={addToCart}
        >
          {cart ? "Já está no carrinho" : "Adicione ao carrinho"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
