"use client";
import { useEffect, useRef } from "react";

export default function Slide3() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current?.parentNode) {
      containerRef.current?.parentNode.addEventListener(
        "scroll",
        () => {
          if (containerRef.current?.parentNode) {
            const parent = containerRef.current.parentNode as HTMLDivElement;
            const scrollTop = parent.scrollTop;
            const offsetTop = containerRef.current.offsetTop;
            const offsetHeight = containerRef.current.offsetHeight;
            if (scrollTop > offsetTop + offsetHeight + 50) {
              bgRef.current?.classList.remove("sticky");
            } else {
              bgRef.current?.classList.add("sticky");
            }
          }
        },
        false
      );
    }
  }, []);
  return (
    <>
      <div ref={bgRef} className=" w-screen h-[100vh] sticky top-0">
        <div className="relative">
          <video
            src="/video2.mov"
            className="w-screen h-[100vh] object-cover sticky top-0"
            autoPlay
            muted
            loop
          />
          <div
            className="flex flex-col items-center absolute inset-0 text-white text-4xl py-[217px]"
            style={{
              background: "#F3E0DC",
              mixBlendMode: "color",
              zIndex: 100,
            }}
          />
        </div>
      </div>

      <div ref={containerRef} className="-mt-[100vh] w-screen flex flex-col items-center relative">
        <p
          className="py-[100px] bg-blend-overlay text-center text-[60px] font-medium"
          style={{
            background: "linear-gradient(90deg, #FFF 0%, #FFF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mixBlendMode: "overlay",
          }}
        >
          At the root of human <br />
          issues lies the problem of <br />
          trust. <br />
          <br />
          Geopolitical strife
          <br />
          disrupts social media and <br />
          communication.
          <br />
          Currency policies hinder <br />
          payments and transfers. <br />
          Many face hurdles
          <br />
          with online communication <br />
          due to networks and censorship. <br />
          Private firms control media <br />
          and data; users lack true ownership.
        </p>
        <div className="absolute inset-0 flex flex-col items-center">
          <p
            className="py-[100px] text-center text-[60px] font-medium"
            style={{
              color: "rgba(255, 255, 255, 0.30)",
            }}
          >
            At the root of human <br />
            issues lies the problem of <br />
            trust. <br />
            <br />
            Geopolitical strife
            <br />
            disrupts social media and <br />
            communication.
            <br />
            Currency policies hinder <br />
            payments and transfers. <br />
            Many face hurdles
            <br />
            with online communication <br />
            due to networks and censorship. <br />
            Private firms control media <br />
            and data; users lack true ownership.
          </p>
        </div>
      </div>
      {/* <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(7, 34, 49, 0.40) 0%, rgba(7, 34, 49, 0.40) 100%), linear-gradient(0deg, #F3E0DC 0%, #F3E0DC 100%)",
            backgroundBlendMode: "multiply, color",
          }}
        />
        <div
          className="-mt-[100vh] w-screen flex col"
          style={{ background: "#F3E0DC", mixBlendMode: "color", zIndex: 100 }}
        >
          <p
            className="py-[100px] bg-blend-overlay text-center text-[60px] font-medium"
            style={{
              background: "linear-gradient(90deg, #FFF 0%, #FFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mixBlendMode: "overlay",
            }}
          >
            At the root of human <br />
            issues lies the problem of <br />
            trust. <br />
            <br />
            Geopolitical strife
            <br />
            disrupts social media and <br />
            communication.
            <br />
            Currency policies hinder <br />
            payments and transfers. <br />
            Many face hurdles
            <br />
            with online communication <br />
            due to networks and censorship. <br />
            Private firms control media <br />
            and data; users lack true ownership.
          </p>
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: "rgba(7, 34, 49, 0.40)",
            mixBlendMode: "multiply",
          }}
        />
        <div className="w-full absolute inset-0 overflow-auto">
          <div className="absolute inset-0">
            <p
              className="py-[100px] text-center text-[60px] font-medium"
              style={{
                color: "rgba(255, 255, 255, 0.30)",
              }}
            >
              At the root of human <br />
              issues lies the problem of <br />
              trust. <br />
              <br />
              Geopolitical strife
              <br />
              disrupts social media and <br />
              communication.
              <br />
              Currency policies hinder <br />
              payments and transfers. <br />
              Many face hurdles
              <br />
              with online communication <br />
              due to networks and censorship. <br />
              Private firms control media <br />
              and data; users lack true ownership.
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
}
