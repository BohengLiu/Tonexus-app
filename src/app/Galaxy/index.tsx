"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { Controller } from "./Controller";
import Logo from "./Logo";

function genDistanceSetFn(
  currentValue: number,
  targetValue: number,
  duration: number
) {
  const baseTime = Date.now();
  const delta = targetValue - currentValue;
  return function () {
    return (
      Math.sin(((Math.PI / 2) * (Date.now() - baseTime)) / duration) * delta +
      currentValue
    );
  };
}

export default function GalaxyCanvans() {
  const canvasRef = useRef(null);
  const controllerRef = useRef<null | Controller>(null);

  // word controller
  const [isShowingText, setIsShowingText] = useState(true);
  const [isShowLine1, setIsShowLine1] = useState(false);
  const [isShowLine2, setIsShowLine2] = useState(false);
  const [isShowLine3, setIsShowLine3] = useState(false);

  // galaxy
  const [isShowGalaxy, setIsShowGalaxy] = useState(false);

  // logo
  const [isLogoAnimation, setIsLogoAnimation] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      controllerRef.current = new Controller(canvasRef.current);
      controllerRef.current.render();
      controllerRef.current.bindOnMouseMove();
    }
  }, []);

  const handleStart = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.distanceSetFn = genDistanceSetFn(
        controllerRef.current.distance,
        600,
        1500
      );
      setTimeout(() => {
        if (controllerRef.current) {
          controllerRef.current.distanceSetFn = null;
        }
      }, 1500);
    }
  }, []);

  const handleShowWord = useCallback(() => {
    setIsShowLine1(true);
    setTimeout(() => {
      setIsShowLine2(true);
    }, 3000);
    setTimeout(() => {
      setIsShowLine3(true);
    }, 6000);
  }, []);

  // const handleStop = useCallback(() => {
  //   if (controllerRef.current) {
  //     controllerRef.current.stop = true;
  //   }
  // }, []);

  useEffect(() => {
    handleShowWord();
    // setIsShowGalaxy(true);
  }, []);

  const startScroll = useCallback(() => {
    (document.querySelector('#main') as HTMLDivElement).style.overflowY = 'auto'
  }, [])

  return (
    <div className="w-full h-full relative">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] duration-[3000] blur-0">
        <Transition
          show={isShowingText}
          className="text-white font-light text-[20px]"
          leave="transition-[filter_opacity] duration-[1000ms]"
          leaveFrom="opacity-100 blur-none"
          leaveTo="opacity-0 blur-sm"
          afterLeave={() => {
            setIsShowGalaxy(true);
            setIsLogoAnimation(true);
          }}
        >
          <div className="min-h-[60px] my-2 w-[673px]">
            <Transition
              show={isShowLine1}
              as="p"
              className="text-white/40"
              enter="transition-[filter_opacity] duration-[4000ms]"
              enterFrom="opacity-0 blur-sm"
              enterTo="opacity-100 blur-none"
              leave="transition-[filter_opacity] duration-[4000ms]"
              leaveFrom="opacity-100 blur-none"
              leaveTo="opacity-0 blur-sm"
              afterEnter={() => {
                setIsShowLine2(true);
              }}
            >
              Two things fill the mind with ever new and increasing admiration
              and awe,the more often and steadily we reflect upon them:
            </Transition>
          </div>
          <div className="min-h-[30px] my-2 w-[673px]">
            <Transition
              as="p"
              show={isShowLine2}
              enter="transition-[filter_opacity] duration-[4000ms]"
              enterFrom="opacity-0 blur-sm"
              enterTo="opacity-100 blur-none"
              leave="transition-[filter_opacity] duration-[4000ms]"
              leaveFrom="opacity-100 blur-none"
              leaveTo="opacity-0 blur-sm"
              afterEnter={() => {
                setIsShowLine3(true);
              }}
            >
              the starry heavens above me and the moral law within me.
            </Transition>
          </div>
          <div className="min-h-[60px] mt-[62px] text-right w-[673px]">
            <Transition
              as="p"
              show={isShowLine3}
              enter="transition-[filter_opacity] duration-[3000ms]"
              enterFrom="opacity-0 blur-sm"
              enterTo="opacity-100 blur-none"
              leave="transition-[filter_opacity] duration-[3000ms]"
              leaveFrom="opacity-100 blur-none"
              leaveTo="opacity-0 blur-sm"
              afterEnter={() => {
                setIsShowingText(false);
              }}
            >
              ——Immanuel Kant
            </Transition>
          </div>
        </Transition>
      </div>
      <div
        className={`w-screen h-screen transition-opacity ${
          isShowGalaxy ? "opacity-100" : "opacity-0"
        }`}
        onTransitionEnd={() => {
          if (isShowGalaxy) {
            handleStart();
          }
        }}
      >
        <canvas
          ref={canvasRef}
          // className="opacity-0"
          id="canvas"
          width="1000"
          height="1000"
        ></canvas>
        <Logo isAnimateStart={isLogoAnimation} onAimateEnd={startScroll} />
      </div>

      {/* Debug Panel */}
      {/* <div className="flex items-center justify-center h-[100px] absolute bottom-0 left-0 right-0 space-x-4">
        <button
          className="border border-white text-white px-4 py-2 "
          onClick={() => {
            handleShowWord();
          }}
        >
          Show/Hide
        </button>
        <button
          className="border border-white text-white px-4 py-2 "
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="border border-white text-white px-4 py-2"
          onClick={handleStop}
        >
          Stop
        </button>
        {starTypes.color.map((c, idx) => {
          return (
            <div
              key={String(idx)}
              className="w-10 h-10 rounded-full"
              style={{ background: `#${c.toString(16)}` }}
            />
          );
        })}
      </div> */}
    </div>
  );
}

export { Controller };
