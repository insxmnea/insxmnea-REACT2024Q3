import { useState } from "react";

const key = "searchHistory";

export const useHistory = () => {
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } else {
      return [];
    }
  });

  const updateHistory = (query: string) => {
    if (query.trim() === "") return;

    const newHistory = history.filter((item) => item !== query);

    newHistory.unshift(query.trim());
    if (newHistory.length > 10) {
      newHistory.pop();
    }

    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  return [history, updateHistory] as const;
};
