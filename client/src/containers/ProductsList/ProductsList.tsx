import React from "react";
import "./ProductsList.scss";
import ProductCard from "../../components/ProductCard/ProductCard";

type Props = {
  products: ProductType[];
  onSelectionCheck: (sku: string, selected: boolean) => void;
};

const ProductsList: React.FC<Props> = (props: Props) => {
  return (
    <section className="products">
      {props.products.length !== 0 ? (
        <div className="products-list">
          {props.products.map((item: ProductType) => (
            <ProductCard key={item.sku} handleCheck={props.onSelectionCheck} {...item} />
          ))}
        </div>
      ) : (
        <div className="products-list-empty">
          <p>No Products Available.</p>
          <p>Please add a product first!</p>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
