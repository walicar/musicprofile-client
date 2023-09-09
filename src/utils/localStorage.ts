const writeLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageToken = (key: string) => {
  const token = localStorage.getItem(key);
  if (token) {
    return JSON.parse(token);
  } else {
    return undefined;
  }
};

const clearLocalStorage = () => {
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key !== "theme") {
      localStorage.removeItem(key);
    }
  }
};

export { writeLocalStorage, getLocalStorageToken, clearLocalStorage };
