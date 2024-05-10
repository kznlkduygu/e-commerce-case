import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Bir ürünün ID ve fiyat bilgisini taşıyan tip tanımı
type ItemPayload = {
  id: string;
  price: number;
};

// Başlangıç durumunun tipini tanımlayın
interface cardState {
  items: Record<string, number>;
  totalPrice: number;
}

const initialState: cardState = {
  items: {},
  totalPrice: 0,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemPayload>) => {
      const itemId = action.payload.id;
      if (state.items[itemId]) {
        state.items[itemId] += 1;
      } else {
        state.items[itemId] = 1;
      }
      state.totalPrice += +action.payload.price;
    },
    removeItem: (state, action: PayloadAction<ItemPayload>) => {
      const itemId = action.payload.id;
      if (state.items[itemId]) {
        state.items[itemId] -= 1;
        state.totalPrice -= +action.payload.price;
        if (state.items[itemId] === 0) {
          delete state.items[itemId];
        }
      }
    },
  },
});

export const { addItem, removeItem } = cardSlice.actions;
export const selectItems = (state: { card: cardState }) => state.card.items;
export const selectTotalPrice = (state: { card: cardState }) =>
  state.card.totalPrice;
export default cardSlice.reducer;
