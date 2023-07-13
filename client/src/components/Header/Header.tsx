import React from "react";
import "./Header.scss";
import Button from "../Button/Button";

const Header: React.FC<Props> = (props: Props) => {
  return (
    <div className="app__header">
      <h1 className="app__header-title">{props.title}</h1>
      <div className="app__header-btns">
        {props.buttons.map((item, index: number) => (
          <Button key={index} id={item.id} text={item.text} onClick={item.onClick} />
        ))}
      </div>
    </div>
  );
};

export default Header;
