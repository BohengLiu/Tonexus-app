import { useEffect, useState, useRef } from "react";

interface LogoProps {
  isAnimateStart: boolean;
  onAimateEnd: () => void;
}

export default function Logo({ isAnimateStart, onAimateEnd }: LogoProps) {
  const [isLogoAnimationStart, setIsLogoAnimationStart] = useState(false);
  const [isRotateLayerShow, setIsRotateLayerShow] = useState(false);
  const [isShowName, setIsShowName] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isAnimateStart) {
      setTimeout(() => {
        setIsRotateLayerShow(true);
      }, 1000);
      setTimeout(() => {
        setIsLogoAnimationStart(true);
        videoRef.current?.play();
      }, 1000);

      setTimeout(() => {
        setIsShowName(true);
      }, 2000);
      setTimeout(() => {
        onAimateEnd();
      }, 3000);
    }
  }, [isAnimateStart, onAimateEnd]);
  return (
    <div className="absolute inset-0 bg-black/70 flex justify-center items-center">
      <div className="relative">
        <video
          width={484}
          height={484}
          autoPlay={isLogoAnimationStart}
          ref={videoRef}
          muted
          className="transition-opacity duration-1000"
          style={{
            mixBlendMode: "screen",
            opacity: isLogoAnimationStart ? 1 : 0,
          }}
        >
          <source src="/logo.webm" type="video/webm" />
        </video>

        <img
          src="/rotate-layer.svg"
          className={`absolute inset-0 animate-spin transition-[scale] duration-1000`}
          style={{
            animationDuration: "20000ms",
            scale: isRotateLayerShow ? 1 : 0,
          }}
          alt=""
        />
        <img
          src="/slide1/tonexus.svg"
          className="absolute bottom-[142px] left-[123px] transition-opacity"
          style={{
            animationDuration: "20000ms",
            opacity: isShowName ? 1 : 0,
          }}
          alt=""
        />
        <img
          src="/slide1/element1.svg"
          className="absolute -top-[52px] -left-[52px] max-w-[662px] h-[663px]"
          alt=""
        />
        <img
          src="/slide1/element4.svg"
          className="absolute left-[184px] top-[423px]"
          alt=""
        />
        <img
          src="/slide1/element3.svg"
          className="absolute left-[242px] top-[483px]"
          alt=""
        />
        <img
          src="/slide1/element2.svg"
          className="absolute left-[240px] top-[481px]"
          alt=""
        />
        <img
          src="/slide1/element5.svg"
          className="absolute left-[240px] -top-[52px]"
          alt=""
        />
      </div>
    </div>
  );
}
