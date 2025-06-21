"use client";

import React, { useState } from 'react';
import Image from 'next/image';

type SearchProps = {
  onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* search 아이콘 */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none pl-10">
        <Image
          src="/icon/search.svg"
          alt="Search Icon"
          width={20}
          height={20}
        />
      </div>

      {/* 검색 input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="와인을 검색해 보세요"
        className="w-800 h-48 pl-50 pr-4 py-2 rounded-full border border-gray-300 bg-white text-16 text-gray-500 placeholder-gray-400"
      />
    </div>
  );
}