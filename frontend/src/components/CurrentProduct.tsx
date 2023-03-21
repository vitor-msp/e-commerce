import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { cleanCurrentProductAction } from "../store/current-product/current-product.slice";

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

  const {
    category,
    description,
    discountValue,
    id,
    images,
    material,
    name,
    price,
  } = currentProduct;

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>{price}</Modal.Footer>
    </Modal>
  );
};
