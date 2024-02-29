import { baseGenders, baseTags } from "@/data/general";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  isSearch: boolean;
};

const SearchBar = ({ isSearch }: Props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = (search: string, type?: string) => {
    setSearch("");
    if (type) return router.push(`/products?${type}=${search}`);
    return router.push(`/products/${search}`);
  };
  return (
    <div
      className={`${
        isSearch ? "flex" : "hidden"
      } gap-1 justify-center p-2 w-full`}
    >
      <div className="relative w-full sm:w-auto">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="w-full border p-2 rounded-l-md"
        />
        {search && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white w-full flex flex-col">
            <div className="flex flex-col px-4">
              {baseTags.some((tag) => tag.name.includes(search)) && (
                <span className="text-gray-700 font-bold mb-1">Etiquetas</span>
              )}
              {baseTags
                .filter((tag) => tag.name.includes(search))
                .map((tag) => (
                  <span
                    onClick={() => handleSearch(tag.name, "tags")}
                    key={tag.name}
                    className="p-1 hover:bg-gray-100 cursor-pointer rounded-md transition duration-300"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
            <div className="flex flex-col px-4">
              {baseGenders.some((gender) => gender.name.includes(search)) && (
                <span className="text-gray-700 font-bold mb-1">Géneros</span>
              )}
              {baseGenders
                .filter((gender) => gender.name.includes(search))
                .map((gender) => (
                  <span
                    onClick={() => handleSearch(gender.name, "genders")}
                    key={gender.name}
                    className="p-1 hover:bg-gray-100 cursor-pointer rounded-md transition duration-300"
                  >
                    {gender.name}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleSearch(search)}
        className="border p-2 rounded-r-md bg-rose-600 text-white hover:bg-rose-700 transition duration-300"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;