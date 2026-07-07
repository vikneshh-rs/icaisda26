import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  dept_advisory,
  international_advisory,
  national_advisory,
  state_advisory,
} from "../../Data/Committee";
import backgroundImage1 from "../../assets/Images/cs6.jpg";

const advisorySections = [
  { title: "Organizing Committee", data: dept_advisory },
  { title: "State level Advisory", data: state_advisory },
  { title: "National Advisory", data: national_advisory },
  { title: "International Advisory", data: international_advisory },
];

const Advisory = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const handlePrevious = () => {
    setCurrentSection(
      (prev) => (prev - 1 + advisorySections.length) % advisorySections.length
    );
  };

  const handleNext = () => {
    setCurrentSection((prev) => (prev + 1) % advisorySections.length);
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage1})` }}
      ></div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Advisory Committees
          </h1>
          <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Section Title Display */}
        <div className="flex flex-wrap justify-center m-8 gap-4">
          {advisorySections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? "bg-blue-500 font-bold text-white"
                  : "text-white hover:text-white"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 rounded-full bg-blue-600 hover:bg-blue-200 transition-all duration-300"
            aria-label="Next section"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Committee Section */}
          <div className="bg-blue-900/80 rounded-2xl p-8 shadow-xl border border-blue-500/50">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              {advisorySections[currentSection].title}
            </h2>

            {/* Scrollable Grid Container */}
            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {advisorySections[currentSection].data.map((member, index) => (
                  <div
                    key={index}
                    className="bg-blue-700 border border-blue-500/30 rounded-xl p-4 hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <p className="text-white text-base font-bold">{member}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisory;
