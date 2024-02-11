"use client";
import { baseGenders, baseTags } from "@/data/general";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

const SideMenu = (props: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const genders = searchParams.get("genders");
  const tags = searchParams.get("tags");
  const gendersArray = genders ? genders.split("&&") : [];
  const tagsArray = tags ? tags.split("&&") : [];
  const params = new URLSearchParams(searchParams);
  const handleGenders = (gender: string) => {
    const currentGenders = params.get("genders");
    if (!currentGenders) {
      params.set("genders", gender);
    } else {
      const gendersArray = currentGenders.split("&&");
      const genderIndex = gendersArray.indexOf(gender);
      if (genderIndex === -1) {
        gendersArray.push(gender);
      } else {
        gendersArray.splice(genderIndex, 1);
      }
      if (gendersArray.length > 0) {
        params.set("genders", gendersArray.join("&&"));
      } else {
        params.delete("genders");
      }
    }
    push(`${pathname}?${params.toString()}`);
  };
  const handleGendersReset = () => {
    params.delete("genders");
    push(`${pathname}?${params.toString()}`);
  };
  const handleTags = (tag: string) => {
    const currentTags = params.get("tags");
    if (!currentTags) {
      params.set("tags", tag);
    } else {
      const tagsArray = currentTags.split("&&");
      const tagIndex = tagsArray.indexOf(tag);
      if (tagIndex === -1) {
        tagsArray.push(tag);
      } else {
        tagsArray.splice(tagIndex, 1);
      }
      if (tagsArray.length > 0) {
        params.set("tags", tagsArray.join("&&"));
      } else {
        params.delete("tags");
      }
    }
    push(`${pathname}?${params.toString()}`);
  };
  const handleTagsReset = () => {
    params.delete("tags");
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 left-0 flex flex-col p-2 gap-2 w-64 h-screen">
      <details className="rounded border border-gray-300 group" open>
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Generos </span>
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
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={handleGendersReset}
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
                    className="size-5 rounded border-gray-300 checked:bg-rose-600"
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
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={handleTagsReset}
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
                    className="size-5 rounded border-gray-300 checked:bg-rose-600"
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
  );
};

export default SideMenu;
