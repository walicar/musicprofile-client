const isEmpty = (obj: { [key: string]: any }) => {
  return Object.keys(obj).length === 0;
};

export { isEmpty };
