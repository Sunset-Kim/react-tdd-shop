import Options from "./Options";
import Products from "./Products";
import {
  IProductsApi,
  ProductsApiCtx,
  ProductsState,
  ProductsStateCtx,
} from "../../contexts/ProductsProvider";
import { useContext } from "react";

function OrderPage() {
  const { updateCount } = useContext(ProductsApiCtx) as IProductsApi;
  const { products } = useContext(ProductsStateCtx) as ProductsState;
  const calcPrice = (products: ProductsState["products"]) => {
    let sum = 0;
    products.forEach((value, key) => {
      sum += value.count * value.price;
    });
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
