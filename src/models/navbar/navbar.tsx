"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MenuResponse } from "./navbarApi";
import { useSettings } from "@/models/settings/SettingsProvider";
import { Logo, LogoMobile } from "../logo/logo";
import SearchBox from "../searchbox/searchBox";
import UserIconContainer from "@/app/(auth)/user-icon";
import { HeartIcon, ShoppingCartIcon, MenuIcon, SearchIcon, ChevronDown } from "lucide-react";

interface NavbarProps {
  menuData: MenuResponse[];
}

export default function Navbar({ menuData }: NavbarProps) {
  const settings = useSettings();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const [, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarButtonRef = useRef<HTMLButtonElement>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !searchButtonRef.current?.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideSidebar = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !sidebarButtonRef.current?.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSidebar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
    };
  }, []);

  return (
    <header className="relative">
      <div className="container-main flex items-center border-b-[0.5px] border-solid border-gray-300_01 bg-white h-13 px-4">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center justify-between w-full h-8">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="cursor-pointer">
                <Logo logoUrl={settings.logo_url} />
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <ul className="flex items-center gap-4">
              {menuData.map((menuItem) => (
                <li
                  key={menuItem.parent.slug}
                  className="relative"
                  onMouseEnter={() => menuItem.children.length > 0 && setOpenMenu(menuItem.parent.slug)}
                  onMouseLeave={() => menuItem.children.length > 0 && setOpenMenu(null)}
                >
                  <Link href={`/${menuItem.parent.slug}`}>
                    <span className="cursor-pointer hover:text-red-500 flex items-center">
                      {menuItem.parent.menu_name}
                      {menuItem.children.length > 0 && <ChevronDown className="ml-1 h-4 w-4" />}
                    </span>
                  </Link>
                  {menuItem.children.length > 0 && openMenu === menuItem.parent.slug && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <ul className="block">
                        {menuItem.children.map((child) => (
                          <li key={child.slug}>
                            <Link href={`/${child.slug}`}>
                              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {child.menu_name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <SearchBox onSearch={handleSearch} className="w-80" />
            <div className="flex items-center gap-6">
              <button className="relative hover:text-red-500 transition-colors cursor-pointer">
                <HeartIcon />
              </button>
              <UserIconContainer />
              <button className="relative hover:text-red-500 transition-colors cursor-pointer">
                <ShoppingCartIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex lg:hidden items-center justify-between w-full h-6 relative">
          <div className="flex-shrink-0">
            <button
              ref={sidebarButtonRef}
              className="flex items-center justify-center"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
          </div>

          <div className="flex justify-center flex-1">
            {settings.showMobileLogo === 1 && (
              <LogoMobile logoUrl={settings.logo_url} />
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              ref={searchButtonRef}
              className="flex items-center justify-center"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <button className="relative hover:text-red-500 transition-colors cursor-pointer">
              <HeartIcon />
            </button>
            <UserIconContainer />
            <button className="relative hover:text-red-500 transition-colors cursor-pointer">
              <ShoppingCartIcon />
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div
            ref={searchRef}
            className="flex lg:hidden w-full absolute top-full left-0 right-0 bg-white py-2 px-4 z-50 shadow-lg border-t border-gray-200"
          >
            <SearchBox
              onSearch={handleSearch}
              className="w-full"
              onFocus={() => setIsSearchOpen(true)}
            />
          </div>
        )}
      </div>
    </header>
  );
}