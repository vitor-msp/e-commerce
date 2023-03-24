import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { productsReducer } from "../store/products/products.slice";
import { currentProductReducer } from "./current-product/current-product.slice";
import { ordersReducer } from "./orders/orders.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    currentProduct: currentProductReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
