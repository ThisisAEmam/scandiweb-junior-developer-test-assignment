type SwitchSelectedType = "Not specified" | "DVD" | "Furniture" | "Book";

type Form = {
  sku: string;
  name: string;
  price: string;
} & (
  | {
      productType: "DVD";
      size: string;
    }
  | {
      productType: "Furniture";
      height: string;
      width: string;
      length: string;
    }
  | {
      productType: "Book";
      weight: string;
    }
);

type AddProductField = {
  type: AddFormFieldType;
  text: string;
};

type FormikValues = {
  sku: string;
  name: string;
  price: string;
  productType: string;
  height: string;
  width: string;
  length: string;
  weight: string;
  size: string;
};
