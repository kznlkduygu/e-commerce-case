import React, { useState, useMemo, FC } from "react";
import { useSelector } from "react-redux";
import { Alert, Col, Pagination, Row, Spin } from "antd";
import CardList from "./CardList";
import FilterSort from "./filter/FilterSort";
import { sortData } from "../utils/sortData";
import FiltersComponent from "./filter/FiltersComponent";
import { filterSearchHandler } from "../utils/filterSearchHandler";
import { filterAndPaginateData } from "../utils/filterAndPaginateData";

const List: FC = () => {
  const { data, status, error } = useSelector((state: any) => state.data);
  const { searchValue } = useSelector((state: any) => state.search);
  const filters = useSelector((state: any) => state.filter);
  const sortValue = useSelector((state: any) => state.sort);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandFilterByText, setBrandFilterByText] = useState("");
  const [modelFilterByText, setModelFilterByText] = useState("");

  const brands = useMemo(
    () => filterSearchHandler(data, "brand", brandFilterByText),
    [data, brandFilterByText]
  );
  const models = useMemo(
    () => filterSearchHandler(data, "model", modelFilterByText),
    [data, modelFilterByText]
  );

  const dataToRender = useMemo(
    () =>
      filterAndPaginateData(
        data,
        currentPage,
        sortValue,
        filters.selectedBrandFilters,
        filters.selectedModelFilters,
        searchValue
      ),
    [
      data,
      currentPage,
      sortValue,
      filters.selectedBrandFilters,
      filters.selectedModelFilters,
      searchValue,
    ]
  );

  if (status === "loading") {
    return (
      <Row justify="center"  style={{ height: "50vh", alignContent: "center" }}>
        <Spin tip="Loading..." />
      </Row>
    );
  }
  if (status === "failed") {
    return (
      <Row justify="center" align="middle" style={{ height: "50vh" }}>
        <Col>
          <Alert message="Error" description={error} type="error" showIcon />
        </Col>
      </Row>
    );
  }
  return (
    <Row justify="center" className="list-root">
      <Col lg={6} xs={24}>
        <Row gutter={[32, 24]} justify="center">
          <Col span={20}>
            Sort By
            <FilterSort sortData={sortData} sortValue={sortValue} />
          </Col>
          <Col span={20}>
            Brand
            <FiltersComponent
              brands={brands}
              models={models}
              setBrandFilterByText={setBrandFilterByText}
              setModelFilterByText={setModelFilterByText}
              selectedBrandFilters={filters.selectedBrandFilters}
              selectedModelFilters={filters.selectedModelFilters}
            />
          </Col>
        </Row>
      </Col>
      <Col lg={18} xs={24}>
        <CardList
          data={dataToRender.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
          }))}
        />
        <Col span={24} className={"paginationContainer"}>
          <Pagination
            total={dataToRender.total} // totalData yerine total kullanıldı
            onChange={setCurrentPage}
            current={currentPage} // currentPage yerine current kullanıldı
          />
        </Col>
      </Col>
    </Row>
  );
};

export default List;
