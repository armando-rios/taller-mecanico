import { useEffect, useState } from "react";

interface SearchProps<T> {
  data: T[];
  setFilteredData: React.Dispatch<React.SetStateAction<T[]>>;
  searchFn: (item: T, searchTerm: string) => boolean;
  placeholder?: string;
}

function Search<T>({
  data,
  setFilteredData,
  searchFn,
  placeholder = "Buscar...",
}: SearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = data.filter((item) => searchFn(item, searchTerm));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 rounded-lg bg-neutral-600"
    />
  );
}

export default Search;
