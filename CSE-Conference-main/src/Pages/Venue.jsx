import React, { useState, useEffect } from "react";
import cs1 from "../assets/Images/rock beach3.jpg";
import cs2 from "../assets/Images/auroville.jpeg";
import cs3 from "../assets/Images/aurobindo.jpg";
import cs4 from "../assets/Images/french colony.jpg";
import cs5 from "../assets/Images/arikamedu.jpg";
import cs6 from "../assets/Images/lighthouse.jpg";
import cs7 from "../assets/Images/cs3.jpg"; // PTU Auditorium background image
import cs8 from "../assets/Images/edenbeach3.jpg";
import { MapPin, Users, Phone, Mail } from "lucide-react";

const touristSpots = [cs1, cs2, cs3, cs4, cs5, cs6,cs8,];

const VenueDetails = () => {
  const [currentSpot, setCurrentSpot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpot((prev) => (prev + 1) % touristSpots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2563EB]">





      {/* VENUE DETAILS */}
      <div
        className="w-full mt-40 max-w-5xl bg-white/10 backdrop-blur-md shadow-2xl border border-blue-400 rounded-2xl p-12 text-center relative"
        style={{
          backgroundImage: `url(${cs7})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black/20 p-12 rounded-2xl">
          <h1 className="text-5xl font-extrabold text-white">PTU Auditorium</h1>
          <p className="mt-3 text-lg italic">Conference & Event Venue</p>
          <div className="w-24 h-1 bg-blue-300 mx-auto my-6 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-400" />
                <p className="text-white text-lg">East Coast Road, Puducherry, 605 014</p>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-400" />
                <p className="text-white text-lg">600+ seats with modern AV setup</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-blue-400" />
                <p className="text-white text-lg">0413-2655281-288</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-blue-400" />
                <p className="text-white text-lg">info@ptuniv.edu.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACCOMMODATION DETAILS */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#0F3460] via-[#093F91] to-[#0A2E63] shadow-2xl border border-blue-400 rounded-2xl p-12 text-center mt-10">
        <h1 className="text-4xl font-bold text-white">Accommodation Details</h1>
        <div className="w-24 h-1 bg-blue-400 mx-auto my-4 rounded-full"></div>
        <div className="text-left text-white text-lg space-y-4 leading-relaxed">
          <p>
            The organizing committee is pleased to offer a variety of accommodation options
            for participants attending the ICAISDA-2026 Conference. Several hotels are located
            in close proximity to Puducherry Technological University and in Puducherry Town, 
            which is 7 km away from the University. These hotels offer a range of comfort and 
            pricing to suit different preferences.
          </p>
          <p>
            For those seeking more affordable options,No TA (Travel Allowance) or DA (Daily Allowance) 
            numerous guesthouses and budget hotels are situated within 5 km of the University, providing 
            basic amenities for a comfortable stay. Additionally, accommodation in hostels can be arranged 
            upon request. Hotel bookings will be made upon advance request from participants, with payment 
            required at the time of booking.
          </p>
          <p>
            For accommodation, several hotels are available near Puducherry Technological University. 
            You can check nearby hotels and book your stay through 
            <a
              href="https://www.google.com/maps/search/hotels+near+Puducherry+Technological+University"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline ml-1"
            >
              Hotel Links
            </a>.
          </p>
        </div>
      </div>

      {/* TOURIST ATTRACTIONS */}
      <div className="w-full max-w-6xl mt-20 text-center flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={touristSpots[currentSpot]}
            alt="Tourist Spot"
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg border border-blue-400"
          />
        </div>

        <div className="w-full md:w-1/2 text-left space-y-6 text-white">
          <h2 className="text-3xl font-bold">TouristSpots Puducherry</h2>
          <p className="text-lg">
            Puducherry, formerly known as Pondicherry, is a charming coastal town that reflects
            a blend of French colonial architecture, pristine beaches, and a vibrant cultural
            scene. Walking through its streets, you’ll find beautifully painted houses with
            bougainvillea-draped balconies, tranquil cafés, and a serene atmosphere perfect
            for relaxation.
          </p>
          <p className="text-lg">
            The town boasts several must-visit attractions, including Auroville, an experimental
            township promoting unity and sustainability, and the famous Rock Beach. Serenity Beach 
            and Paradise Beach provide picturesque seaside retreats with golden sands and clear 
            waters, ideal for sunbathing and surfing.
          </p>
          <p className="text-lg">
            Puducherry is also known for its rich spiritual and wellness scene. From meditation
            centers to Ayurvedic retreats, the town is a haven for those seeking peace and self-discovery.
            The Sri Aurobindo Ashram attracts visitors from around the world for spiritual growth and
            inner tranquility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
