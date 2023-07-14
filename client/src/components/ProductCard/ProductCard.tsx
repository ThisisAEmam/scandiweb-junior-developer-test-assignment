import React, { useEffect, useState } from "react";
import "./ProductCard.scss";

type Props = ProductType & {
  handleCheck: (sku: string, selected: boolean) => void;
};

const ProductCard: React.FC<Props> = (props: Props) => {
  const [attrKey, setAttrKey] = useState<string>("");
  const [attrValue, setAttrValue] = useState<string>("");

  useEffect(() => {
    switch (props.productType) {
      case "Furniture":
        setAttrKey("Dimension");
        setAttrValue(`${props.attributes.height}x${props.attributes.width}x${props.attributes.length}`);
        break;
      case "DVD":
        setAttrKey("Size");
        setAttrValue(`${props.attributes.size} MB`);
        break;
      case "Book":
        setAttrKey("Weight");
        setAttrValue(`${props.attributes.weight}KG`);
        break;

      default:
        break;
    }
  }, [props.productType]);
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleCheck(props.sku, e.target.checked);
  };

  return (
    <div className="product-card">
      <input type="checkbox" className="product-card--checkbox delete-checkbox" onChange={handleChangeCheckbox} />
      <p>{props.sku}</p>
      <p>{props.name}</p>
      <p>{props.price.toFixed(2)} $</p>
      <p>{`${attrKey}: ${attrValue}`}</p>
    </div>
  );
};

export default ProductCard;
