'use client'
import useSearch from "@/hooks/useSearch";
import { useState } from "react";

export default function Content() {
  const searchFn = useSearch();
  const [address, setAddress] = useState("");
  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-grow bg-slate-400 relative">
      <div className="flex flex-col items-center absolute top-[38.2%] -translate-y-[50%]">
      <h1 className="text-white my-4 text-4xl font-semibold">Tonexus</h1>
      <div className="h-[48px] bg-white w-[61.8vw] rounded-lg overflow-hidden flex px-6">
        <input
          className="w-full h-full ring-0 outline-none px-5"
          placeholder="Search wallet transaction..."
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <button
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
