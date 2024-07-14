import { useState } from "react";

const key = "searchHistory";

const useHistory = () => {
  const [history, setHistory] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem(key) || "[]");
  });

  const updateHistory = (query: string) => {
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

export default useHistory;
