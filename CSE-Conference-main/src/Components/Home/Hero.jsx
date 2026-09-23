import React from "react";
import heroMain from "../../assets/Images/icaHome.png";
import heroSub from "../../assets/Images/cs10.jpg";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import icdnLogo from "../../assets/Images/logos/ptulogo2.png";

const Hero = () => {
  return (
    <div className="mt-[65px] md:mt-[75px] min-h-[calc(100vh-75px)] w-full flex flex-col md:flex-row items-center justify-between relative overflow-hidden bg-white">
      {/* Left Content Column */}
      <div className="w-full md:w-1/2 lg:w-5/12 z-10 px-6 sm:px-10 md:pl-12 lg:pl-16 xl:pl-20 py-8 md:py-12 space-y-4 md:space-y-5">
        <div className="flex items-center gap-3">
          <img src={icdnLogo} alt="PTU Logo" className="w-16 md:w-24 object-contain drop-shadow-sm" />
          <div>
            <span className="text-xs md:text-sm font-bold text-blue-900 tracking-wider uppercase block">
              Puducherry Technological University
            </span>
            <span className="text-[11px] md:text-xs font-semibold text-slate-500 block">
              Department of Computer Science &amp; Engineering
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900 tracking-tight leading-snug">
          SECOND INTERNATIONAL CONFERENCE ON ARTIFICIAL INTELLIGENCE AND SECURE DATA ANALYTICS
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-5 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-extrabold text-lg md:text-xl rounded-full shadow-md">
            ICAISDA-2026
          </span>
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-slate-100 border border-slate-200 px-4 py-2 rounded-full shadow-sm">
            <FaCalendarAlt className="text-blue-600" />
            <span>12 - 13, November, 2026</span>
          </div>
        </div>

        <div>
          <span className="inline-block px-4 py-2 bg-blue-800 text-white font-bold text-xs sm:text-sm md:text-base rounded-full shadow-sm">
            DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
          </span>
        </div>

        {/* Links and CTA */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://meteor.springer.com/ICAISDA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>📤 Submit Paper</span>
          </a>

          <a
            href="https://ptuniv.edu.in/icaisda25/#/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-700 font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <span>ICAISDA-2025 Website</span>
            <FaExternalLinkAlt className="text-xs text-slate-400" />
          </a>
        </div>
      </div>

      {/* Right Hero Image (Fills the entire right area edge-to-edge) */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 h-[calc(100vh-75px)] justify-end items-stretch self-stretch relative overflow-hidden">
        <img
          src={heroMain}
          alt="ICAISDA-2026 Campus Visual"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Mobile hero image underneath */}
      <div className="block md:hidden w-full px-4 pb-8">
        <img
          src={heroMain}
          alt="ICAISDA-2026 Campus Visual"
          className="w-full h-auto rounded-2xl shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;

