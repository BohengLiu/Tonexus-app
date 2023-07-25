// import Wormhole from './Wormhole'
import AppHeader from "@/components/AppHeader";
import GalaxyCanvans from "./Galaxy";
import Content from "./home/Content";

export default function Home() {
  return (
    <>
      <AppHeader  />
      <main
        className="h-screen overflow-auto relative"
        style={{ perspective: "100px" }}
      >
        <GalaxyCanvans />
        <Content />
      </main>
    </>
  );
}
