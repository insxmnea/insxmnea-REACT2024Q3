const loadHistory = (): string[] => {
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  return history;
};

const saveHistory = (history: string[]) => {
  localStorage.setItem("searchHistory", JSON.stringify(history));
};

const updateHistory = (query: string): string[] => {
  let history = loadHistory();

  if (query.trim() === "") {
    return history;
  }

  history = history.filter((item) => item !== query);
  history.unshift(query);

  if (history.length > 10) {
    history.pop();
  }
  saveHistory(history);

  return history;
};

export default { loadHistory, updateHistory };
