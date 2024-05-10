import React, { FC } from "react";
import { Button, Col, Row } from "antd";

interface CardProps {
  name: string;
  img: string;
  type?: string;
  onClick?: () => void; // Assuming onClick is a function that takes no arguments and returns void
  price: string; // Change to number if price is a numerical value
  buttonAction?: () => void; // Optional prop, so it's marked with ?
}

const Card: FC<CardProps> = ({
  name,
  img,
  type,
  onClick,
  price,
  buttonAction,
}) => {
  return (
    <Row className={"card-root"} justify={"space-evenly"}>
      <Col span={16} xl={16} onClick={onClick}>
        <img src={img} alt="Avatar" className={"image"} />
      </Col>
      <Col span={24} className={"price"}>
        {price}
      </Col>
      <Col span={24} className={"name"} onClick={onClick}>
        {name}
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          className={"actionButton"}
          onClick={buttonAction ? buttonAction : undefined}
        >
          Add to Card
        </Button>
      </Col>
    </Row>
  );
};

export default Card;
