export default function AppFooter() {
  return (
    <div className="w-full flex justify-between items-center text-white pt-[112px] pb-[40px] px-6">
      <img src="/logo-name.svg" alt="logo-name" />
      <div className="flex items-center">
        <span className="text-[#808080]">Powered by Ton & Chainbase </span>
        <img src="/ton-logo.svg" alt="ton" className="mx-6" />
        <a href="https://chainbase.com" target="_blank"><img src="/chainbase-logo.svg" alt="chainbase" /></a>
      </div>
    </div>
  )
}