'use client'
import { useCallback, useEffect, useRef } from 'react'

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
      blurPlanetRef.current.style.transform = `translateY(${- mouseY * 20}px)`
    }
    if (bigPlanetRef.current) {
      bigPlanetRef.current.style.transform = `translateY(${- mouseY * 50}px)`
    }

    if (smallRef.current) {
      smallRef.current.style.transform = `translateY(${- mouseY * 30}px)`
    }

    if (shipRef.current) {
      let ty = - mouseY * 50
      let tx = - Math.cos( 45 * 2 / Math.PI) * mouseX * 50
      ty = ty - Math.sin( 45 * 2 / Math.PI) * mouseX * 50
      shipRef.current.style.transform = `translate(${tx}px, ${ty}px)`
    }

    // // 根据鼠标的位置调整alpha和beta的值
    // this.alphaDel = mouseX * 5; // 你可以根据需要调整这个值
    // this.betaDel = mouseY * 5; // 你可以根据需要调整这个值
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])
  return (
    <div className="w-full h-[1117px] relative bg-black">
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
        <h2
          className="text-[60px] font-light"
        >
          The star, our destination
        </h2>
        <p
          className="w-[600px] text-[32px] font-light mt-[70px] opacity-80 leading-[1.6]"
          // style={{ fontFamily: "Roboto monospace" }}
        >
          By resolving Earth&apos;s open communication issues, we pave the way
          for future planetary-scale currency and credit networks.
        </p>
      </div>
      <div
        className="w-[500px] absolute right-[100px] font-light text-white \
      bottom-[245px] text-[32px] leading-[1.6] opacity-80"
        // style={{ fontFamily: "Roboto monospace" }}
      >
        <span className="font-bold">Tonexus,</span> our star-bridge,
        embodies our commitment to interstellar civilization.
      </div>
    </div>
  );
}
