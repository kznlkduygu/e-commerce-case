import React, { useState, useMemo, useCallback } from "react";
import { Row, Col, Input, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { setSearchValue } from "../redux/searchSlice";
import { setBrandFilters, setModelFilters } from "../redux/filterSlice";
import { setSortValue } from "../redux/sortSlice";
import { RootState } from "../redux/store";
import BasketCard from "./cards/BasketCard";
import Sort from "./Sort";
import Filter from "./Filter";
import { sortData } from "../utils/sortData";
import { filterSearchHandler } from "../utils/filterSearchHandler";

const { Search } = Input;

interface HeaderProps {
  onClick?: () => void;
  user?: string;
}

const Header: React.FC<HeaderProps> = ({ onClick, user = "Duygu" }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [brandFilter, setBrandFilter] = useState<string>("");
  const [modelFilter, setModelFilter] = useState<string>("");

  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const totalPrice = useSelector((state: RootState) => state.card.totalPrice);
  const filters = useSelector((state: RootState) => state.filter);
  const sortValue = useSelector((state: RootState) => state.sort);
  const data = useSelector((state: RootState) => state.data);
  const card = useSelector((state: RootState) => state.card);

  const brands = useMemo(
    () => filterSearchHandler(data.items, "brand", brandFilter),
    [data, brandFilter]
  );
  const models = useMemo(
    () => filterSearchHandler(data.items, "model", modelFilter),
    [data, modelFilter]
  );

  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchValue(e.target.value));
    },
    [dispatch]
  );

  const toggleMenu = useCallback(() => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
  }, []);

  const handleBrandFilterChange = (filters: string[]) => {
    dispatch(setBrandFilters(filters));
  };

  const handleModelFilterChange = (filters: string[]) => {
    dispatch(setModelFilters(filters));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortValue(value));
  };

  return (
    <>
      <Row
        align={"middle"}
        justify="space-around"
        className={"header-root"}
        gutter={[16, 16]}
      >
        <Col xs={22} sm={22} md={8} lg={3} xl={3}>
          <div className={"home"} onClick={onClick}>
            Eteration
          </div>
        </Col>
        <Col xs={2} sm={0}>
          <MenuOutlined
            style={{ fontSize: "24px", color: "white" }}
            onClick={toggleMenu}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={11} xl={11}>
          <Search
            placeholder="Search"
            onChange={handleSearch}
            value={searchValue}
          />
        </Col>
        <Col xs={0} sm={0} md={2} lg={0}>
          <MenuOutlined
            style={{ fontSize: "24px", color: "white" }}
            onClick={toggleMenu}
          />
        </Col>
        <Col
          xs={0}
          sm={0}
          md={4}
          lg={3}
          xl={3}
          className={"totalPriceContainer"}
        >
          <ShoppingCartOutlined style={{ fontSize: "24px", color: "white" }} />
          <div className={"totalPrice"}>{totalPrice && `${totalPrice} $`}</div>
        </Col>
        <Col xs={0} sm={0} md={4} lg={3} xl={3} className={"userContainer"}>
          <UserOutlined style={{ fontSize: "22px", color: "white" }} />
          <div className={"user"}>{user}</div>
        </Col>
      </Row>
      <Drawer
        placement="right"
        onClose={toggleMenu}
        open={menuVisible}
        className={"drawer"}
        width="80%"
        maskClosable={true}
      >
        <div className={"menuContent"}>
          <Row gutter={[32, 24]} justify="center">
            <Col span={10} className={"drawerTotalPriceContainer"}>
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "black" }}
              />
              {/* <div className={classNames(styles.totalPrice, styles.drawer)}> */}
              <div>{totalPrice && `${totalPrice} $`}</div>
            </Col>
            <Col span={10} className={"drawerUserContainer"}>
              <UserOutlined style={{ fontSize: "22px", color: "black" }} />
              {/* <div className={classNames(styles.user, styles.drawer)}> */}
              <div>{user}</div>
            </Col>
            <Col span={20}>
              Sort By
              <Sort
                data={sortData}
                onChange={handleSortChange}
                value={sortValue}
              />
            </Col>
            <Col span={20}>
              Brand
              <Filter
                data={brands}
                onChange={handleBrandFilterChange}
                handleSearch={setBrandFilter}
                value={filters.selectedBrandFilters}
              />
            </Col>
            <Col span={20}>
              Model
              <Filter
                data={models}
                onChange={handleModelFilterChange}
                handleSearch={setModelFilter}
                value={filters.selectedModelFilters}
              />
            </Col>
            <Col span={20}>
              Card
              <BasketCard items={card.items} />
            </Col>
          </Row>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
