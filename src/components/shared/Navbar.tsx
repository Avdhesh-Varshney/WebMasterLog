"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  Search,
  Home,
  Users,
  FolderKanban,
  MessageSquare,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

import { FaAngular, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { SiJavascript, SiNextdotjs, SiTypescript } from "react-icons/si";
import { MdWeb } from "react-icons/md";

const projectLinks = [
  { link: "/angular", text: "Angular JS", icon: <FaAngular />, iconColor: "#DD0031" },
  { link: "/frontend", text: "Frontend", icon: <MdWeb />, iconColor: "#61DAFB" },
  { link: "/javascript", text: "Vanilla JS", icon: <SiJavascript />, iconColor: "#F7DF1E" },
  { link: "/next", text: "Next JS", icon: <SiNextdotjs />, iconColor: "#000000" },
  { link: "/node", text: "Node JS", icon: <FaNodeJs />, iconColor: "#339933" },
  { link: "/react", text: "React JS", icon: <FaReact />, iconColor: "#61DAFB" },
  { link: "/typescript", text: "Typescript", icon: <SiTypescript />, iconColor: "#3178C6" },
  { link: "/vue", text: "Vue JS", icon: <FaVuejs />, iconColor: "#4FC08D" },
];

const pageLinks = [
  { link: "/", text: "Home", icon: <Home /> },
  { link: "/contributors", text: "Contributors", icon: <Users /> },
  { link: "/feedback", text: "Feedback", icon: <MessageSquare /> },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const allLinks = [...pageLinks, ...projectLinks];

  const filteredLinks = allLinks.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && filteredLinks.length === 1) {
      router.push(filteredLinks[0].link);
      setSearchTerm("");
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A] text-gray-300 p-4 shadow-md border-b border-gray-800"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/white-letter.png"
            alt="WebMasterLog Logo"
            width={40}
            height={40}
            className="rounded-full transition-transform transform group-hover:scale-110 group-active:scale-90"
          />
          <h1 className="text-2xl font-semibold tracking-wide group-hover:text-white transition-colors">
            WebMasterLog
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search Projects or Pages..."
              className="pl-10 bg-[#191c24] border-[#2c2e33] text-neutral-400 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchEnter}
            />
            {searchTerm && (
              <motion.div
                className="absolute top-full mt-1 w-full bg-[#1A1A1A] border border-[#2c2e33] text-white shadow-lg rounded-md z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-[#2c2e33] transition-all cursor-pointer"
                      onClick={() => setSearchTerm("")}
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-400">No results found</div>
                )}
              </motion.div>
            )}
          </div>

          {/* Page Links */}
          {pageLinks.map((page) => (
            <Link
              key={page.link}
              href={page.link}
              className="flex items-center space-x-2 hover:text-white transition-all"
            >
              {page.icon}
              <span>{page.text}</span>
            </Link>
          ))}

          {/* Projects Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer hover:text-white">
              <FolderKanban />
              <span>Projects</span>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1A1A] border border-gray-700">
              {projectLinks.map((project) => (
                <DropdownMenuItem key={project.link} asChild>
                  <Link href={project.link} className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-800">
                    <span style={{ color: project.iconColor }}>{project.icon}</span>
                    <span>{project.text}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0A0A0A] text-gray-300 w-64">
            <ul className="space-y-5">
              {pageLinks.map((page) => (
                <li key={page.link}>
                  <Link
                    href={page.link}
                    className="flex items-center space-x-2"
                    onClick={() => setOpen(false)}
                  >
                    {page.icon}
                    <span>{page.text}</span>
                  </Link>
                </li>
              ))}
              <li className="font-semibold flex items-center space-x-2">
                <FolderKanban />
                <span>Projects</span>
              </li>
              <ul className="pl-4 space-y-3">
                {projectLinks.map((project) => (
                  <li key={project.link}>
                    <Link
                      href={project.link}
                      className="flex items-center space-x-3"
                      onClick={() => setOpen(false)}
                    >
                      {project.icon}
                      <span>{project.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default Navbar;
