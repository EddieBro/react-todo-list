export const getItem = <T>(key: string): Promise<T | null> => {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return Promise.resolve(null)
  }

  return Promise.resolve((JSON.parse(raw) as T));
}

export const setItem = <T>(key: string, value: T): Promise<T> => {
  localStorage.setItem(key, JSON.stringify(value));
  return Promise.resolve(value);
}
