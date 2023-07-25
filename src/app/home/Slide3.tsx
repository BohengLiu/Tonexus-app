export default function Slide3() {
  return (
    <div className="h-screen relative overflow-hidden">
      <video
        src="/video2.mov"
        className="w-screen h-screen object-cover"
        autoPlay
        muted
        loop
      />
      {/* <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(7, 34, 49, 0.40) 0%, rgba(7, 34, 49, 0.40) 100%), linear-gradient(0deg, #F3E0DC 0%, #F3E0DC 100%)",
          backgroundBlendMode: "multiply, color",
        }}
      /> */}
      <div
        className="absolute inset-0"
        style={{ background: "#F3E0DC", mixBlendMode: "color" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(7, 34, 49, 0.40)", mixBlendMode: "multiply" }}
      />
      <div className="w-full absolute inset-0 overflow-auto">
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
    </div>
  );
}
