import { useEffect, useState } from "react";
import { Part } from "../../types/invetory";

interface ModalProps {
  parts: Part[];
  setFilteredParts: React.Dispatch<React.SetStateAction<Part[]>>;
}

const Search = ({ parts, setFilteredParts }: ModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParts = parts.filter((part) => {
    const match =
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.code.toLowerCase().includes(searchTerm.toLowerCase());
    return match;
  });

  useEffect(() => {
    setFilteredParts(filteredParts);
  }, [searchTerm]);

  return (
    <div className="flex gap-2">
      <input
        value={searchTerm}
        className="w-full p-3 rounded-lg bg-neutral-600"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
