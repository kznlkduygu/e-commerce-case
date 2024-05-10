import { GenericItem } from "../types/common";

export const filterSearchHandler = <T extends GenericItem>(
  data: T[],
  field: keyof T,
  filterVal: string
): string[] => {
  const array = [...new Set(data?.map((item) => item[field]))];
  const filteredArray: string[] = array?.filter((item) =>
    item?.includes(filterVal.toLowerCase())
  );
  return filteredArray;
};
