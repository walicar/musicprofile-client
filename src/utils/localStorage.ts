const writeLocalStorage = (key: string, value: any) => {
  console.log("do u see me writing?");
  localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { writeLocalStorage, removeLocalStorage };
