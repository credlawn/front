"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MenuResponse } from "@/types/menu";
import { useAppSelector } from "@/redux/store"; 
import { Logo, LogoMobile } from "@/components/header/logo/logo";
import SearchBox from "@/components/header/searchbox/searchBox";
import UserIconContainer from "@/icon/user";
import { selectWishlistItems } from "@/redux/features/wishlist-slice";
import { HeartIcon, ShoppingCartIcon, MenuIcon, SearchIcon, ChevronDown } from "lucide-react";
import Sidebar from "@/components/header/sidebar/sidebar";

interface NavbarProps {
  menuData: MenuResponse[];
}

export default function Navbar({ menuData }: NavbarProps) {
  const settings = useAppSelector((state) => state.settingsReducer); 
  const wishlistItems = useAppSelector(selectWishlistItems);
  const wishlistCount = wishlistItems.length; 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                <Logo logoUrl={settings.logoUrl} />
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <ul className="flex items-center gap-4">
              {menuData.map((menuItem) => (
                <li key={menuItem.parent.slug} className="relative">
                  <div
                    onMouseEnter={() => menuItem.children.length > 0 && setOpenMenu(menuItem.parent.slug)}
                    onMouseLeave={() => menuItem.children.length > 0 && setOpenMenu(null)}
                  >
                    <Link href={`/${menuItem.parent.slug}`}>
                      <span className="cursor-pointer hover:text-red-500 flex items-center">
                        {menuItem.parent.menuName}
                        {menuItem.children.length > 0 && <ChevronDown className="ml-1 h-4 w-4" />}
                      </span>
                    </Link>
                    {menuItem.children.length > 0 && openMenu === menuItem.parent.slug && (
                      <div
                        className="absolute left-0 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                        style={{ top: "100%", paddingTop: "10px" }}
                      >
                        <ul className="block">
                          {menuItem.children.map((child) => (
                            <li key={child.slug}>
                              <Link href={`/${child.slug}`}>
                                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  {child.menuName}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <SearchBox onSearch={handleSearch} className="w-80" />
            <div className="flex items-center gap-6">
              <Link href="/wishlist" className="relative hover:text-red-500 transition-colors cursor-pointer">
                <HeartIcon />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
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
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
          </div>

          <div className="flex justify-center flex-1">
            {settings.showMobileLogo === 1 && (
              <Link href="/">
                <span className="cursor-pointer">
                  <LogoMobile logoUrl={settings.logoUrl} />
                </span>
              </Link>
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
            <Link href="/wishlist" className="relative hover:text-red-500 transition-colors cursor-pointer">
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
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
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          menuData={menuData}
        />
      </div>
    </header>
  );
}