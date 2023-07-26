import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[80px] flex items-center justify-between w-full px-[100px]">
      <Link href="/" className=" cursor-pointer"><img src="/logo-name.svg" alt="logo" /></Link>
    </div>
  );
}
