export const loadFromLocalStorage = (
  key,
  options = { isPrimitive: false }
): any => {
  if (options.isPrimitive) {
    return localStorage.getItem(key);
  }
  try {
    const serializedItem = localStorage.getItem(key);
    return JSON.parse(serializedItem);
  } catch (err) {
    return undefined;
  }
};

export const saveToLocalStorage = (
  key,
  item,
  options = { isPrimitive: false }
): void => {
  if (options.isPrimitive) {
    localStorage.setItem(key, item);
  } else {
    try {
      const serializedItem = JSON.stringify(item);
      localStorage.setItem(key, serializedItem);
    } catch (err) {
      throw new Error(err);
    }
  }
};

export const deleteFromLocalStorage = (key): void => {
  localStorage.removeItem(key);
};
