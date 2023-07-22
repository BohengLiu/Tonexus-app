"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { Controller } from "./Controller";
import { starTypes } from './config/starDistributions'

function genDistanceSetFn (currentValue: number, targetValue: number, duration: number) {
  const baseTime = Date.now()
  const delta = targetValue - currentValue
  return function() {
    return Math.sin(Math.PI / 2 * (Date.now() - baseTime) / duration) * delta + currentValue
  }
}

export default function GalaxyCanvans() {
  const canvasRef = useRef(null);
  const controllerRef = useRef<null | Controller>(null);

  useEffect(() => {
    if (canvasRef.current) {
      controllerRef.current = new Controller(canvasRef.current);
      controllerRef.current.render();
      controllerRef.current.bindOnMouseMove();
    }
  }, []);

  const handleStart = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.distanceSetFn = genDistanceSetFn(controllerRef.current.distance, 1000, 1500)
      setTimeout(() => {
        if (controllerRef.current) {
          controllerRef.current.distanceSetFn = null
        }
      }, 1500)
    }
  }, [])

  const handleStop = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.stop = true
    }
  }, [])
  
  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} id="canvas" width="1000" height="1000"></canvas>

      {/* Debug Panel */}
      <div className="flex items-center justify-center h-[100px] absolute bottom-0 left-0 right-0 space-x-4">
        <button className="border border-white text-white px-4 py-2 " onClick={handleStart}>
          Start
        </button>
        <button className="border border-white text-white px-4 py-2" onClick={handleStop}>
          Stop
        </button>
        {starTypes.color.map((c, idx) => {
          return <div key={String(idx)} className="w-10 h-10 rounded-full" style={{background: `#${c.toString(16)}`}} />
        })}
      </div>
    </div>
  );
}

export { Controller };
