import React from "react";
import Hero from "../Components/Home/Hero";
import AnnouncementSlider from "../Components/Home/AnnouncementSlider";
import InvitationScheduleCarousel from "../Components/Home/InvitationScheduleCarousel";
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

      {/* Invitation and Schedule Slider Section */}
      <InvitationScheduleCarousel />

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
