import React from "react";
import { Radio } from "antd";

// Define an interface for the item type within the `data` array
interface SortItem {
  value: string; // Assuming value is a string; adjust the type as necessary
  label: string;
}

// Define an interface for the props expected by the Sort component
interface SortProps {
  onChange?: (value: string) => void; // Optional onChange function that takes a string value
  value: string; // Current value for the Radio.Group, assumed to be string
  data: SortItem[]; // Array of SortItem
}

const Sort: React.FC<SortProps> = ({ onChange, value, data }) => {
  return (
    <div className={"sort-root"}>
      <Radio.Group
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
      >
        {data.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default Sort;
