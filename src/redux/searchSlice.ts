import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State'in tipini tanımlayarak başlayabiliriz.
interface SearchState {
  value: any;
  searchValue: string;
}

// Başlangıç durumunu, tanımladığımız tip ile oluşturuyoruz.
const initialState: SearchState = {
  searchValue: '',
  value: ""
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // PayloadAction tipi ile action'un payload'unun tipini belirtiyoruz.
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

// Redux store'unuzun genel yapısına bağlı olarak state tipini belirtmeniz gerekebilir.
export const selectSearchValue = (state: { search: SearchState }) => state.search.searchValue;

export default searchSlice.reducer;
