import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCategoriesFromProducts,
  getMaterialsFromProducts,
} from "../../utils/products-utils";
import {
  IProduct,
  IProductLocalStorage,
  IProductsState,
  LOCAL_STORAGE_CART_KEY_NAME,
} from "./products.types";

const initialState: IProductsState = {
  products: [],
  filters: { categories: [], materials: [] },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductsAction: (state, { payload }: PayloadAction<IProduct[]>) => {
      let products = payload.map((product) => {
        return {
          ...product,
          id: product.supplier + product.id,
        };
      });
      const savedCartString = localStorage.getItem(LOCAL_STORAGE_CART_KEY_NAME);
      if (savedCartString) {
        const savedCart: IProductLocalStorage[] = JSON.parse(savedCartString);
        products = products.map((product) => {
          const savedProduct = savedCart.find((item) => item.id === product.id);
          return {
            ...product,
            cart: savedProduct ? true : false,
            cartQuantity: savedProduct?.cartQuantity ?? 1,
          };
        });
      }
      state.products = products;
      state.filters.categories = getCategoriesFromProducts(payload);
      state.filters.materials = getMaterialsFromProducts(payload);
    },
    addProductToCartAction: (state, { payload }: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      if (index !== -1) state.products.at(index)!.cart = true;
    },
    removeProductFromCartAction: (
      state,
      { payload }: PayloadAction<IProduct>
    ) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      if (index !== -1) state.products.at(index)!.cart = false;
    },
    updateQuantityAction: (state, { payload }: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      if (index !== -1)
        state.products.at(index)!.cartQuantity = payload.cartQuantity;
    },
    cleanCartAction: (state) => {
      state.products = state.products.map((product) => {
        return {
          ...product,
          cart: false,
          cartQuantity: 1,
        };
      });
    },
  },
});

export const {
  addProductsAction,
  addProductToCartAction,
  removeProductFromCartAction,
  updateQuantityAction,
  cleanCartAction,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
