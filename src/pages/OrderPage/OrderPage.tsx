import React, { useContext } from "react";
import {
  IProductsApi,
  ProductsApiCtx,
  ProductsState,
  ProductsStateCtx,
} from "../../contexts/ProductsProvider";
import { calcOptionPrice, calcProductsPice } from "../../util/calculate_price";
import Options from "./Options";
import Products from "./Products";

const OrderPage: React.FC<PageProps> = ({ onChangeStep }) => {
  const { updateCount, updateOption } = useContext(
    ProductsApiCtx
  ) as IProductsApi;
  const { products, options } = useContext(ProductsStateCtx) as ProductsState;
  const productsPirce = calcProductsPice(products) ?? 0;
  const optionsPrice = calcOptionPrice(options) ?? 0;
  const totalPrice = productsPirce + optionsPrice;

  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChangeStep(1);
  };

  return (
    <div>
      <h1>Order Page</h1>
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
            <dd aria-label='total-price'>{`$ ${totalPrice}`}</dd>
          </div>
        </dl>

        <button type='button' disabled={totalPrice === 0} onClick={handleClick}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
