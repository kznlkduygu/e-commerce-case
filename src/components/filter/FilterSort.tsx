import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortValue } from '../../redux/sortSlice';
import Sort from '../Sort';

interface FilterSortProps {
  sortData: { value: string; label: string }[];
  sortValue: string;
}

const FilterSort: React.FC<FilterSortProps> = ({ sortData, sortValue }) => {
  const dispatch = useDispatch();

  const handleSortChange = (value: string) => {
    dispatch(setSortValue(value));
  };

  return (
    <Sort
      data={sortData}
      onChange={handleSortChange}
      value={sortValue}
    />
  );
};

export default FilterSort;
