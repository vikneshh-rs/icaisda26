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

        <table className="text-lg border-separate border-spacing-3 text-white w-full">
          <tbody>
            {[
              {
                label: "Full Paper Submission Deadline",
                oldDate: "31st August, 2026",
                newDate: "21st September, 2026",
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
                    <span className="line-through text-gray-400 mr-3">
                      {row.oldDate}
                    </span>
                  )}
                  <span>{row.newDate}</span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Late Submission Notice */}
        <div className="w-full bg-amber-500/20 border border-amber-400/60 rounded-xl p-4 text-amber-200 text-sm md:text-base font-semibold flex items-center justify-center gap-2">
          <span className="text-xl">⚠️</span>
          <span>Processing charge of <strong className="text-amber-300 font-bold">Rs.1,000</strong> will be charged for Late Submission.</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
