"use client";
import { useEffect, useRef } from "react";

export default function Slide6() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      // document.addEventListener('scroll', (e) => {
      //   if (bgRef.current) {
      //     const rectObj = bgRef.current.getBoundingClientRect();
      //     const rate = - (rectObj.y / rectObj.width)
      //     console.log(rate)
      //     if (rate > 0.3) {
      //       bgRef.current.style.transform = `translateY(${Math.min(rate - 0.3, 0.7) * 50}%)`
      //     }
      //   }
      // })
    }
  }, []);
  return (
    <div
      className="w-screen h-[85vw] relative "
      style={{ transformStyle: "preserve-3d", perspectiveOrigin: "100% 50%" }}
    >
      <img
        ref={bgRef}
        src="/open-world-bg.svg"
        className="w-full transition-transform"
        alt="open-world"
        // style={{ transform: "translateZ(-1px) scale(2)" }}
      />
      <div className="absolute top-[30vw] font-light text-white left-0 right-0 flex justify-center flex-col items-center">
        <h2 className="text-[60px]">An Open World</h2>
        <p className="text-[32px] opacity-80 max-w-[1100px] mt-[70px]">
          <span className="font-bold">Tonexus</span> is an open-source, globally
          shared social layer. In this world, everyone can contribute their
          strength, and everyone&apos;s voice will be heard. Sovereign nations
          can&apos;t restrict you, and you truly own your data and identity.
        </p>
      </div>
      <img
        src="/city.svg"
        className="-mt-[20vw] relative w-full"
        style={{ transform: "translateZ(16px) scale(0.84)" }}
        alt="city"
      />
    </div>
  );
}
