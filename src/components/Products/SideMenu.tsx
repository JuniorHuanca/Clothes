"use client";
import {
  baseGenders,
  baseTags,
  sortByTypes,
  sortByTypesTranslate,
} from "@/data/general";
import { AlignRight, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {};

const SideMenu = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const genders = searchParams.get("genders");
  const tags = searchParams.get("tags");
  const sort = searchParams.get("sort");
  const gendersArray = genders ? genders.split("-") : [];
  const tagsArray = tags ? tags.split("-") : [];
  const params = new URLSearchParams(searchParams);
  const updateSearchParams = (key: string, value: string | null) => {
    params.delete("page");
    if (value) {
      const currentValue = params.get(key);
      if (!currentValue) {
        params.set(key, value);
      } else {
        const valueArray = currentValue.split("-");
        const valueIndex = valueArray.indexOf(value);
        if (valueIndex === -1) {
          valueArray.push(value);
        } else {
          valueArray.splice(valueIndex, 1);
        }
        if (valueArray.length > 0) {
          params.set(key, valueArray.join("-"));
        } else {
          params.delete(key);
        }
      }
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleGenders = (gender: string) => {
    updateSearchParams("genders", gender);
  };

  const handleGendersReset = () => {
    updateSearchParams("genders", null);
  };

  const handleTags = (tag: string) => {
    updateSearchParams("tags", tag);
  };

  const handleTagsReset = () => {
    updateSearchParams("tags", null);
  };

  const handleSort = (sort: string) => {
    params.delete("page");
    params.set("sort", sort);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSortReset = () => {
    updateSearchParams("sort", null);
  };

  return (
    <div className="relative">
      <button
        className="block lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-rose-600 text-white rounded-full shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <AlignRight />
      </button>
      <div
        className={`${
          isMenuOpen ? "fixed" : "hidden"
        } w-full bg-white z-20 lg:bg-transparent lg:block lg:sticky top-0 left-0 flex flex-col p-2 gap-2 lg:w-64 h-screen overflow-y-auto`}
      >
        <details className="rounded border border-gray-300 group">
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Ordenar </span>
            <span className="transition group-open:-rotate-180">
              <ChevronDown />
            </span>
          </summary>

          <div className="border-t border-gray-200">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {sort ? "Activado" : "Desactivado"}
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4 disabled:opacity-50"
                onClick={handleSortReset}
                disabled={!sort}
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              {sortByTypes.map((e) => (
                <li key={e.name}>
                  <label
                    htmlFor={e.name}
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      id={e.name}
                      onChange={() => handleSort(e.name)}
                      className="size-5 rounded border-gray-300"
                      checked={sort === e.name}
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {sortByTypesTranslate[e.name]}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="rounded border border-gray-300 group" open>
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Géneros </span>
            <span className="transition group-open:-rotate-180">
              <ChevronDown />
            </span>
          </summary>

          <div className="border-t border-gray-200">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {gendersArray.length} Seleccionados
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4 disabled:opacity-50"
                onClick={handleGendersReset}
                disabled={!gendersArray.length}
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              {baseGenders.map((e) => (
                <li key={e.name}>
                  <label
                    htmlFor={e.name}
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={e.name}
                      onChange={() => handleGenders(e.name)}
                      className="size-5 rounded border-gray-300"
                      checked={gendersArray.includes(e.name)}
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {e.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="rounded border border-gray-300 group" open>
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Etiquetas </span>
            <span className="transition group-open:-rotate-180">
              <ChevronDown />
            </span>
          </summary>

          <div className="border-t border-gray-200">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {tagsArray.length} Seleccionados
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4 disabled:opacity-50"
                onClick={handleTagsReset}
                disabled={!tagsArray.length}
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              {baseTags.map((e) => (
                <li key={e.name}>
                  <label
                    htmlFor={e.name}
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={e.name}
                      onChange={() => handleTags(e.name)}
                      className="size-5 rounded border-gray-300"
                      checked={tagsArray.includes(e.name)}
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {e.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default SideMenu;
