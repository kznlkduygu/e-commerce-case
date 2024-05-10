import React from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "antd";
import { priceFormatter } from "../../utils/priceFormatter";

interface cardState {
  card: {
    totalPrice: string | null;
  };
}

const Checkout: React.FC = () => {
  const { totalPrice } = useSelector((state: cardState) => state.card);
  console.log("totalPrice", totalPrice);
  return (
    <div className={"checkout-card-root"}>
      <Row justify="start" gutter={[0, 16]}>
        <Col span={10} className={"totalPriceText"}>
          Total Price:
        </Col>
        <Col span={6} className={"totalValue"}>
          {totalPrice && `${priceFormatter(totalPrice)} $`}
        </Col>
        <Col span={24}>
          <Button type="primary" className={"actionButton"}>
            Checkout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
