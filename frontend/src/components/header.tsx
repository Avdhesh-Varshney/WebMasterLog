"use client";
import Image from "next/image";
import icon from "../assets/icon.png";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/dataContext";
import Link from "next/link";

export default function Header() {
  return (
    <Link  href='/'>
    <div className="fixed h-[65px] flex justify-between w-full bg-[rgba(255,255,255,0.3)] z-50 backdrop-blur-md headerbar shadow-[rgba(0,0,0,0.1)_0_1px_10px]">
      <Logo />
      <Userbuttons />
    </div>
    </Link>
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
  const {authState} = useDataContext()

  const handleLogout = () =>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="flex h-full mx-2 gap-2">
      {authState === 'loggedin'  ? 
      <HeaderButton text="Logout" url="" onClickFunction={handleLogout} />:  <HeaderButton text="Login" url="/login" /> }
      {authState === 'loggedin' &&  <HeaderButton text="Dashboard" url="/dashboard" />   }
      {/* <HeaderButton text="Login" url="/login" /> */}
      
    </div>
  );
}
function HeaderButton({ text, url, onClickFunction }: { text: string; url: string, onClickFunction? : ()=>any }) {
  const router = useRouter();

  const handleOnClick = () =>{
    if(onClickFunction !== undefined){
      onClickFunction()
    }
    else{
      router.push(url)
    }
  }

  return (
    <button
      onClick={handleOnClick}
      className=" no-underline text-black"
    >
      <div className=" text-xl py-2 px-4 border-2 border-black hover:bg-[rgba(255,255,255,0.5)] my-2 transition-all">
        {text}
      </div>
    </button>
  );
}
