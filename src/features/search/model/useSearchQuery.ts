import { useEffect, useState } from "react";

const key = "searchQuery";

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) || `""`);
    } else {
      return "";
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(query.trim()));
  }, [query]);

  return [query, setQuery] as const;
};
