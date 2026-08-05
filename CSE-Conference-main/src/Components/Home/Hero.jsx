import React from "react";
import heroMain from "../../assets/Images/icaHome.png";
import heroSub from "../../assets/Images/cs10.jpg";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import icdnLogo from "../../assets/Images/logos/ptulogo2.png";
import { Parallax } from "react-scroll-parallax";
const Hero = () => {
  return (
    <div className="mt-[7vh] md:mt-[15vh] md:h-[calc(100vh-15vh)] flex items-center py-4 relative">
      <div className="flex items-center justify-between flex-1">
        <div className="py-4 px-6 md:pl-24">
          <img src={icdnLogo} alt="logo" className="w-20 md:w-36" />
          <h1 className="text-xl md:text-3xl text-blue-800 font-semibold leading-relaxed">
            SECOND INTERNATIONAL CONFERENCE ON ARTIFICIAL INTELLIGENCE AND SECURE DATA ANALYTICS
          </h1>
          <h2 className="py-2 mt-2 px-4 bg-blue-800 text-white text-xl md:text-2xl rounded-full max-w-fit">
            ICAISDA-2026
          </h2>
          <div className="mt-4 flex items-center gap-3 md:text-xl">
            <FaCalendarAlt />
            <p>12- 13, November, 2026</p>
          </div>

          {/* Move "DEPARTMENT OF COMPUTER SCIENCE" Down */}
          <h2 className="py-2 mt-5 px-5 bg-blue-800 text-white md:text-xl rounded-full max-w-fit">
            DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
          </h2>

          {/* Link to previous year's conference */}
          <div className="mt-6">
            <a
              href="https://ptuniv.edu.in/icaisda25/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>ICAISDA-2025 Website</span>
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </div>
      </div>
      <Parallax speed={-15} opacity={[2, 0]}>
        <img src={heroMain} alt="main-img" className="h-screen relative hidden md:block" />
      </Parallax>
        <img
          src={heroSub}
          alt="main-img"
          className="h-full blur-[2px] -z-10 inset-0 absolute w-screen block md:hidden"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white opacity-50 -z-10 md:hidden" />
    </div>
  );
};

export default Hero;
