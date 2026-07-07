import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSearchPlus, FaTimes } from "react-icons/fa";

// Import brochure images
import brochure1 from "../../assets/Images/brochure1.jpg";
import brochure2 from "../../assets/Images/brochure2.jpg";
import brochure3 from "../../assets/Images/brochure3.jpg";
import brochure4 from "../../assets/Images/brochure4.jpg";
import brochure5 from "../../assets/Images/brochure5.jpg";

const brochureImages = [
  { id: 1, src: brochure1, alt: "ICAISDA 2026 Brochure Page 1" },
  { id: 2, src: brochure2, alt: "ICAISDA 2026 Brochure Page 2" },
  { id: 3, src: brochure3, alt: "ICAISDA 2026 Brochure Page 3" },
  { id: 4, src: brochure4, alt: "ICAISDA 2026 Brochure Page 4" },
  { id: 5, src: brochure5, alt: "ICAISDA 2026 Brochure Page 5" },
];

const BrochureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto scroll for desktop carousel (shifts the view)
  useEffect(() => {
    if (isHovered || isOpen) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, isOpen]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brochureImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? brochureImages.length - 1 : prevIndex - 1
    );
  };

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setIsOpen(true);
  };

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % brochureImages.length);
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? brochureImages.length - 1 : prevIndex - 1
    );
  };

  // Get visible images based on screen width/index
  const getVisibleImages = () => {
    const list = [];
    for (let i = 0; i < brochureImages.length; i++) {
      list.push(brochureImages[(currentIndex + i) % brochureImages.length]);
    }
    return list;
  };

  return (
    <div className="w-full bg-slate-50 py-12 border-y border-slate-200 relative z-10 mt-6 md:mt-12">
      <div className="max-w-[90%] md:max-w-[80%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">
            Conference Brochure & Details
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Click on any page to view full screen and read the conference tracks, registration details, and guidelines.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-between gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-3 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-lg -translate-x-1/2 focus:outline-none transition-all duration-300 transform hover:scale-110"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="text-lg" />
          </button>

          {/* Images Grid */}
          <div className="w-full overflow-hidden px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {/* Show 3 items on desktop, 1 on mobile using slice */}
              {getVisibleImages().slice(0, 3).map((item, index) => {
                // Find actual index in original brochureImages list
                const originalIndex = brochureImages.findIndex((img) => img.id === item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => openLightbox(originalIndex)}
                    className={`relative cursor-pointer group bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 max-w-[280px] md:max-w-xs ${
                      index > 0 ? "hidden md:block" : "block"
                    }`}
                  >
                    <div className="relative w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105 block"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                        <div className="bg-white/90 p-3 rounded-full shadow-md text-blue-900 scale-75 group-hover:scale-100 transition-transform duration-300">
                          <FaSearchPlus className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-center bg-white border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Page {originalIndex + 1}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-3 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-lg translate-x-1/2 focus:outline-none transition-all duration-300 transform hover:scale-110"
            aria-label="Next Page"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {brochureImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-8 bg-blue-800" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Lightbox Navigation Buttons */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-4 md:left-8 z-50 p-4 bg-white/10 hover:bg-white/25 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-2xl" />
            </button>

            <button
              onClick={nextLightboxImage}
              className="absolute right-4 md:right-8 z-50 p-4 bg-white/10 hover:bg-white/25 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Next image"
            >
              <FaChevronRight className="text-2xl" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] md:max-w-[60vw] rounded-lg overflow-hidden shadow-2xl bg-black"
            >
              <img
                src={brochureImages[activeImageIndex].src}
                alt={brochureImages[activeImageIndex].alt}
                className="max-h-[80vh] w-auto mx-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
                <p className="text-white font-medium text-sm md:text-base">
                  {brochureImages[activeImageIndex].alt} (Page {activeImageIndex + 1} of {brochureImages.length})
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrochureCarousel;
