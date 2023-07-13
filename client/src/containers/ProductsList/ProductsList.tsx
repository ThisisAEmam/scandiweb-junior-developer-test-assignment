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
      <div className="products-list">
        {props.products.map((item: ProductType) => (
          <ProductCard key={item.sku} sku={item.sku} name={item.name} price={item.price} dimensions={item.dimensions} size={item.size} weight={item.weight} handleCheck={props.onSelectionCheck} />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
