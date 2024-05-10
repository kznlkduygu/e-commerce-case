import React, { useEffect, CSSProperties } from "react";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import BasketCard from "../components/cards/BasketCard";
import CheckoutCard from "../components/cards/CheckoutCard";
import { fetchData } from "../redux/dataSlice";
import { AppDispatch } from "../redux/store";
import { generatePath, useNavigate } from "react-router-dom";

interface ProductListProps {
  style?: CSSProperties;
  children?: React.ReactNode;
}

const ProductList: React.FC<ProductListProps> = ({ style, children }) => {
  const navigate = useNavigate();
  const { items }: any = useSelector((state: any) => state.card);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className={"root"} style={style}>
      <Header onClick={() => navigate(generatePath("/productList"))} />
      <Row>
        <Col lg={18} xs={24}>
          <div className={"main"}>{children}</div>
        </Col>
        <Col lg={6} xs={0} className={"cardControl"}>
          <Row gutter={[32, 24]} justify="center">
            <Col style={{ marginTop: 16}} span={24}>
              Card
              <BasketCard items={items} />
            </Col>
            <Col span={24}>
              Checkout
              <CheckoutCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default ProductList;
