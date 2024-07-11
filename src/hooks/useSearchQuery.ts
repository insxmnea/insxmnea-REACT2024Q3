import { useEffect, useState } from "react";

const key = "searchQuery";

const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => {
    return JSON.parse(localStorage.getItem(key) || `""`);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(query.trim()));
  }, [query]);

  return [query, setQuery] as const;
};

export default useSearchQuery;
