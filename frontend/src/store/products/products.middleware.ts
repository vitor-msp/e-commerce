import { AppThunk } from "..";
import { suppliers } from "../../factory";
import {
  addProductsAction,
  addProductToCartAction,
  removeProductFromCartAction,
  updateQuantityAction,
} from "./products.slice";
import {
  IProduct,
  IProductLocalStorage,
  LOCAL_STORAGE_KEY_NAME,
} from "./products.types";

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    const products: IProduct[] = [];
    for (const supplier of suppliers) {
      products.push(...(await supplier.getAllProducts()));
    }
    dispatch(addProductsAction(products));
  } catch (error) {
    alert(error);
  }
};

export const addProductToCart =
  (product: IProduct): AppThunk =>
  async (dispatch) => {
    try {
      const savedCartString = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
      let savedCart: IProductLocalStorage[] = [];
      if (savedCartString) savedCart = JSON.parse(savedCartString);
      const { id, supplier, cartQuantity } = product;
      savedCart.push({ id, supplier, cartQuantity });
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(savedCart));
      dispatch(addProductToCartAction(product));
    } catch (error) {
      alert(error);
    }
  };

export const removeProductFromCart =
  (product: IProduct): AppThunk =>
  async (dispatch) => {
    try {
      const savedCartString = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
      let savedCart: IProductLocalStorage[] = [];
      if (savedCartString) savedCart = JSON.parse(savedCartString);
      savedCart = savedCart.filter((item) => item.id !== product.id);
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(savedCart));
      dispatch(removeProductFromCartAction(product));
    } catch (error) {
      alert(error);
    }
  };

export const updateQuantity =
  (product: IProduct): AppThunk =>
  async (dispatch) => {
    try {
      const savedCartString = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
      let savedCart: IProductLocalStorage[] = [];
      if (savedCartString) savedCart = JSON.parse(savedCartString);
      const index = savedCart.findIndex((item) => item.id === product.id);
      if (index !== -1)
        savedCart.at(index)!.cartQuantity = product.cartQuantity;
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(savedCart));
      dispatch(updateQuantityAction(product));
    } catch (error) {
      alert(error);
    }
  };
