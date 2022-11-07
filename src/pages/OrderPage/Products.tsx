import React from "react";
import {
  IProductsApi,
  ProductCountState,
  ProductsState,
} from "../../contexts/ProductsProvider";

interface ProductsProps {
  products: ProductsState["products"];
  onUpdateCount: IProductsApi["updateCount"];
}

const Products: React.FC<ProductsProps> = ({ products, onUpdateCount }) => {
  const handleChangeCount = (id: number, value: string) => {
    const count = Number(value) < 0 ? 0 : Number(value);
    onUpdateCount(id, count);
  };

  const calcPrice = (products: ProductsState["products"]) => {
    const sum = products.reduce((a: number, c: ProductCountState) => {
      a += c.price * c.count;
      return a;
    }, 0);
    return sum;
  };

  return (
    <div>
      <h2>Products</h2>

      <h3>{`Prodcuts Price: $${calcPrice(products) ?? 0}`}</h3>

      {products &&
        products.map((product) => (
          <div key={product.id}>
            <img src={product.imgPath} alt={product.name} />
            <span>price: {product.price}</span>

            <div>
              <label htmlFor={product.name}>{product.name}</label>
              <input
                onChange={(e) =>
                  handleChangeCount(product.id, e.currentTarget.value)
                }
                id={product.name}
                type='number'
                value={product.count}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
