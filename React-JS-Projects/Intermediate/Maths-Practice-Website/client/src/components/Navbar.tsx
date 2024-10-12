import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { AcmeLogo } from "./AcmeLogo.jsx";

export default function CustomNavbar() {
  const { isSignedIn, user } = useUser();

  return (
    <Navbar
      maxWidth="full"
      isBlurred
      className="fixed top-0 p-2 isBordered bg-white flex justify-between items-center border-b-2 border-x-zinc-100"
    >
      <NavbarBrand className="flex items-center">
        <AcmeLogo />
        <p className="font-bold text-inherit text-xl mt-4 text-zinc-800">Maths Practice</p>
      </NavbarBrand>

      <div>
        <NavbarContent
          className="hidden sm:flex gap-4 items-center justify-end"
        >
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/practice" color="foreground">
              Practice
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/progress">
              Progress
            </Link>
          </NavbarItem>
          {isSignedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <UserButton afterSignOutUrl="/" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-4">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.primaryEmailAddress?.emailAddress}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Link href="/sign-in" color="primary">
                Sign In
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
}