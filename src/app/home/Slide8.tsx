"use client";
import { useState, useRef, useCallback, useEffect } from "react";

export default function Slide8() {
  const [isStage1, setIsStage1] = useState(true);
  const [isShowDawn, setShowDawn] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dawnRef = useRef<HTMLImageElement | null>(null);

  const observerFn = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > 0.5 &&
          entry.target === containerRef.current
        ) {
          // 目标元素进入视窗
          setIsStage1(false);
        }
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > 0.3 &&
          entry.target === dawnRef.current
        ) {
          setShowDawn(true);
        }
      });
    },
    []
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(observerFn, {
      threshold: [0, 0.3, 0.6],
    });
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }
    if (dawnRef.current) {
      observerRef.current.observe(dawnRef.current);
    }
  }, [observerFn]);


  return (
    <div className="relative flex flex-col items-center bg-black">
      <h2 className="text-[60px] text-center text-white font-light pb-[90px]">Digital Contract</h2>
      <div ref={containerRef} className="relative text-white font-light">
        <img
          src="/orbit.svg"
          alt="orbit"
          className="transition-scale"
          style={{ scale: isStage1 ? 0 : 1, transitionDuration: "2000ms" }}
        />
        <span
          className="absolute right-[50%] bottom-[50%] -translate-x-[250px] text-white/60 -translate-y-[165px] text-[24px] whitespace-nowrap"
          style={{
            opacity: isStage1 ? 0 : 60,
            transitionDuration: "4000ms",
            transitionProperty: "opacity",
          }}
        >
          Digital Ownership
        </span>
        <img
          src="/digital-ownership.svg"
          alt="digital-ownership"
          className="absolute left-[50%] top-[50%] transition-transform"
          style={{
            transform: isStage1
              ? "translate(-45px, -45px)"
              : "translate(-224px, -224px)",
            transitionDuration: "2000ms",
          }}
        />
        <span
          className="absolute left-[50%] bottom-[50%] translate-x-[250px] text-white/60 -translate-y-[165px] text-[24px] whitespace-nowrap"
          style={{
            opacity: isStage1 ? 0 : 60,
            transitionDuration: "4000ms",
            transitionProperty: "opacity",
          }}
        >
          Monetary authority
        </span>
        <img
          src="/monetary-authority.svg"
          alt="monetary-authority"
          className="absolute left-[50%] top-[50%] transition-transform"
          style={{
            transform: isStage1
              ? "translate(-45px, -45px)"
              : "translate(134px, -224px)",
            transitionDuration: "2000ms",
          }}
        />
        <span
          className="absolute right-[50%] bottom-[50%] -translate-x-[340px] translate-y-[16px] text-white/60 text-[24px] whitespace-nowrap"
          style={{
            opacity: isStage1 ? 0 : 60,
            transitionDuration: "4000ms",
            transitionProperty: "opacity",
          }}
        >
          Open Source
        </span>
        <img
          src="/open-source.svg"
          alt="open-source"
          className="absolute left-[50%] top-[50%] transition-transform"
          style={{
            transform: isStage1
              ? "translate(-45px, -45px)"
              : "translate(-300px, -45px)",
            transitionDuration: "2000ms",
          }}
        />
        <span
          className="absolute left-[50%] bottom-[50%] translate-x-[340px] translate-y-[16px] text-[24px] text-white/60 whitespace-nowrap"
          style={{
            opacity: isStage1 ? 0 : 60,
            transitionDuration: "4000ms",
            transitionProperty: "opacity",
          }}
        >
          Trustless network
        </span>
        <img
          src="/trustless-network.svg"
          alt="trustless-network"
          className="absolute left-[50%] top-[50%] transition-transform"
          style={{
            transform: isStage1
              ? "translate(-45px, -45px)"
              : "translate(210px, -45px)",
            transitionDuration: "2000ms",
          }}
        />
        <span
          className="absolute right-[50%] top-[50%] -translate-x-[250px] text-white/60 translate-y-[165px] text-[24px] whitespace-nowrap"
          style={{
            opacity: isStage1 ? 0 : 60,
            transitionDuration: "4000ms",
            transitionProperty: "opacity",
          }}
        >
          Nexus credit system
        </span>
        <img
          src="/nexus-credit-system.svg"
          alt="nexus-credit-system"
          className="absolute left-[50%] top-[50%] transition-transform"
          style={{
            transform: isStage1
              ? "translate(-45px, -45px)"
              : "translate(-224px, 135px)",
            transitionDuration: "2000ms",
          }}
        />
        <span
          className="absolute left-[50%] top-[50%] translate-x-[250px] text-white/60 translate-y-[165px] text-[24px] whitespace-nowrap"
          style={{
            opacity: isStage1 ? 0 : 100,
            transitionDuration: "4000ms",
            transitionProperty: "opacity",
          }}
        >
          Nexus identity
        </span>
        <img
          src="/nexus-identity.svg"
          alt="nexus-identity"
          className="absolute left-[50%] top-[50%] transition-transform"
          style={{
            transform: isStage1
              ? "translate(-45px, -45px)"
              : "translate(134px, 135px)",
            transitionDuration: "2000ms",
          }}
        />
        <img
          src="/black-logo.svg"
          alt="logo"
          className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <img
        className={`w-[17.77vw] z-10 transition-opacity duration-[3000ms] ${
          isShowDawn ? "opacity-100" : "opacity-0"
        }`}
        src="/ray.svg"
        alt="ray"
      />
      <img
        className={`z-[15] -mt-[15vw] transition-opacity duration-[3000ms] ${
          isShowDawn ? "opacity-100" : "opacity-0"
        }`}
        src="/dawn-planet.svg"
        alt="dawn-planet"
      />
      <div className="w-screen -mt-[25.5vw] relative">
        <img
          ref={dawnRef}
          className={`w-screen transition-opacity duration-[3000ms] ${
            isShowDawn ? "opacity-100" : "opacity-0"
          }`}
          src="/dawn.svg"
          alt="dawn"
        />
        <div className="absolute left-[50%] top-[40vw] text-[32px] opacity-80 text-white z-[20] text-center font-light -translate-x-1/2">
          Solve the trust issues
          <br />
          between future <br />
          interstellar planets by <br />
          unifying the social layer <br />
          ID of humanity.
        </div>
        <div className="w-full flex justify-center py-[80px] absolute bottom-0 border-y border-[#333]">
          <img src="/formula.svg" alt="formula" />
        </div>
      </div>
    </div>
  );
}
