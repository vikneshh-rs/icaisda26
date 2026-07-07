import React, { useState, useEffect } from "react";
import ContactHome from "../Components/Contact/ContactHome";
import cs1 from "../assets/Images/cs1.jpg";
import cs2 from "../assets/Images/cs2.jpg";
import cs3 from "../assets/Images/cs3.jpg";
import cs4 from "../assets/Images/cs4.jpg";
import cs5 from "../assets/Images/cs5.jpg";

const images = [cs1, cs2, cs3, cs4, cs5];

const Contact = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade effect

      setTimeout(() => {
        setPrevImage(currentImage); // Store previous image
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(false); // Remove fade after switching
      }, 1000); // 1s fade transition
    }, 120000); // Change every 2 minutes

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    // {
    // <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
    //   {/* Previous Image (For Smooth Transition) */}
    //   <div
    //     className={`absolute blur-sm inset-0 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}
    //     style={{
    //       backgroundImage: `url(${images[prevImage]})`,
    //       backgroundPosition: "center",
    //       backgroundSize: "cover",
    //       backgroundRepeat: "no-repeat",
    //     }}
    //   ></div>

    //   {/* Current Image */}
    //   <div
    //     className={`absolute blur-sm inset-0 transition-opacity duration-1000 ${fade ? "opacity-0" : "opacity-100"}`}
    //     style={{
    //       backgroundImage: `url(${images[currentImage]})`,
    //       backgroundPosition: "center",
    //       backgroundSize: "cover",
    //       backgroundRepeat: "no-repeat",
    //     }}
    //   ></div>

    //   {/* Dark Overlay */}
    //   <div className="absolute inset-0 bg-black/50"></div>

    //   {/* Content */}
    //   <div className="relative z-10 w-full flex items-center justify-center">
    //     <ContactHome />
    //   </div>
    // </div>}
    <>
      <ContactHome />
    </>
  );
};

export default Contact;
