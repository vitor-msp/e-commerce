import { useEffect, useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { cleanCurrentProductAction } from "../store/current-product/current-product.slice";
import { addProductToCart } from "../store/products/products.middleware";

export const CurrentProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const currentProduct = useSelector(
    (state: RootState) => state.currentProduct.data
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const closeModal = () => {
    dispatch(cleanCurrentProductAction());
    setShowModal(false);
  };

  const addToCart = (): void => {
    dispatch(addProductToCart(currentProduct));
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
  } = currentProduct;

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
          <div>
            <span>Descrição: {description}</span>
          </div>
          <div className="d-flex flex-row">
            <span>Categoria: {category}</span>
            <span>Material: {material}</span>
            <span>Preço: {price}</span>
            <span>Desconto: {discountValue * 100}</span>
            <span>Preço com desconto: {price * (1 - discountValue)}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" disabled={cart} onClick={addToCart}>
          {cart ? "Já está no carrinho" : "Adicione ao carrinho"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
