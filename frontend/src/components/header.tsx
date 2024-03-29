"use client";
import Image from "next/image";
import icon from "../assets/icon.png";
import { useRouter } from "next/navigation";

export default function Header() {
  return (
    <div className="fixed h-[65px] flex justify-between w-full bg-[rgba(255,255,255,0.3)] z-50 backdrop-blur-md headerbar shadow-[rgba(0,0,0,0.1)_0_1px_10px]">
      <Logo />
      <Userbuttons />
    </div>
  );
}
function Logo() {
  return (
    <div className=" m-2 flex gap-2">
      <Image src={icon} alt="Icon" className=" h-full w-auto" />
      <div className="py-3 text-xl hidden md:block">Hairify</div>
    </div>
  );
}
function Userbuttons() {
  return (
    <div className="flex h-full mx-2 gap-2">
      <HeaderButton text="Login" url="/login" />
      <HeaderButton text="Dashboard" url="" />
    </div>
  );
}
function HeaderButton({ text, url }: { text: string; url: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(url)}
      className=" no-underline text-black"
    >
      <div className=" text-xl py-2 px-4 border-2 border-black hover:bg-[rgba(255,255,255,0.5)] my-2 transition-all">
        {text}
      </div>
    </button>
  );
}
