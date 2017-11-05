export const getResultKey = (query, typeObj) => {
  const types = Object.keys(typeObj).filter(k => typeObj[k]);
  return `${query}?types=[${types.join(',')}]`;
};