import Fuse from "fuse.js";
import LabelTag from "@/components/ui/tags/label-tag";
import { type Lang, useTranslations } from "@/utils/i18n";
import { useDebounce } from "use-debounce";
import { useState } from "react";

export default function TagGroup({
  lang,
  tagMap,
}: {
  lang: Lang;
  tagMap: Map<string, number>;
}) {
  const t = useTranslations(lang);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const numberOfTags = tagMap.size;

  let results: string[] = [];
  if (debouncedQuery !== "") {
    const fuse = new Fuse(Array.from(tagMap.keys()));
    results = fuse.search(debouncedQuery).map((result) => result.item);
  }

  function handleOnSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder={
            t("search.placeholder.firstPart") +
            numberOfTags +
            t("search.placeholder.secondPart.tag")
          }
          className="card-input"
          value={query}
          onChange={handleOnSearch}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {debouncedQuery === ""
          ? Array.from(tagMap.entries())
              .sort((a, b) => b[1] - a[1])
              .map(([tag, count]) => (
                <LabelTag
                  lang={lang}
                  label={tag}
                  count={count}
                  type="link"
                  key={tag}
                  animate={true}
                />
              ))
          : results.map((tag) => (
              <LabelTag
                lang={lang}
                label={tag}
                count={tagMap.get(tag)}
                type="link"
                key={tag}
                animate={true}
              />
            ))}
      </div>
    </div>
  );
}
