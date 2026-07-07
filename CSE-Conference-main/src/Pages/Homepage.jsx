import React, { useState, useEffect } from "react";
import Hero from "../Components/Home/Hero"; // Adjust the path if necessary
import BrochureCarousel from "../Components/Home/BrochureCarousel";
import Intro from "../Components/Home/Intro";
import PTU from "../Components/Home/PTU";
import CSE from "../Components/Home/CSE";
import Speakers from "../Components/Home/Speakers";
//import Accommodation from "../Components/Home/Accommodation";


const Homepage = () => {
  

  return (
    <div>
      <Hero />
      <BrochureCarousel />
      <Intro />
      <PTU />
      <CSE />
      
      <Speakers /> 
    </div>
  );
};

export default Homepage;
