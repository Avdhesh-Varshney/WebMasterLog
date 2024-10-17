'use client';

import { FaHome, FaUserFriends, FaAngular, FaReact, FaNodeJs, FaVuejs, FaStar } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript } from "react-icons/si";
import { MdWeb } from 'react-icons/md';

import LogoItem from './LogoItem';
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { useSidebarContext } from "../../context/SidebarContext";

const menuList = [
  {
    group: "General",
    items: [
      {
        link: "/",
        text: "Home",
        icon: <FaHome color="gold" />,
        iconColor: "gold"
      },
      {
        link: "/contributors",
        text: "Contributors",
        icon: <FaUserFriends color="indianred" />,
        iconColor: "indianred"
      }
    ]
  },
  {
    group: "Projects",
    items: [
      {
        link: "/angularjs",
        text: "Angular JS",
        icon: <FaAngular color="#DD0031" />,
        iconColor: "#DD0031"
      },
      {
        link: "/frontend",
        text: "Frontend",
        icon: <MdWeb color="#61DAFB" />,
        iconColor: "#61DAFB"
      },
      {
        link: "/nextjs",
        text: "Next JS",
        icon: <SiNextdotjs color="#000000" />,
        iconColor: "#000000"
      },
      {
        link: "/nodejs",
        text: "Node JS",
        icon: <FaNodeJs color="#339933" />,
        iconColor: "#339933"
      },
      {
        link: "/reactjs",
        text: "React JS",
        icon: <FaReact color="#61DAFB" />,
        iconColor: "#61DAFB"
      },
      {
        link: "/typescript",
        text: "Typescript",
        icon: <SiTypescript color="#3178C6" />,
        iconColor: "#3178C6"
      },
      {
        link: "/vanillajs",
        text: "Vanilla JS",
        icon: <SiJavascript color="#F7DF1E" />,
        iconColor: "#F7DF1E"
      },
      {
        link: "/vuejs",
        text: "Vue JS",
        icon: <FaVuejs color="#4FC08D" />,
        iconColor: "#4FC08D"
      }
    ]
  },
  {
    group: "Feedback",
    items: [
      {
        link: "/feedback",
        text: "Feedback & Rating",
        icon: <FaStar color="#FFD700" />,
        iconColor: "#FFD700"
      }
    ]
  }
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Sidebar context
  const context = useSidebarContext();
  if (!context) return null;
  const { isSidebarOpen } = context;

  return (
    <div className={`bg-[#191c24] z-50 fixed flex flex-col ${isSidebarOpen ? 'w-[245px] min-w-[245px]' : 'w-[75px] min-w-[75px]'} h-full overflow-y-auto border-r-2 border-blue-400 transition-transform duration-300`}>
      {isSidebarOpen ? <>
        <div className="flex flex-col gap-2 px-2 py-1">
          <div className='flex items-center justify-between gap-2 py-5 mb-2'>
            <Link href='/'>
              <Image src={`/white-logo.png`} alt="" width={280} height={22} sizes='22' />
            </Link>
          </div>
          <LogoItem />
        </div>

        <div className='grow'>
          {menuList.map((menu, index) => (
            <div key={index} className="my-4 mx-2">
              <h3 className="text-sm text-neutral-400">{menu.group}</h3>
              <ul className="mt-1">
                {menu.items.map((item, optionIndex) => (
                  <li
                    key={optionIndex}
                    onClick={() => router.push(item.link)}
                    className={`flex items-center gap-2 p-1 ps-3 cursor-pointer rounded-tr-[50px] rounded-br-[50px] text-sm transition-colors border-l-4
                    ${pathname === item.link ? 'bg-[#0f1015] text-white border-blue-400' : 'text-neutral-500 hover:text-white border-transparent'}`}
                  >
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#6c729333] shadow-lg`}>
                      <div className={`${pathname === item.link ? '' : 'animate-pulse'} drop-shadow-[0_0_10px_${item.iconColor}] text-[${item.iconColor}]`}>
                        {item.icon}
                      </div>
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </> : <>
        <div className="flex flex-col gap-2">
          <div className='flex flex-col items-center justify-center gap-5 py-3 my-auto'>
            <Link href='/'>
              <Image src={`/white-letter.png`} alt="" width={40} height={40} sizes='40' />
            </Link>
            <Link href={'https://github.com/Avdhesh-Varshney/WebMasterLog'}>
              <Image src={`/logo.webp`} alt="" width={40} height={40} sizes="40" />
            </Link>
          </div>
        </div>

        <div className="grow">
          {menuList.map((menu, index) => (
            <div key={index} className="my-4 mx-2">
              <ul className="mt-1">
                {menu.items.map((item, optionIndex) => (
                  <li
                    key={optionIndex}
                    onClick={() => router.push(item.link)}
                    className={`flex items-center gap-2 p-1 ps-3 cursor-pointer rounded-tr-[50px] rounded-br-[50px] text-sm transition-colors border-l-4
                    ${pathname === item.link ? 'bg-[#0f1015] text-white border-blue-400' : 'text-neutral-500 hover:text-white border-transparent'}`}
                  >
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#6c729333] shadow-lg`}>
                      <div className={`${pathname === item.link ? '' : 'animate-pulse'} drop-shadow-[0_0_10px_${item.iconColor}] text-[${item.iconColor}]`}>
                        {item.icon}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>}
    </div>
  )
}

export default Sidebar;
