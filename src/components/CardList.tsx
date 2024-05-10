import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cardSlice";
import { Row, Col } from "antd";
import Card from "./cards/Card";
import { generatePath, useNavigate } from "react-router-dom";
import { CardItem } from "../types/card";

interface CardListProps {
  data: CardItem[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTocard = (item: CardItem) => {
    dispatch(addItem(item));
  };

  const handleDetail = (id: string) => {
    navigate(generatePath("/productDetail/:id", { id }));
  };

  return (
    <Row gutter={[32, 24]} justify="center">
      {data.map((item) => {
        return (
          <Col lg={6} md={6} xs={12} key={item.id}>
            <Card
              key={item.id}
              name={item.name}
              img={item.image}
              price={`${item.price} $`}
              onClick={() => handleDetail(item.id)}
              buttonAction={() => handleAddTocard(item)}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default CardList;
