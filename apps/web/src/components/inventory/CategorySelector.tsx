import { Category } from "../../types/inventory";

interface CategorySelectorProps {
  categories: Category[];
  category: string;
  setCategory: (category: string) => void;
  onCreateClick: () => void;
}

const CategorySelector = ({
  categories,
  category,
  setCategory,
  onCreateClick,
}: CategorySelectorProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">Categoría</label>
      <div className="flex space-x-2">
        <select
          required
          className="w-full bg-neutral-700 border border-gray-600 rounded-lg p-2.5"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categories.map((cat: Category) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="px-3 py-2 bg-orange-700 rounded-lg hover:bg-orange-800 transition"
          onClick={onCreateClick}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
