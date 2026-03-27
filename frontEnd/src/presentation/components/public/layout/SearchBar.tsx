"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, KeyboardEvent, useEffect } from "react";
import { useTranslation } from "@/src/presentation/context/LanguageContext";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  
  // Update local state if URL param changes (e.g., when navigating back/forward)
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/shop/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push(`/shop/search`);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-8">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t.common.searchPlaceholder}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm outline-none"
        />
        <Search 
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-indigo-600 transition-colors" 
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}