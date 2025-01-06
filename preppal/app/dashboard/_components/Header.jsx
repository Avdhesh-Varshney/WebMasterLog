"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "../../../components/ui/button";

const Header = () => {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    setIsDarkMode(
      darkModePreference === "true" ||
        (darkModePreference === null &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-transparent border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/fulllogo-.png"
                width={100}
                height={100}
                alt="PrepPal logo"
                className="h-8 w-auto bg-blue-950 px-2 rounded-xl"
              />
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink href="/dashboard" currentPath={path}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/upgrade" currentPath={path}>
                Pricing
              </NavLink>
              <NavLink href="/dashboard/notes" currentPath={path}>
                Notes
              </NavLink>
              <NavLink href="/aboutme" currentPath={path}>
                About
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {isSignedIn ? (
              <div className="ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Link href="/sign-in" className="ml-4">
                <Button>Login</Button>
              </Link>
            )}
            <div className="ml-4 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink
              href="/dashboard"
              currentPath={path}
              onClick={closeMenu}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink
              href="/dashboard/upgrade"
              currentPath={path}
              onClick={closeMenu}
            >
              Pricing
            </MobileNavLink>
            <MobileNavLink
              href="/dashboard/notes"
              currentPath={path}
              onClick={closeMenu}
            >
              Notes
            </MobileNavLink>
            <MobileNavLink
              href="/aboutme"
              currentPath={path}
              onClick={closeMenu}
            >
              About
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, currentPath, children }) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      currentPath === href
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, currentPath, onClick, children }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      currentPath === href
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`}
  >
    {children}
  </Link>
);

export default Header;
