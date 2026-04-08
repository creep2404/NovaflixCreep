const KEY = "search_history";

export const getSearchHistory = (): string[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveSearchHistory = (query: string) => {
  if (!query.trim()) return;

  const history = getSearchHistory();

  const newHistory = [
    query,
    ...history.filter((item) => item !== query),
  ].slice(0, 5); // giữ tối đa 5

  localStorage.setItem(KEY, JSON.stringify(newHistory));
};