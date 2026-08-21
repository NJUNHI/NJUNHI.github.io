"use client";

import { useMemo, useState } from "react";
import type { SearchEntry } from "../data/wiki";

export function SearchPanel({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(
    () => normalized ? entries.filter((entry) => entry.searchText.includes(normalized)).slice(0, 6) : [],
    [entries, normalized],
  );

  return (
    <div className="search-box">
      <label htmlFor="wiki-search">搜索课程、科研、生活、办事……</label>
      <div className="search-input-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          id="wiki-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例如：课程、苏州校区、双学位"
          autoComplete="off"
        />
        <kbd>搜索</kbd>
      </div>
      {normalized && (
        <div className="search-results" role="status" aria-live="polite">
          {matches.length ? matches.map((entry) => (
            <a href={entry.href} key={`${entry.href}-${entry.title}`}>
              <span>{entry.category}</span>
              <strong>{entry.title}</strong>
              <small>{entry.description}</small>
            </a>
          )) : <p>没找到。可以先记在待补充里。</p>}
        </div>
      )}
    </div>
  );
}
