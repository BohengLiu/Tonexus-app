"use client";
import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Slide2() {
  const smallRef = useRef<HTMLImageElement | null>(null);
  const blurPlanetRef = useRef<HTMLImageElement | null>(null);
  const bigPlanetRef = useRef<HTMLImageElement | null>(null);
  const shipRef = useRef<HTMLImageElement | null>(null);

  const onMouseMove = useCallback((event: any) => {
    // 计算鼠标的位置（范围从-1到1）
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    if (blurPlanetRef.current) {
      blurPlanetRef.current.style.transform = `translateY(${-mouseY * 20}px)`;
    }
    if (bigPlanetRef.current) {
      bigPlanetRef.current.style.transform = `translateY(${-mouseY * 50}px)`;
    }

    if (smallRef.current) {
      smallRef.current.style.transform = `translateY(${-mouseY * 30}px)`;
    }

    if (shipRef.current) {
      let ty = -mouseY * 50;
      let tx = -Math.cos((45 * 2) / Math.PI) * mouseX * 50;
      ty = ty - Math.sin((45 * 2) / Math.PI) * mouseX * 50;
      shipRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, false);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const observerFn = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          // 目标元素进入视窗
          setIsContent1Show(true);
          if (entry.intersectionRatio > 0.38) {
            setIsContent2Show(true);
          }
          if (entry.intersectionRatio > 0.7) {
            setIsContent3Show(true);
          }
        }
      });
    },
    []
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(observerFn, {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }
  }, []);

  const [isContent1Show, setIsContent1Show] = useState(false);
  const [isContent2Show, setIsContent2Show] = useState(false);
  const [isContent3Show, setIsContent3Show] = useState(false);

  return (
    <div ref={containerRef} className="w-full h-[1117px] relative bg-black">
      <img
        ref={smallRef}
        src="/small-planet.svg"
        alt="small-planet"
        className="absolute left-0 top-[68px] h-[240px] transition-transform duration-1000 ease-out"
      />
      <img
        ref={blurPlanetRef}
        src="/blur-planet.svg"
        alt="blur-planet"
        className="absolute right-0 -bottom-[110px] h-[1118px] transition-transform duration-1000 ease-out"
      />
      <img
        src="/star-bg.svg"
        alt="star-bg"
        className="absolute right-[150px] top-[100px]"
      />
      <img
        ref={bigPlanetRef}
        src="/big-planet.svg"
        alt="big-planet"
        className="absolute right-0 top-[270px] transition-transform duration-1000 ease-out"
      />
      <img
        ref={shipRef}
        src="/starship.svg"
        alt="star-ship"
        className="absolute top-[480px] right-[150px] transition-transform duration-1000 ease-out"
      />
      <div className="text-white  absolute top-[174px] left-[100px]">
        <Transition
          show={isContent1Show}
          className="h-[90px] overflow-hidden"
          enter="duration-1000 transition-[transform_opacity]"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <h2 className="text-[60px] font-light">The star, our destination</h2>
        </Transition>
        <Transition
          show={isContent2Show}
          enter="duration-1000 transition-[transform_opacity]"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <p
            className="w-[600px] text-[32px] font-light mt-[70px] opacity-80 leading-[1.6]"
            // style={{ fontFamily: "Roboto monospace" }}
          >
            By resolving Earth&apos;s open communication issues, we pave the way
            for future planetary-scale currency and credit networks.
          </p>
        </Transition>
      </div>

      <div
        className="w-[500px] absolute right-[100px] font-light text-white \
        bottom-[245px] text-[32px] leading-[1.6] opacity-80"
      >
        <Transition
          show={isContent3Show}
          enter="duration-1000 transition-[transform_opacity]"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <span className="font-bold">Tonexus,</span> our star-bridge, embodies
          our commitment to interstellar civilization.
        </Transition>
      </div>
    </div>
  );
}
