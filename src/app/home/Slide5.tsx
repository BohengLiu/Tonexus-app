"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Slide5() {
  const leftHandRef = useRef<HTMLImageElement | null>(null);
  const coreRef = useRef<HTMLImageElement | null>(null);
  const rightHandRef = useRef<HTMLImageElement | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isShow, setIsShow] = useState(false);

  const onMouseMove = useCallback((event: any) => {
    // 计算鼠标的位置（范围从-1到1）
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;


    if (leftHandRef.current) {
      let ty = -mouseY * 50;
      let tx = mouseX * 50 + 100;

      leftHandRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
    }

    if (rightHandRef.current) {
      let ty = mouseY * 50;
      let tx = mouseX * 50 - 100;

      rightHandRef.current.style.transform = `translate(${tx}px, ${0}px)`;
    }
    // // 根据鼠标的位置调整alpha和beta的值
    // this.alphaDel = mouseX * 5; // 你可以根据需要调整这个值
    // this.betaDel = mouseY * 5; // 你可以根据需要调整这个值
  }, []);

  const observerFn = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 目标元素进入视窗
          setIsShow(true);
          window.addEventListener("mousemove", onMouseMove, false);
        } else if (entry.intersectionRatio < 0.1) {
          window.removeEventListener("mousemove", onMouseMove);
          setIsShow(false);
        }
      });
    },
    [onMouseMove]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(observerFn, {
      threshold: [0, 1],
    });
    if (coreRef.current) {
      observerRef.current.observe(coreRef.current);
    }
  }, [observerFn]);

  return (
    <div className="pt-[200px] w-full relative flex flex-col items-center bg-black">
      <div className="w-full max-w-[1244px] relative flex justify-center">
        <img
          ref={leftHandRef}
          src="/right-hand.svg"
          className="absolute left-[50%] top-[50%] w-[500px]"
          alt="left-hand"
          style={{
            transform: isShow
              ? "translate(100px, 0px)"
              : "translate(0px, -100px)",
            transitionDuration: "1500ms",
          }}
        />
        <img
          ref={coreRef}
          src="/core.svg"
          className="w-[600px] h-[600px] transition-all"
          style={{
            transform: isShow ? "scale(1)" : "scale(0)",
            transitionDuration: "3000ms",
          }}
          alt="core"
        />
        <img
          ref={rightHandRef}
          src="/left-hand.svg"
          className="absolute right-[50%] bottom-[50%] top-0 w-[500px] transition-all"
          style={{
            transform: isShow
              ? "translate(-100px, 0px)"
              : "translate(0px, 100px)",
            transitionDuration: "1500ms",
          }}
          alt="left-hand"
        />
      </div>
      <div className="absolute -bottom-[110px] text-white w-full max-w-[1244px]">
        <h2
          className="text-[60px] font-light"
          style={{ fontFamily: "Roboto monospace" }}
        >
          Network Identity
        </h2>
        <p
          className="mt-[70px] text-[32px] font-light whitespace-pre opacity-80"
          style={{ fontFamily: "Roboto monospace" }}
        >{`Aligned with its own decentralized constitution. \nManaged by its network participants.`}</p>
      </div>
    </div>
  );
}
