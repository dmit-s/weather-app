import { useState, useEffect } from "react";

export const useSearchSuggestions = (search, suggestions) => {
  const [filteredSugg, setFilteredSugg] = useState([]);

  useEffect(() => {
    setFilteredSugg(() =>
      suggestions.filter((item) =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  }, [search, suggestions]);

  return filteredSugg;
};
