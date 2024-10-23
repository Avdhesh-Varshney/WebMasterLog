import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  CodeIcon,
  DotsVerticalIcon,
  GitHubLogoIcon,
  HeartIcon,
  LinkedInLogoIcon,
  MixIcon,
  PlusIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddWidget from "./AddWidget";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Header() {
  const [showAddWidget, setShowAddWidget] = useState(false);

  const handleAddWidgetClick = () => {
    setShowAddWidget(true);
  };

  const handleCloseDrawer = () => {
    setShowAddWidget(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center ml-4 mr-6">
        <div className="font-bold text-2xl">CNPP Dashboard</div>
        <div className="flex space-x-4">
          <Button onClick={handleAddWidgetClick}>
            Manage Widgets <PlusIcon className="ml-2" />
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => window.location.reload()}>
                <UpdateIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh / Reset</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          
            

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Dashboard</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a
                  href="https://github.com/inkerton"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  Github
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://www.linkedin.com/in/janvi-choudhary/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInLogoIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://github.com/inkerton/dynamic-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeIcon className="mr-2 h-4 w-4" />
                  Repo
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem disabled><HeartIcon className="mr-2"/> By Janvi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twoDays">2 Days</SelectItem>
              <SelectItem value="sevenDays">7 Days</SelectItem>
              <SelectItem value="fifteenDays">15 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showAddWidget && <AddWidget onClose={handleCloseDrawer} />}
    </div>
  );
}

export default Header;
