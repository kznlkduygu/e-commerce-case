import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State tipi için bir enum kullanabiliriz, çünkü sort değerleri sınırlı ve önceden tanımlanabilir.
enum SortOrder {
  DateAsc = 'dateAsc',
  DateDesc = 'dateDesc',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc'
}

// Başlangıç durumu, bu enum tipinden bir değer alır.
const initialState: SortOrder = SortOrder.DateAsc;

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    // PayloadAction kullanarak action.payload'ın SortOrder tipinden olacağını belirtiyoruz.
    setSortValue: (state, action: PayloadAction<any>) => {
      return action.payload;  // state'i güncelleme işlemi
    },
  },
});

export const { setSortValue } = sortSlice.actions;

// Redux store'unuzun genel yapısına bağlı olarak state tipini belirtmeniz gerekebilir.
export const selectSortValue = (state: { sort: SortOrder }) => state.sort;

export default sortSlice.reducer;
