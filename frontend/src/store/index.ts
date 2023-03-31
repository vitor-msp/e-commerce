import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { productsReducer } from "../store/products/products.slice";
import { currentProductReducer } from "./current-product/current-product.slice";
import { orderStatusReducer } from "./order-status/order-status.slice";
import { ordersReducer } from "./orders/orders.slice";
import { userReducer } from "./user/user.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    currentProduct: currentProductReducer,
    orders: ordersReducer,
    user: userReducer,
    orderStatus: orderStatusReducer,
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
