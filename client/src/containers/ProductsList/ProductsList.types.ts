type ProductType = {
  sku: string;
  name: string;
  price: number;
} & (
  | {
      productType: "Book";
      attributes: {
        weight: number;
      };
    }
  | {
      productType: "DVD";
      attributes: {
        size: number;
      };
    }
  | {
      productType: "Furniture";
      attributes: {
        height: number;
        width: number;
        length: number;
      };
    }
);
