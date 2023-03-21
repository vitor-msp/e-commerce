import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { getProducts } from "./store/products/products.middleware";

function App() {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (products.data.products.length === 0) dispatch(getProducts());
  }, []);
  useEffect(() => {
    if (products.data.products.length > 0) console.log(products);
  }, [products]);

  return <>test</>;
}

export default App;
