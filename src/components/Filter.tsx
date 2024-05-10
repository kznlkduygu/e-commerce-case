import React from "react";
import { Checkbox, Col, Row, Input } from "antd";

const { Search } = Input;

interface FilterProps {
  data: string[]; // Filtreleme için kullanılacak veri dizisi (string türünde)
  onChange: (checkedValues: string[]) => void;
  handleSearch: (value: string) => void; // Arama çubuğundaki değer değiştiğinde çağrılacak fonksiyon
  value: string[];
}

const Filter: React.FC<FilterProps> = ({
  data,
  onChange,
  handleSearch,
  value,
}) => {
  return (
    <div className={"filter-root"}>
      <Row>
        <Col span={24}>
          <Search
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)} // Arama çubuğunda her değişiklik olduğunda handleSearch fonksiyonunu çağırır
          />
        </Col>
      </Row>
      <Row className={"items"}>
        <Checkbox.Group options={data} onChange={onChange} value={value} />
      </Row>
    </div>
  );
};

export default Filter;
