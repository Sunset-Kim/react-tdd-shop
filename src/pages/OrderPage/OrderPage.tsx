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
import { calcOptionPrice, calcProductsPice } from "../../util/calculate_price";

function OrderPage() {
  const { updateCount, updateOption } = useContext(
    ProductsApiCtx
  ) as IProductsApi;
  const { products, options } = useContext(ProductsStateCtx) as ProductsState;

  const productsPirce = calcProductsPice(products) ?? 0;
  const optionsPrice = calcOptionPrice(options) ?? 0;

  return (
    <div>
      <Products products={products} onUpdateCount={updateCount} />
      <Options options={options} onUpdate={updateOption} />
      <div>
        <dl>
          <div>
            <dt>Prodcuts Price</dt>
            <dd aria-label='product-price'>{`$ ${productsPirce}`}</dd>
          </div>
          <div>
            <dt>Options Price</dt>
            <dd aria-label='options-price'>{`$ ${optionsPrice}`}</dd>
          </div>
          <div>
            <dt>Total Price</dt>
            <dd aria-label='total-price'>{`$ ${
              productsPirce + optionsPrice
            }`}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default OrderPage;
