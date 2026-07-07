import React from "react";
import cseImg from "../../assets/Images/cs10.jpg";

const Accommodation = () => {
  return (
    <div className="w-screen flex justify-center items-center mt-10 mb-5 pb-5 border-gray-300">
      <div className="w-[75%] text-justify items-center text-lg flex flex-row-reverse gap-6 tracking-wide leading-relaxed">
        <div className="w-[40%]">
          <img src={cseImg} className="h-96 object-cover" alt="" />
        </div>
        <div className="w-[60%]">
          <h1 className="text-3xl font-bold mb-10 text-blue-800">Accommodation Details</h1>
          <p>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; The organizing committee 
           is pleased to offer a variety of accommodation options for 
           participants attending the ICAISDA-2026 Conference.
           Several hotels are located in close proximity to Puducherry Technological University
           and in Puducherry Town, which is 7 km away from the University. 
           These hotels offer a range of comfort and pricing to suit different 
           preferences. For those seeking more affordable options, numerous
           guesthouses and budget hotels are situated within 5 km of the 
           University, providing basic amenities for a comfortable stay. 
           Additionally, accommodation in hostels can be arranged 
           upon request.
           Hotel bookings will be made upon advance request from 
           participants, with payment required at the 
           time of booking. 
          </p>
          <p className="mt-5">
            For accommodation, several hotels are available near Puducherry Technological University. 
            You can check nearby hotels and book your stay through 
            <a 
              href="https://www.google.com/maps/search/hotels+near+Puducherry+Technological+University" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 underline"
            >Google Maps</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
