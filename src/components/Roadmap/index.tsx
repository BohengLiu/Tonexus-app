"use client";

import Lottie from "lottie-react";
import Stone1 from "./type1.json";
import Stone2 from "./type2.json";
import Stone3 from "./type3.json";
import { useEffect, useRef } from "react";

export default function RoadMap() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current?.parentNode) {
      containerRef.current.parentNode.addEventListener("scroll", (e) => {
        if (containerRef.current?.parentNode) {
          const distance = (containerRef.current.parentNode as HTMLDivElement).scrollTop - (containerRef.current as HTMLDivElement).offsetTop
          const h = Math.max(0, distance  + 400)
          if (progressBarRef.current) {
            progressBarRef.current.style.height = `${h}px`
          }
        }
      }, false)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-white font-light pt-[142px] pb-[252px] relative">
      <div className="flex justify-center absolute left-0 right-0 top-0 bottom-0 border-y border-white/20">
        <div className="w-[1px] h-full bg-white/20 mx-[155px] shrink-0" />
        <div className="w-[1px] h-full bg-white/20 mx-[155px] shrink-0 pt-[142px] pb-[252px]">
          <div ref={progressBarRef} className="w-[1px] h-[100px] bg-[#EA3206]" />
          <img className="ml-[1px] w-[35px] h-[40px] max-w-[35px] -translate-x-1/2" src="/progress-starship.svg" />
        </div>
        <div className="w-[1px] h-full bg-white/20 mx-[155px] shrink-0" />
        <div className="w-[1px] h-full bg-white/20 mx-[155px] shrink-0" />
        <div className="w-[1px] h-full bg-white/20 mx-[155px] shrink-0" />
      </div>
      <div className="mb-[256px] w-[1244px] h-[400px] grid grid-cols-2 items-center overflow-hidden">
        <div className="h-[398px] flex justify-center items-center">
          <Lottie width={398} height={399} animationData={Stone1} autoplay />
        </div>
        {/* <img src="/type1.svg" /> */}
        <div className="flex flex-col justify-center h-[398px]">
          <h3 className="text-[36px]">TYPE I:10^16</h3>
          <p className="w-[595px] mt-[24px] text-[32px] opacity-60">
            Create ID Bounding System Build Nexus Messaging System Establishing
            global coverage
          </p>
        </div>
      </div>
      <div className="mb-[256px] w-[1244px] h-[400px] grid grid-cols-2">
        <div className="h-[398px] flex justify-center items-center">
          <Lottie width={398} height={399} animationData={Stone2} autoplay />
        </div>
        {/* <img src="/type2.svg" /> */}
        <div className="flex flex-col justify-center h-[398px]">
          <h3 className="text-[36px]">TYPE II:10^26</h3>
          <p className="w-[595px] mt-[24px] text-[32px] opacity-60">
            AI Labeling and Indexing Framework Deploying the ZKP Module
          </p>
        </div>
      </div>
      <div className="w-[1244px] h-[400px] grid grid-cols-2">
        <div className="h-[398px] flex justify-center items-center">
          <Lottie width={398} height={399} animationData={Stone3} autoplay />
        </div>
        {/* <img src="/type3.svg" /> */}
        <div className="flex flex-col justify-center h-[398px]">
          <h3 className="text-[36px]">TYPE III:10^36</h3>
          <p className="w-[595px] mt-[24px] text-[32px] opacity-60">
            Tonexus Satellite Launch Establishment of Cross-Planetary
            Communication
          </p>
        </div>
      </div>
    </div>
  );
}
