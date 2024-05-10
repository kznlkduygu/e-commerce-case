import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrandFilters } from '../../redux/filterSlice';
import Filter from '../Filter';
import { RootState } from '../../redux/store';

// Interface for the props expected by the Filter component
interface FilterProps {
  data: string[];
  onChange: (filters: string[]) => void;
  handleSearch: (text: string) => void;
  value: string[];
}

// BrandFilter now properly accepts props according to the FilterProps interface
const BrandFilter: React.FC<FilterProps> = ({
  data,
  onChange,
  handleSearch,
  value,
}) => {
  const [brandFilterByText, setBrandFilterByText] = useState<string>('');
  const dispatch = useDispatch();

  // Use data directly from props instead of re-fetching it from the state
  const filteredBrands = useMemo(() => {
    return data.filter(brand => brand.toLowerCase().includes(brandFilterByText.toLowerCase()));
  }, [data, brandFilterByText]);

  const handleBrandChange = (filters: string[]) => {
    dispatch(setBrandFilters(filters));
    onChange(filters); // Assuming you might want to propagate this change up as well
  };

  return (
    <Filter
      data={filteredBrands}
      onChange={handleBrandChange}
      handleSearch={setBrandFilterByText}
      value={value}
    />
  );
};

export default BrandFilter;
