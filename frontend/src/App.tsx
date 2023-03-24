import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CurrentProduct } from "./components/CurrentProduct";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { MyAccount } from "./pages/MyAccount";
import { MyOrders } from "./pages/MyOrders";
import { Products } from "./pages/Products";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AppDispatch, RootState } from "./store";
import { getProducts } from "./store/products/products.middleware";
import { testSignIn } from "./store/user/user.middleware";

const App = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const showCurrentProduct = useSelector(
    (state: RootState) => state.currentProduct.showProduct
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
      return;
    }
  }, [products, dispatch]);

  useEffect(() => {
    dispatch(testSignIn());
  }, []);

  return (
    <div className="container-fluid">
      {showCurrentProduct && <CurrentProduct />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
