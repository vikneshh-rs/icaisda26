import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { MainLogo } from "../assets";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const { id } = useParams();
  const location = useLocation();
  const [currentId, setCurrentId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menus = [
    { name: "HOME", path: "/" },
    { name: "CALL FOR PAPERS", path: "/callforpaper" },
    { name: "PAPER SUBMISSION", path: "/papersubmission" },
    { name: "REGISTRATION", path: "/registration" },
    { name: "SPEAKERS", path: "/speakers" },
    { name: "COMMITTEES", path: "/committees" },
    { name: "CONTACTS", path: "/contact" },
    { name: "VENUE", path: "/venue" },
  ];

  useEffect(() => {
    const activePath = location.pathname;
    // Map paths to menu items
    const matchingMenu = menus.find(m => m.path === activePath);
    setCurrentId(matchingMenu ? matchingMenu.path : "/");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[500] transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src={MainLogo} className="w-[45px] md:w-[55px] h-auto object-contain" alt="Conference Logo" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-blue-900 leading-none">ICAISDA 2026</span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-1 hidden sm:inline">AI & Secure Data Analytics</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menus.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={name}
                to={path}
                className={`relative px-4 py-2 text-[13px] font-bold tracking-wider rounded-lg transition-all duration-200 hover:text-blue-700 ${
                  isActive ? "text-blue-900" : "text-slate-600"
                }`}
              >
                {name}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-700 rounded-full animate-fadeIn" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl animate-slideIn">
          <nav className="flex flex-col p-4 space-y-1">
            {menus.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-bold tracking-wider rounded-xl transition-all ${
                    isActive 
                      ? "bg-blue-50 text-blue-900" 
                      : "text-slate-650 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
