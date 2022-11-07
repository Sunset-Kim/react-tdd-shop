import Options from "./Options";
import Products from "./Products";
import {
  IProductsApi,
  ProductCountState,
  ProductsApiCtx,
  ProductsState,
  ProductsStateCtx,
} from "../../contexts/ProductsProvider";
import { useContext } from "react";

function OrderPage() {
  const { updateCount } = useContext(ProductsApiCtx) as IProductsApi;
  const { products } = useContext(ProductsStateCtx) as ProductsState;
  const calcPrice = (products: ProductsState["products"]) => {
    const sum = products.reduce((a: number, c: ProductCountState) => {
      a += c.price * c.count;
      return a;
    }, 0);
    return sum;
  };

  return (
    <div>
      <Products
        products={products}
        price={calcPrice(products)}
        onUpdateCount={updateCount}
      />
      <Options />
    </div>
  );
}

export default OrderPage;
