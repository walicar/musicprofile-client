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
  for (const key in localStorage) {
    if (Object.prototype.isPrototypeOf.call(localStorage, key) && key !== "theme") {
      localStorage.removeItem(key);
    }
  }
};

export { writeLocalStorage, getLocalStorageToken, clearLocalStorage };
