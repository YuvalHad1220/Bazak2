import { useState } from 'react';

const useCache = (key: string,  factoryFunction: () => any) => {
  const storedValue = localStorage.getItem(key);
  const initialCacheValue = storedValue
    ? JSON.parse(storedValue)
    : { value: factoryFunction() };

  const [cacheValue, setCacheValue] = useState(initialCacheValue);

  const updateCache = (value: any) => {
    const newCacheValue = { value };
    setCacheValue(newCacheValue);
    localStorage.setItem(key, JSON.stringify(newCacheValue));
  };

  const invalidateCache = () => {
    localStorage.removeItem(key);
  };

  return [cacheValue.value, updateCache, invalidateCache];
};

export default useCache;