import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/cardSlice";
import { Button, Col, Row } from "antd";
import { Item } from "../../types/common";

interface AppState {
  data: {
    data: Item[];
  };
}

interface BasketCardProps {
  items: {
    [key: string]: number;
  };
}

const dataByIdHandler = (data: Item[]): { [key: string]: Item } => {
  const objById: { [key: string]: Item } = {};
  data.forEach((element) => {
    objById[element.id] = element;
  });
  return objById;
};

const BasketCard: React.FC<BasketCardProps> = ({ items }) => {
  const { data } = useSelector((state: AppState) => state.data);

  const dataById = useMemo(() => dataByIdHandler(data), [data]);

  const dispatch = useDispatch();

  return (
    <div className={"small-card-root"}>
      {Object.keys(items).length > 0 ? (
        Object.keys(items).map((el) => (
          <Row key={el} justify="space-between">
            <Col span={14} className={"dataGroup"}>
              <div className={"name"}>{dataById[el].name}</div>
              <div className={"price"}>{`${dataById[el].price} $`}</div>
            </Col>
            <Col span={10} className={"buttonGroup"}>
              <Button
                size="small"
                onClick={() => dispatch(removeItem(dataById[el]))}
              >
                -
              </Button>
              <div className={"count"}>{items[el]}</div>
              <Button
                size="small"
                onClick={() => dispatch(addItem(dataById[el]))}
              >
                +
              </Button>
            </Col>
          </Row>
        ))
      ) : (
        <div>Your BasketCard is empty!</div>
      )}
    </div>
  );
};

export default BasketCard;
