import React from "react";
import heroMain from "../../assets/Images/icaHome.png";
import heroSub from "../../assets/Images/cs10.jpg";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import icdnLogo from "../../assets/Images/logos/ptulogo2.png";

const Hero = () => {
  return (
    <div className="mt-[65px] md:mt-[80px] min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30">
      {/* Background ambient decorative glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Grid */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Content Column */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <img src={icdnLogo} alt="PTU Logo" className="w-16 md:w-28 object-contain drop-shadow-md" />
            <div className="text-left">
              <span className="text-xs font-bold text-blue-900 tracking-wider uppercase block">Puducherry Technological University</span>
              <span className="text-[11px] font-semibold text-slate-500 block">Department of Computer Science & Engineering</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight leading-snug">
            SECOND INTERNATIONAL CONFERENCE ON ARTIFICIAL INTELLIGENCE AND SECURE DATA ANALYTICS
          </h1>

          <div className="inline-flex items-center gap-3">
            <span className="px-5 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-extrabold text-lg md:text-xl rounded-full shadow-lg">
              ICAISDA-2026
            </span>
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-white/80 border border-slate-200 px-4 py-2 rounded-full shadow-sm">
              <FaCalendarAlt className="text-blue-600" />
              <span>12 - 13, November, 2026</span>
            </div>
          </div>

          <div className="pt-1">
            <span className="inline-block px-4 py-2 bg-blue-900/10 border border-blue-800/20 text-blue-900 font-bold text-sm md:text-base rounded-2xl">
              DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
            </span>
          </div>

          {/* Links and CTA */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <a
              href="https://meteor.springer.com/ICAISDA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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

        {/* Right Hero Image Column */}
        <div className="flex-1 flex justify-center items-center w-full max-w-lg lg:max-w-none">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <img
              src={heroMain}
              alt="ICAISDA-2026 Conference Visual"
              className="relative max-h-[50vh] md:max-h-[65vh] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

      </div>

      {/* Mobile background visual */}
      <img
        src={heroSub}
        alt="Background"
        className="h-full blur-[3px] -z-20 inset-0 absolute w-screen object-cover opacity-10 block md:hidden pointer-events-none"
      />
    </div>
  );
};

export default Hero;
