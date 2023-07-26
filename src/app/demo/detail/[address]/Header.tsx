"use client";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [address, setAddress] = useState("");
  const searchFn = useSearch();
  return (
    <div className="h-[80px] w-full flex items-center justify-between">
      <span className="px-10">
        <Link href="/demo">
          <img src="/tonexus-graph.svg" alt="logo" />
        </Link>
      </span>
      {/* <div className="h-[48px] bg-white w-[61.8vw] rounded-lg overflow-hidden flex px-6 mr-10">
        <input
          className="w-full h-full ring-0 outline-none"
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
      </div> */}
    </div>
  );
}
