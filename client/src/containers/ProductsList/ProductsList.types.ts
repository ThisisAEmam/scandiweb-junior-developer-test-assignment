type ProductType = {
  sku: string;
  name: string;
  price: number;
  type: "book" | "dvd" | "furniture";
  size?: number;
  weight?: number;
  dimensions?: string;
};
