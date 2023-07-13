import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  sku: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("This field is Required!"),
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("This field is Required!"),
  price: Yup.number().required("This field is Required!").positive(),
  // productType: Yup.string().notRequired(),
  productType: Yup.string().oneOf(["Book", "DVD", "Furniture"]).required("Select an option to submit!"),
  size: Yup.number().when("productType", {
    is: (value: SwitchSelectedType) => value === "DVD",
    then: () => Yup.number().positive().required("This field is Required!"),
    otherwise: () => Yup.number().notRequired(),
  }),
  weight: Yup.number().when("productType", {
    is: (value: SwitchSelectedType) => value === "Book",
    then: () => Yup.number().positive().required("This field is Required!"),
  }),
  height: Yup.number().when("productType", {
    is: (value: SwitchSelectedType) => value === "Furniture",
    then: () => Yup.number().positive().required("This field is Required!"),
    otherwise: () => Yup.number().notRequired(),
  }),
  width: Yup.number().when("productType", {
    is: (value: SwitchSelectedType) => value === "Furniture",
    then: () => Yup.number().positive().required("This field is Required!"),
    otherwise: () => Yup.number().notRequired(),
  }),
  length: Yup.number().when("productType", {
    is: (value: SwitchSelectedType) => value === "Furniture",
    then: () => Yup.number().positive().required("This field is Required!"),
    otherwise: () => Yup.number().notRequired(),
  }),
});
