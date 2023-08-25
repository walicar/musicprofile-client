const writeLocalStorage = (key: string, value: any) => {
  console.log("do u see me writing?");
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

export { writeLocalStorage, getLocalStorageToken };
