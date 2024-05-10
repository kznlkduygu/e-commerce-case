import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the Product data
export type ProductType = {
  id: string;
  name: string;
  brand: string;
  createdAt: Date;
  description: string;
  image: string;
  model: string;
  price: string;
  quantity: number;
};

// Define the initial state's structure for this slice
type InitialStateType = {
  products: ProductType[];
  searchResults: ProductType[];
  models: ProductType[];
  brands: ProductType[];
  cardItems: ProductType[];
  sortType: string;
  totalcardPrice: number;
};

// Initial state of the global slice
const initialState: InitialStateType = {
  products: [],
  searchResults: [],
  models: [],
  brands: [],
  cardItems: [],
  sortType: "",
  totalcardPrice: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Set the product list
    setProducts(state, action: PayloadAction<ProductType[]>) {
      state.products = action.payload;
    },
    // Set the filtered products based on name search
    setSearchResults(state, action: PayloadAction<ProductType[]>) {
      state.searchResults = action.payload;
    },
    // Set the current sorting option
    setSortType(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
    },
    // Set the filtered models
    setModels(state, action: PayloadAction<ProductType[]>) {
      state.models = action.payload;
    },
    // Set the filtered brands
    setBrands(state, action: PayloadAction<ProductType[]>) {
      state.brands = action.payload;
    },
    // Add or remove items from the card
    updatecard(
      state,
      action: PayloadAction<{
        type: "add" | "remove";
        product: Partial<ProductType> | string;
      }>
    ) {
      const { type, product } = action.payload;
      if (type === "add") {
        const existingItemIndex = state.cardItems.findIndex(
          (item) => item.id === (product as ProductType).id
        );
        if (existingItemIndex !== -1) {
          state.cardItems[existingItemIndex].quantity++;
        } else {
          state.cardItems.push({ ...(product as ProductType), quantity: 1 });
        }
      } else if (type === "remove") {
        const existingItemIndex = state.cardItems.findIndex(
          (item) => item.id === product
        );
        if (existingItemIndex !== -1) {
          if (state.cardItems[existingItemIndex].quantity > 1) {
            state.cardItems[existingItemIndex].quantity--;
          } else {
            state.cardItems.splice(existingItemIndex, 1);
          }
        }
      }
      // Calculate the total price for the card
      state.totalcardPrice = state.cardItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

      // Persist card data to localStorage
      localStorage.setItem("cardItems", JSON.stringify(state.cardItems));
      localStorage.setItem("totalcardPrice", state.totalcardPrice.toString());
    },

    // Load card from localStorage
    loadcard(state) {
      const storedcardItems = localStorage.getItem("cardItems");
      const storedTotalcardPrice = localStorage.getItem("totalcardPrice");

      if (storedcardItems) {
        state.cardItems = JSON.parse(storedcardItems);
      }
      if (storedTotalcardPrice) {
        state.totalcardPrice = parseFloat(storedTotalcardPrice);
      }
    },
  },
});

// Export the actions and reducer
export const {
  setProducts,
  setSearchResults,
  setSortType,
  updatecard,
  loadcard,
  setModels,
  setBrands,
} = productSlice.actions;

export default productSlice.reducer;
