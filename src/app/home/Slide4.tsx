"use client";
import { useEffect, useRef } from "react";

export default function Slide4() {
  const symbolRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // containerRef.current.addEventListener(
      //   "mousemove",
      //   (e) => {
      //     if (filterRef.current && symbolRef.current) {
      //       const { clientX, clientY } = e;
      //       console.log(
      //         containerRef.current?.scrollTop,
      //         containerRef.current?.parentNode
      //       );
      //       symbolRef.current.style.top = `${clientY}px`;
      //       symbolRef.current.style.left = `${clientX}px`;
      //     }
      //   },
      //   false
      // );
      // window.addEventListener("mousemove", (e) => {
      //   console.log('window')
      // }, false)
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col relative min-h-[1100px] bg-black"
      style={{ transformStyle: "preserve-3d", perspectiveOrigin: "100% 50%" }}
    >
      <img
        ref={symbolRef}
        src="/right-pic.png"
        alt="symbol"
        className="w-[683px] h-[625px] absolute right-[100px] top-[155px]"
      />
      {/* <div
        ref={filterRef}
        className="w-[610px] h-[610px] rounded-full bg-black/[0.01] blur-[100px] backdrop-blur-[100px] absolute top-[135px] right-[125px]"
        style={{
          transform: "translateZ(1px)",
          mixBlendMode: 'normal'
        }}
      /> */}
      <div className="text-white mt-[210px] ml-[108px] z-10">
        <h2 className="w-[752px] text-[60px] font-light">
          Beyond the Boundaries of Trust
        </h2>
        <p className="whitespace-pre font-light leading-[1.6] text-[32px] opacity-60 mt-[70px]">
          {`We build genuine trust through \nblockchain and math, \neliminating traditional \nbarriers and empowering free \ncommunication and \ncollaboration.`}
        </p>
      </div>
      <div className="w-[596px] mt-[70px] text-white whitespace-pre font-light leading-[1.6] text-[32px] opacity-60 self-center">
        <span className="font-bold">Tonexus</span> serves as the <br />
        constitution in the network <br />
        state, demonstrating our <br />
        commitment to a more equitable <br />
        and open future.
      </div>
    </div>
  );
}
