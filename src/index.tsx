import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./sass/header.scss";
import "./sass/card.scss";
import "./sass/sort.scss";
import "./sass/filter.scss";
import "./sass/basketCard.scss";
import "./sass/checkoutCard.scss";
import "./sass/list.scss";
import "./sass/detail.scss";

import List from "./components/List";
import ProductList  from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path={"/"}
            element={
              <ProductList>
                <Outlet />
              </ProductList>
            }
          >
            <Route index element={<Navigate to={"productList"} />} />
            <Route path={"productList"} element={<List />} />
            <Route path={"productDetail"} element={<Outlet />}>
              <Route path={":id"} element={<ProductDetail/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
