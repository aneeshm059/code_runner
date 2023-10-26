import React from "react";
import { languageOptions } from "../../constants/languageOptions";

const NavBar = ({ runButtonHandler, languageHandler }) => {
  const langOption = languageOptions.map((language) => {
    if (language.value === "javascript") {
      return (
        <option key={language.id} value={language.value} selected>
          {language.name}
        </option>
      );
    } else {
      return (
        <option key={language.id} value={language.value}>
          {language.name}
        </option>
      );
    }
  });
  return (
    <div className="flex justify-between items-start mt-0 py-4 px-8 border shadow shadow-gray-200 bg-white text-slate-600">
      <div>Code Runner &lt; / &gt;</div>
      <div className="flex justify-end space-x-8 text-sm">
        <button
          className="hover:border hover:rounded hover:border-bg-black"
          onClick={runButtonHandler}
        >
          <svg
            fill="#000000"
            height="15px"
            width="15px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 60.00 60.00"
            stroke="#000000"
            stroke-width="0.0006000000000000001"
            className="inline-block pb-1"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path>
                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
              </g>
            </g>
          </svg>
          <div className="group inline-block">
            <span>Run</span>
          </div>
        </button>
        <div>
          <select
            id="countries"
            className="text-sm block focus:outline-none"
            onChange={(event) => languageHandler(event.target.value)}
          >
            {langOption}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
