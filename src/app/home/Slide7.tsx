export default function Slide7() {
  return (
    <div className="w-full py-[250px] flex flex-col items-center bg-black z-10">
      <div className="flex justify-center space-x-[90px] relative">
        <img src="/protect-right.svg" alt="protect-right" />
        <img src="/brick.svg" alt="brick" className="absolute top-[344px] left-[100px]" />
        <div className="flex flex-col text-white w-[618px] font-light">
          <h2 className="text-[60px]">Protecting Your Rights</h2>
          <p className="mt-[60px] w-[607px] text-[32px] opacity-80">
            Your privacy is sacred. We use encryption and zero-knowledge proofs
            for your security, letting you communicate freely without privacy
            concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
