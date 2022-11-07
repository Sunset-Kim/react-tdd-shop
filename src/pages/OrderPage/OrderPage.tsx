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
  const { updateCount, updateOption } = useContext(
    ProductsApiCtx
  ) as IProductsApi;
  const { products, options } = useContext(ProductsStateCtx) as ProductsState;

  return (
    <div>
      <Products products={products} onUpdateCount={updateCount} />
      <Options options={options} onUpdate={updateOption} />
    </div>
  );
}

export default OrderPage;
