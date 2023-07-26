"use client";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";

export default function Content() {
  const searchFn = useSearch();
  const [address, setAddress] = useState("Ef8W1vCpA1tr9xr6QSXSxcVSdn1Sm7SYX_PCWQdClaWhales");
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center flex-grow relative bg-no-repeat" 
      style={{ backgroundImage: "url(/search-bg.svg)", backgroundPosition: "center bottom", backgroundSize: "80%" }}
    >
      <div className="flex flex-col items-center absolute top-[38.2%] -translate-y-[50%]" style={{ top: "calc(38.2% - 80px)"}}>
        <div className="h-[48px] w-[61.8vw] overflow-hidden flex">
          <input
            className="w-full h-full ring-0 outline-none px-5 bg-white mr-3 border border-[#D9D9D9] rounded font-light"
            placeholder="Search wallet transaction..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <button
            className="bg-[#EA3206] px-4 py-1 text-white rounded"
            onClick={() => {
              searchFn(address);
            }}
          >
            Search
          </button>
        </div>
        <span className="mt-4 text-white w-[61.8vw]">
          Track the TON wallet Address/Transaction In Graph...{" "}
        </span>
      </div>
    </div>
  );
}
