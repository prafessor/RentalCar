export const isEqualFilters = (curretFilters, newFilters) => {
  const keys = Object.keys(curretFilters);
  return keys.every(key => curretFilters[key] === newFilters[key]);
};
