"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      onClick={() => {
        router.push("/");
      }}
      className="hidden md:block cursor-pointer py-2"
      height="10"
      width="150"
      src="/Images/logo.png"
    />
  );
};

export default Logo;
