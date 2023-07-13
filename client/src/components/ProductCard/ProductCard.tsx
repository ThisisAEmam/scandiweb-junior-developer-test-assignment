import { Component } from "react";
import "./ProductCard.scss";

type PropsType = {
  sku: string;
  name: string;
  price: number;
  size?: number;
  weight?: number;
  dimensions?: string;
  handleCheck: (sku: string, selected: boolean) => void;
};

type StateType = {
  attrKey: string;
  attrValue: string;
};

class ProductCard extends Component<PropsType, StateType> {
  state = {
    attrKey: "",
    attrValue: "",
  };

  componentDidMount(): void {
    if (this.props.size) {
      this.setState({
        attrKey: "Size",
        attrValue: this.props.size.toString() + " MB" || "",
      });
    } else if (this.props.weight) {
      this.setState({
        attrKey: "Weight",
        attrValue: this.props.weight.toString() + "KG" || "",
      });
    } else if (this.props.dimensions) {
      this.setState({
        attrKey: "Dimension",
        attrValue: this.props.dimensions || "",
      });
    }
  }

  handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleCheck(this.props.sku, e.target.checked);
  };

  render() {
    return (
      <div className="product-card">
        <input type="checkbox" className="product-card--checkbox delete-checkbox" onChange={this.handleChangeCheckbox} />
        <p>{this.props.sku}</p>
        <p>{this.props.name}</p>
        <p>{this.props.price.toFixed(2)} $</p>
        <p>{`${this.state.attrKey}: ${this.state.attrValue}`}</p>
      </div>
    );
  }
}

export default ProductCard;
