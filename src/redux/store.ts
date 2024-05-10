import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import cardReducer from "./cardSlice";
import { dataReducer } from "./dataSlice";
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";
import sortReducer from "./sortSlice";

// Combined Reducer için bir tip tanımı yapılabilir. Ancak bu basit bir yapı için gerekli değildir.
// Direkt combineReducers fonksiyonu kullanılarak state'in toplam yapısını Redux Toolkit yönetecektir.
const rootReducer = combineReducers({
  card: cardReducer,
  data: dataReducer,
  search: searchReducer,
  filter: filterReducer,
  sort: sortReducer,
});

// Persist konfigürasyonu, 'key' ve kullanılacak storage ile tanımlanır.
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer, rootReducer ile persist konfigürasyonunu kullanarak oluşturulur.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store'u yapılandırırken, TypeScript'in Middleware[] tipini kullanmak için Middleware tipinden bir array oluşturulur.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
