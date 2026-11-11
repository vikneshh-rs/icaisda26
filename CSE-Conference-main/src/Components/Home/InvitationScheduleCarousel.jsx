import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearchPlus, 
  FaTimes, 
  FaDownload,
  FaCalendarAlt,
  FaFileAlt,
  FaExternalLinkAlt,
  FaVideo,
  FaLaptop
} from "react-icons/fa";

// Import schedule and invitation images
import schedule1 from "../../assets/Images/schedule/schedule-1.jpg";
import schedule2 from "../../assets/Images/schedule/schedule-2.jpg";
import schedule3 from "../../assets/Images/schedule/schedule-3.jpg";
import schedule4 from "../../assets/Images/schedule/schedule-4.jpg";
import schedule5 from "../../assets/Images/schedule/schedule-5.jpg";
import schedule6 from "../../assets/Images/schedule/schedule-6.jpg";
import schedule7 from "../../assets/Images/schedule/schedule-7.jpg";
import schedule8 from "../../assets/Images/schedule/schedule-8.jpg";

// Import online schedule images
import online1 from "../../assets/Images/schedule/online-schedule-1.jpg";
import online2 from "../../assets/Images/schedule/online-schedule-2.jpg";
import online3 from "../../assets/Images/schedule/online-schedule-3.jpg";
import online4 from "../../assets/Images/schedule/online-schedule-4.jpg";
import online5 from "../../assets/Images/schedule/online-schedule-5.jpg";
import online6 from "../../assets/Images/schedule/online-schedule-6.jpg";

const scheduleImages = [
  // Offline Invitation & Program Schedule
  {
    id: 1,
    src: schedule1,
    title: "Inauguration Invitation Cover",
    tag: "Invitation",
    subtitle: "12th November 2026 @ 9:30 AM • Auditorium, PTU",
  },
  {
    id: 2,
    src: schedule2,
    title: "Inaugural Function Invitation",
    tag: "Invitation",
    subtitle: "Dignitaries, Patrons & Guests of Honour",
  },
  {
    id: 3,
    src: schedule3,
    title: "Inaugural Schedule",
    tag: "Schedule",
    subtitle: "Order of Events, Addresses & Book Release",
  },
  {
    id: 4,
    src: schedule4,
    title: "2-Day Program Schedule",
    tag: "Schedule",
    subtitle: "Day 1 (Nov 12) & Day 2 (Nov 13) Overall Timeline",
  },
  {
    id: 5,
    src: schedule5,
    title: "Track 1: Session 1-A Presentation Schedule (Offline)",
    tag: "Presentations",
    subtitle: "12-11-2026 • Artificial Intelligence • Auditorium Main Hall",
  },
  {
    id: 6,
    src: schedule6,
    title: "Track 2: Session 1-B Presentation Schedule (Offline)",
    tag: "Presentations",
    subtitle: "12-11-2026 • AI Applications in Industry • Seminar Hall",
  },
  {
    id: 7,
    src: schedule7,
    title: "Track 1: Session 1-C Presentation Schedule (Offline)",
    tag: "Presentations",
    subtitle: "12-11-2026 • Artificial Intelligence • Multi-purpose Hall",
  },
  {
    id: 8,
    src: schedule8,
    title: "Track 4 & 5: Session 2-A Presentation Schedule (Offline)",
    tag: "Presentations",
    subtitle: "13-11-2026 • Communications & Sustainable Tech • Multi-purpose Hall",
  },

  // Online Presentation Schedules
  {
    id: 9,
    src: online1,
    title: "Online Session 1-A: Track 1 (AI)",
    tag: "Online",
    mode: "Online Mode",
    gmeet: "https://meet.google.com/rpd-bjzr-wan",
    subtitle: "12-11-2026 • 2:00 PM - 5:00 PM • AI & DS Lab • GMeet Available",
  },
  {
    id: 10,
    src: online2,
    title: "Online Session 1-B: Track 1 (AI)",
    tag: "Online",
    mode: "Online Mode",
    gmeet: "https://meet.google.com/bmb-nnxr-xjv",
    subtitle: "12-11-2026 • 2:00 PM - 4:45 PM • Onebill AI CoE • GMeet Available",
  },
  {
    id: 11,
    src: online3,
    title: "Online Session 1-C: Track 1 (AI)",
    tag: "Online",
    mode: "Online Mode",
    gmeet: "https://meet.google.com/iop-hbdi-pgp",
    subtitle: "12-11-2026 • 2:00 PM - 4:30 PM • Innovation Centre • GMeet Available",
  },
  {
    id: 12,
    src: online4,
    title: "Online Session 2-A: Track 2 & 3 (AI Apps & Secure Data)",
    tag: "Online",
    mode: "Online Mode",
    gmeet: "https://meet.google.com/yfs-koqi-ifs",
    subtitle: "13-11-2026 • 9:30 AM - 12:00 PM • AI & DS Lab • GMeet Available",
  },
  {
    id: 13,
    src: online5,
    title: "Online Session 2-B: Track 4 (Secure Comms & Computing)",
    tag: "Online",
    mode: "Online Mode",
    gmeet: "https://meet.google.com/nmt-pnbh-shb",
    subtitle: "13-11-2026 • 9:30 AM - 12:15 PM • Onebill AI CoE • GMeet Available",
  },
  {
    id: 14,
    src: online6,
    title: "Online Session 2-C: Track 5 (Sustainable Dev & Emerging Tech)",
    tag: "Online",
    mode: "Online Mode",
    gmeet: "https://meet.google.com/pbp-gyms-udh",
    subtitle: "13-11-2026 • 9:30 AM - 12:00 PM • Innovation Centre • GMeet Available",
  },
];

const InvitationScheduleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter items based on active tab
  const filteredImages = scheduleImages.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "online") return item.tag === "Online";
    if (activeTab === "invitation") return item.tag === "Invitation";
    if (activeTab === "schedule") return item.tag === "Schedule";
    if (activeTab === "presentations") return item.tag === "Presentations";
    return true;
  });

  // Keep currentIndex in bounds when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Auto scroll
  useEffect(() => {
    if (isHovered || isOpen || filteredImages.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, isOpen, filteredImages.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const openLightbox = (imageObj) => {
    const originalIndex = scheduleImages.findIndex((img) => img.id === imageObj.id);
    setActiveImageIndex(originalIndex !== -1 ? originalIndex : 0);
    setIsOpen(true);
  };

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % scheduleImages.length);
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? scheduleImages.length - 1 : prev - 1
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") setActiveImageIndex((prev) => (prev + 1) % scheduleImages.length);
      if (e.key === "ArrowLeft") setActiveImageIndex((prev) => (prev === 0 ? scheduleImages.length - 1 : prev - 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Reorder visible images starting from currentIndex
  const getVisibleImages = () => {
    if (filteredImages.length === 0) return [];
    const list = [];
    for (let i = 0; i < filteredImages.length; i++) {
      list.push(filteredImages[(currentIndex + i) % filteredImages.length]);
    }
    return list;
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50/70 via-white to-slate-50 py-12 md:py-16 border-y border-blue-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            <FaCalendarAlt className="text-blue-700" />
            <span>Official Program Details</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Invitation and Schedule
          </h2>
          
          <p className="text-lg md:text-xl font-bold text-blue-800">
            Welcome to ICAISDA 2026
          </p>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            View the official conference inauguration invitation, keynote schedule, and detailed presentation track schedules for both Offline and Online modes. Click any page to view full screen.
          </p>
          
          {/* Action Buttons for Offline & Online Schedules */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://drive.google.com/file/d/1AXle_xKQqhg3lna4tiWKwRehvM4YOG3f/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 hover:from-blue-800 hover:to-violet-800 text-white font-extrabold text-sm md:text-base rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaLaptop className="text-base" />
              <span>Online Presentation Schedule</span>
              <FaExternalLinkAlt className="text-xs opacity-80" />
            </a>

            <a
              href="https://drive.google.com/file/d/1HnFpmMTMuvB2eQAdNBaneIINMdS1udrM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm md:text-base rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaDownload className="text-sm" />
              <span>Download Offline Schedule</span>
              <FaExternalLinkAlt className="text-xs opacity-80" />
            </a>
          </div>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: "all", label: `All Pages (${scheduleImages.length})` },
            { id: "online", label: "🌐 Online Presentation Schedule (6)" },
            { id: "invitation", label: "Inauguration Invitation (2)" },
            { id: "schedule", label: "Program Schedule (2)" },
            { id: "presentations", label: "Offline Paper Tracks (4)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm ${
                activeTab === tab.id
                  ? "bg-blue-800 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-between gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-3 lg:-left-5 z-20 p-3 md:p-3.5 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-xl -translate-y-1/2 top-1/2 focus:outline-none transition-all duration-300 transform hover:scale-110 border-2 border-white"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="text-sm md:text-base" />
          </button>

          {/* Slides Grid */}
          <div className="w-full overflow-hidden px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
              {getVisibleImages().slice(0, 3).map((item) => {
                const originalIndex = scheduleImages.findIndex((img) => img.id === item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => openLightbox(item)}
                    className="relative cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:-translate-y-2 w-full max-w-sm flex flex-col justify-between"
                  >
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-sm text-white ${
                        item.tag === "Online" ? "bg-indigo-600/95" : "bg-blue-900/90"
                      }`}>
                        {item.tag === "Online" ? "Online Mode" : item.tag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow bg-white/90 text-slate-700">
                        Page {originalIndex + 1}
                      </span>
                    </div>

                    {/* Image Area */}
                    <div className="relative overflow-hidden bg-slate-100 flex items-center justify-center p-2">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] rounded-lg shadow-inner"
                        loading="lazy"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[1px]">
                        <div className="bg-white px-4 py-2 rounded-full shadow-lg text-blue-900 font-bold text-xs flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <FaSearchPlus className="text-sm" />
                          <span>Click to View Full Screen</span>
                        </div>
                      </div>
                    </div>

                    {/* Caption Footer */}
                    <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                      <div>
                        <h3 className="text-sm md:text-base font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Direct GMeet link button if available */}
                      {item.gmeet && (
                        <div className="pt-1 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={item.gmeet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-lg transition-colors"
                          >
                            <FaVideo className="text-emerald-600 text-xs" />
                            <span>Join Google Meet</span>
                            <FaExternalLinkAlt className="text-[10px] opacity-75" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-3 lg:-right-5 z-20 p-3 md:p-3.5 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-xl -translate-y-1/2 top-1/2 focus:outline-none transition-all duration-300 transform hover:scale-110 border-2 border-white"
            aria-label="Next Page"
          >
            <FaChevronRight className="text-sm md:text-base" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 flex-wrap">
          {filteredImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-blue-800"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          >
            {/* Top Toolbar */}
            <div 
              className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <span className="text-blue-400 font-bold">
                  Page {activeImageIndex + 1} of {scheduleImages.length}:
                </span>
                <span className="hidden sm:inline text-slate-200">
                  {scheduleImages[activeImageIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* GMeet Join Button in Lightbox if available */}
                {scheduleImages[activeImageIndex].gmeet && (
                  <a
                    href={scheduleImages[activeImageIndex].gmeet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors flex items-center gap-1.5 text-xs font-extrabold shadow"
                    title="Join Google Meet Room"
                  >
                    <FaVideo />
                    <span className="hidden sm:inline">Join Google Meet</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                )}

                <a
                  href={scheduleImages[activeImageIndex].src}
                  download={`ICAISDA-2026-${scheduleImages[activeImageIndex].title.replace(/\s+/g, '-')}.jpg`}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Download Image"
                >
                  <FaDownload />
                  <span className="hidden md:inline">Download</span>
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 bg-white/10 hover:bg-rose-600 text-white rounded-full transition-colors focus:outline-none"
                  aria-label="Close Lightbox"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-3 sm:left-6 z-50 p-3 sm:p-4 bg-white/10 hover:bg-white/25 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Previous Page"
            >
              <FaChevronLeft className="text-xl sm:text-2xl" />
            </button>

            <button
              onClick={nextLightboxImage}
              className="absolute right-3 sm:right-6 z-50 p-3 sm:p-4 bg-white/10 hover:bg-white/25 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Next Page"
            >
              <FaChevronRight className="text-xl sm:text-2xl" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[95vw] md:max-w-[70vw] rounded-2xl overflow-hidden shadow-2xl bg-black/80 border border-white/10 flex flex-col items-center justify-center"
            >
              <img
                src={scheduleImages[activeImageIndex].src}
                alt={scheduleImages[activeImageIndex].title}
                className="max-h-[78vh] w-auto mx-auto object-contain rounded-lg"
              />
              
              <div className="w-full bg-black/80 px-4 py-2.5 text-center border-t border-white/10 space-y-0.5">
                <p className="text-white font-bold text-sm sm:text-base">
                  {scheduleImages[activeImageIndex].title}
                </p>
                <p className="text-xs text-slate-400">
                  {scheduleImages[activeImageIndex].subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InvitationScheduleCarousel;
