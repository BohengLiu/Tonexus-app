// import Wormhole from './Wormhole'
import AppHeader from "@/components/AppHeader";
import GalaxyCanvans from "./Galaxy";
import Content from "./home/Content";
import AppFooter from "@/components/AppFooter";

export default function Home() {
  return (
    <>
      <AppHeader  />
      <main
        id="main"
        className="h-screen overflow-y-hidden relative"
        style={{ perspective: "100px" }}
      >
        <GalaxyCanvans />
        <Content />
        <AppFooter />
      </main>
    </>
  );
}
