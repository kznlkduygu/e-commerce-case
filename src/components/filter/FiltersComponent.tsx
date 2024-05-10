import React from "react";
import { useDispatch } from "react-redux";
import { setBrandFilters, setModelFilters } from "../../redux/filterSlice";
import Filter from "../Filter";

interface FiltersComponentProps {
  brands: string[];
  models: string[];
  selectedBrandFilters: string[];
  selectedModelFilters: string[];
  setBrandFilterByText: any;
  setModelFilterByText: any;
}

const FiltersComponent: React.FC<FiltersComponentProps> = ({
  brands,
  models,
  selectedBrandFilters,
  selectedModelFilters,
  setBrandFilterByText,
  setModelFilterByText,
}) => {
  const dispatch = useDispatch();

  const handleBrandFilterChange = (filters: string[]) => {
    dispatch(setBrandFilters(filters));
  };

  const handleModelFilterChange = (filters: string[]) => {
    dispatch(setModelFilters(filters));
  };
  console.log("brands",brands)
  return (
    <>
      <Filter
        data={brands}
        onChange={handleBrandFilterChange}
        handleSearch={setBrandFilterByText}
        value={selectedBrandFilters}
      />
      <Filter
        data={models}
        onChange={handleModelFilterChange}
        handleSearch={setModelFilterByText}
        value={selectedModelFilters}
      />
    </>
  );
};

export default FiltersComponent;
