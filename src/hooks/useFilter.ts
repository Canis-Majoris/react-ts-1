import { useReducer } from "react";

type FilterValue = Object;

type Filters = Object;

const useFilter = (initialFilterValues = {}, initialFilters = {}) => {
  const [filterValues, setFilterValues] = useReducer(
    (oldState: FilterValue, newState: Partial<FilterValue>) => ({ ...oldState, ...newState }),
    { ...initialFilterValues }
  );

  const [filters, setFilters] = useReducer(
    (oldState: Filters, newState: Partial<Filters>) => ({ ...oldState, ...newState }),
    { ...initialFilters }
  );

  const filterItem = (item: any): boolean | any => {
    return Object.keys(filters).reduce((status, key) => {
      if (status && filters[key]) {
        if (!filters[key](item, filterValues)) return false;
      }

      return status;
    }, true);
  };

  return { filterItem, filters, setFilters, filterValues, setFilterValues };
};

export default useFilter;
