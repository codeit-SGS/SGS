"use client";

import { useState, SetStateAction } from "react";
import Slider from "@mui/material/Slider";

export default function Filter() {
  const [selectedWine, setSelectedWine] = useState("White");
  const [priceRange, setPriceRange] = useState([0, 74000]);
  const [selectedRating, setSelectedRating] = useState("4.5 - 5.0");

  const handlePriceChange = (_event: any, newValue: SetStateAction<number[]>) => {
    setPriceRange(newValue);
  };

  const wineTypes = ["Red", "White", "Sparkling"];
  const ratingOptions = ["전체", "4.5 - 5.0", "4.0 - 4.5", "3.5 - 4.0", "3.0 - 3.5"];

  return (
    <div className="bg-none text-white p-4 rounded-xl space-y-6 w-[250px]">

      {/* WINE TYPES */}
      <div className="pb-6 border-b border-[#F2F4F8]">
        <p className="text-lg font-semibold mb-2 text-[#2D3034]">WINE TYPES</p>
        <div className="flex gap-6 pt-12 pb-16">
          {wineTypes.map((type) => (
            <button
              key={type}
              className={`px-10 py-5 rounded-full border ${selectedWine === type
                ? "bg-[#6A42DB] border-[#6A42DB] text-white"
                : "bg-white text-[#2D3034] border-[#CFDBEA]"
                }`}
              onClick={() => setSelectedWine(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="pb-6 border-b border-[#F2F4F8]">
        <p className="text-lg font-semibold mb-2 text-[#2D3034] pt-16 pb-12">PRICE</p>
        <div className="flex justify-between text-[#6A42DB] text-sm mb-1">
          <span>₩{priceRange[0].toLocaleString()}</span>
          <span>₩{priceRange[1].toLocaleString()}</span>
        </div>

        {/* MUI Slider */}
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="off"
          min={0}
          max={100000}
          step={1000}
          sx={{
            color: '#6A42DB',
            '& .MuiSlider-thumb': {
              backgroundColor: '#FFFFFF',
              border: '#CFDBEA',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#6A42DB',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#F2F4F8',
              opacity: 1,
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#FFFFFF',
            },
          }}
        />
      </div>

      {/* RATING */}
      <div>
        <p className="text-lg font-semibold mb-2 text-[#2D3034] pt-16 pb-12">RATING</p>
        <div className="space-y-10 text-sm">
          {ratingOptions.map((option) => (
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRating === option}
                onChange={() => setSelectedRating(option)}
                className="sr-only peer"
              />
              <div className="w-20 h-20 rounded-sm border-2 bg-[#F2F4F8] border-[#CFDBEA] flex items-center justify-center peer-checked:bg-[#E5DFFB] transition-colors">
                <div className={`w-10 h-10 rounded-sm transition-colors ${selectedRating === option ? 'bg-[#6A42DB]' : 'bg-transparent'}`} />
              </div>
              <span className="ml-4 text-sm text-black peer-checked:text-[#6A42DB]">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-24 flex justify-between gap-4">
        <button
          onClick={() => {
            setSelectedWine("White");
            setPriceRange([0, 74000]);
            setSelectedRating("4.5 - 5.0");
          }}
          className="text-md w-1/4 py-7 font-semibold border border-[#F1EDFC] text-[#6A42DB] rounded-lg hover:bg-[#F1EDFC]">
          초기화
        </button>

        <button
          onClick={() => {
            console.log("적용된 필터:", {
              wineType: selectedWine,
              priceRange,
              rating: selectedRating,
            });
          }}
          className="text-md w-3/4 py-7 font-semibold bg-[#6A42DB] text-white rounded-lg hover:bg-[#5a35c6] transition-colors">
          필터 적용하기
        </button>
      </div>
    </div>
  );
}