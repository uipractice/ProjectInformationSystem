export const getApiUrl = (str) => {
  return `${process.env.REACT_APP_BASE_API}/${str}`;
};
