import React from "react";
import Hero from "../Components/Home/Hero";
import AnnouncementSlider from "../Components/Home/AnnouncementSlider";
import BrochureCarousel from "../Components/Home/BrochureCarousel";
import Intro from "../Components/Home/Intro";
import PTU from "../Components/Home/PTU";
import CSE from "../Components/Home/CSE";
import Speakers from "../Components/Home/Speakers";
import Sponsors from "../Components/Home/Sponsors";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <AnnouncementSlider />

      {/* Prominent Registration Closed Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-red-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-rose-400/40 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/30 rounded-xl border border-rose-400/40 shrink-0">
              <span className="text-xl">🔒</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-rose-300 font-black">Conference Notice</div>
              <div className="text-sm sm:text-base font-bold text-white">
                Registrations for ICAISDA-2026 are officially <span className="text-yellow-300 font-black uppercase">CLOSED</span> as of 25th October 2026.
              </div>
            </div>
          </div>
          <a
            href="#/registration"
            className="px-5 py-2 bg-white text-rose-900 font-extrabold text-xs sm:text-sm rounded-xl hover:bg-rose-50 transition shadow shrink-0"
          >
            View Notice
          </a>
        </div>
      </div>

      <BrochureCarousel />
      <Intro />
      <PTU />
      <CSE />
      <Speakers />
      <Sponsors /> 
    </div>
  );
};

export default Homepage;
