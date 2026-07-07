import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { MainLogo } from "../assets";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const { id } = useParams();
  const location = useLocation();
  const [currentId, setCurrentId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menus = [
    { name: "HOME", path: "/" },
    { name: "CALL FOR PAPERS", path: "/callforpaper" },
    { name: "PAPER SUBMISSION", path: "/papersubmission" },
    { name: "REGISTRATION", path: "/registration" },
    { name: "SPEAKERS", path: "/speakers" },
    { name: "COMMITTEES", path: "/committees" },
    { name: "CONTACTS", path: "/contact" },
    { name: "VENUE", path: "/venue" },
  ]

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentId(id || location.pathname.split("/")[1] || "Home");
  }, [location, id]);

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
    <div
      className={`flex justify-center items-center h-[7vh] md:h-[15vh] w-full z-[500] ${scrollY < viewportHeight
          ? "bg-white fixed md:absolute"
          : "bg-white shadow-lg shadow-black/20 fixed"
        } transition-all duration-500 ease-linear`}
    >
      <div className="flex w-[95%] md:w-[85%] gap-3 justify-between md:items-center py-3 px-4 text-xs">
        <div className="flex items-center justify-center md:w-[40%] pr-8">
          <img src={MainLogo} className="mr-5 w-[45px] md:w-[70px]" alt="Logo" />
          <h1 className="text-xl font-medium text-nowrap">ICAISDA 2026</h1>
        </div>

        <div className="hidden md:flex gap-3 justify-around items-center">
          {menus.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={`py-2 text-lg px-4 rounded-xl hover:border-b-4 border-blue-700 font-semibold text-nowrap ${currentId === path.substring(1) ? "text-black" : "text-gray-500"
                }`}
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* for mobile view */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(prev => !prev)}>
          {isMenuOpen ? <IoMdClose size={25}/> :  <FiMenu size={25} />}
        </button>

        {
          isMenuOpen &&
          <div className="md:hidden flex flex-col py-4 h-screen fixed gap-2 bg-blue-700 text-white px-4 right-0 top-[7vh]">
            {menus.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={`py-2 text-lg px-4 rounded-xl font-semibold text-nowrap ${currentId === path.substring(1) ? "text-white" : "font-bold"
                  }`}
              >
                {name}
              </NavLink>
            ))}
          </div>
        }
      </div>

    </div>
  );
};

export default Header;
