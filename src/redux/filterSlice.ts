import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State için bir tip tanımı. Bu örnekte, iki array (dizi) tipinde veri içerir.
interface FiltersState {
  selectedBrandFilters: string[];
  selectedModelFilters: string[];
}

// Başlangıç durumu tipi belirtilerek tanımlanır.
const initialState: FiltersState = {
  selectedBrandFilters: [],
  selectedModelFilters: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // PayloadAction ile action.payload'un tipi belirtilir. Bu örnekte her ikisi de string dizisi.
    setBrandFilters: (state, action: PayloadAction<string[]>) => {
      state.selectedBrandFilters = action.payload;
    },
    setModelFilters: (state, action: PayloadAction<string[]>) => {
      state.selectedModelFilters = action.payload;
    },
  },
});

export const { setBrandFilters, setModelFilters } = filtersSlice.actions;

// selectFilters seçicisinde state'in tipi açıkça belirtilmelidir. 
// Redux state yapınıza bağlı olarak bu tipin adı değişebilir.
export const selectFilters = (state: { filters: FiltersState }) => state.filters;

export default filtersSlice.reducer;
