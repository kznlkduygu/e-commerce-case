import { Item } from "../types/common";

interface FilteredData {
  data: Item[];
  total: number;
}

export function filterAndPaginateData(
  data: Item[],
  currentPage: number,
  sortValue: "dateAsc" | "dateDesc" | "priceAsc" | "priceDesc" | "" | string,
  selectedBrandFilters: string[],
  selectedModelFilters: string[],
  searchValue: string
): FilteredData {
  let newData = [...data];

  if (selectedBrandFilters.length > 0) {
    newData = newData.filter((item) =>
      selectedBrandFilters.includes(item.brand)
    );
  }

  if (selectedModelFilters.length > 0) {
    newData = newData.filter((item) =>
      selectedModelFilters.includes(item.model)
    );
  }

  if (searchValue) {
    newData = newData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (sortValue) {
    newData.sort((a, b) => {
      switch (sortValue) {
        case "dateAsc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "dateDesc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        default:
          return 0; // No sort
      }
    });
  }

  const startIndex = (currentPage - 1) * 12;
  const endIndex = currentPage * 12;
  const filteredData = newData.slice(startIndex, endIndex);
  return { data: filteredData, total: newData.length };
}
