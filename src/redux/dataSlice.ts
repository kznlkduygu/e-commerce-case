import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Ürün verisini tanımlayan bir tip. API'dan dönen veri yapısına göre düzenleyiniz.
interface Product {
  id: string;
  name: string;
  price: number;
}

// State için tip tanımı
interface DataState {
  items: any;
  data: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
  items: undefined
};

// Async thunk tanımı, dönüş tipi olarak Product dizisi belirtilir.
export const fetchData = createAsyncThunk<Product[]>(
  'data/fetchData',
  async () => {
    try {
      const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products');
      console.log("response", response);
      return response.data;  // Axios otomatik olarak JSON'u parse eder
    } catch (error) {
      // Eğer bir hata oluşursa, bu hata Redux thunk tarafından otomatik olarak yakalanacak ve rejected state'e düşecektir.
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        // TypeScript'de, action.error bir objedir, bu nedenle mesaj için .message kullanıyoruz.
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { reducer: dataReducer } = dataSlice;
