import React, { useState, useEffect } from "react";
import cs1 from '../assets/Images/cs1.jpg'
import cs2 from '../assets/Images/cs2.jpg'
import cs3 from '../assets/Images/cs3.jpg'
import cs4 from '../assets/Images/cs4.jpg'
import cs5 from '../assets/Images/cs5.jpg'

const images = [cs1, cs2, cs3, cs4, cs5];

const Timeline = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Content Box with Semi-Transparent Background */}
      <div className="relative z-10 flex flex-col items-center gap-6 border border-gray-400 bg-black/50 p-8 rounded-lg shadow-lg  max-w-3xl w-full mx-4 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Important Dates
        </h1>

        {/* Desktop Table View */}
        <div className="hidden sm:block w-full">
          <table className="text-base md:text-lg border-separate border-spacing-2.5 text-white w-full">
            <tbody>
              {[
                {
                  label: "Full Paper Submission Deadline",
                  oldDate: "31st August, 2026",
                  newDate: "28th September, 2026",
                },
                {
                  label: "Acceptance Intimation",
                  oldDate: "27th September, 2026",
                  newDate: "4th October, 2026",
                },
                {
                  label: "Last Date for Registration",
                  newDate: "28th September, 2026",
                },
                {
                  label: "Registration Closing Date",
                  newDate: "10th October, 2026",
                },
                {
                  label: "Conference Date",
                  newDate: "12 - 13, November, 2026",
                },
              ].map((row, index) => (
                <tr key={index} className="bg-black/40 border border-white/50 rounded-lg">
                  <th className="font-medium px-4 py-3 text-left border border-gray-400 rounded-lg drop-shadow-lg w-1/2">{row.label}</th>
                  <th className="font-medium px-4 py-3 text-left border border-gray-400 rounded-lg drop-shadow-lg w-1/2">
                    {row.oldDate && (
                      <span className="line-through text-gray-400 mr-3 text-sm">
                        {row.oldDate}
                      </span>
                    )}
                    <span className="text-yellow-300 font-bold">{row.newDate}</span>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View - 100% visible on small screens */}
        <div className="block sm:hidden w-full space-y-2.5 text-left">
          {[
            {
              label: "Full Paper Submission Deadline",
              oldDate: "31st August, 2026",
              newDate: "28th September, 2026",
            },
            {
              label: "Acceptance Intimation",
              oldDate: "27th September, 2026",
              newDate: "4th October, 2026",
            },
            {
              label: "Last Date for Registration",
              newDate: "28th September, 2026",
            },
            {
              label: "Registration Closing Date",
              newDate: "10th October, 2026",
            },
            {
              label: "Conference Date",
              newDate: "12 - 13, November, 2026",
            },
          ].map((row, index) => (
            <div
              key={index}
              className="bg-black/60 border border-gray-500/50 rounded-xl p-3.5 flex flex-col gap-1 shadow"
            >
              <span className="text-xs font-semibold text-gray-300">{row.label}</span>
              <div className="flex items-center gap-2">
                {row.oldDate && (
                  <span className="line-through text-gray-400 text-xs">
                    {row.oldDate}
                  </span>
                )}
                <span className="text-yellow-300 font-bold text-sm sm:text-base">{row.newDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Late Submission Notice */}
        <div className="w-full bg-amber-500/20 border border-amber-400/60 rounded-xl p-3.5 md:p-4 text-amber-200 text-xs sm:text-sm md:text-base font-semibold flex items-center justify-center gap-2 text-center">
          <span className="text-xl shrink-0">⚠️</span>
          <span>Processing charge of <strong className="text-amber-300 font-bold">Rs. 1,000</strong> will be charged for late submissions after 10th October.</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
