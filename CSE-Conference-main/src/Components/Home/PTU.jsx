import React from "react";
import ptuImg from "../../assets/Images/cs1.jpg";
import { PTULogo } from "../../assets";

const PTU = () => {
  return (
    <section className="w-full relative py-12 md:py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <img
          src={PTULogo}
          alt="logo"
          className="w-72 md:w-96 absolute right-0 top-1/2 -translate-y-1/2 -z-0 opacity-10 pointer-events-none"
        />

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          <div className="w-full md:w-5/12 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={ptuImg}
                className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                alt="Puducherry Technological University Campus"
              />
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-4 text-slate-700 text-base md:text-lg leading-relaxed text-justify">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
                About The University
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mt-2">
                Puducherry Technological University (PTU)
              </h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mt-3 mx-auto md:mx-0"></div>
            </div>

            <p>
              Puducherry Technological University (PTU), the first State University of the Union Territory of Puducherry, was established on 5th September 2020 through the elevation of the erstwhile Pondicherry Engineering College (PEC), founded in 1985. Recognized for excellence in technical education and research, PTU has been ranked in the 201–300 band in the Engineering category of the National Institutional Ranking Framework (NIRF), Ministry of Education, Government of India. The University offers a wide range of undergraduate, postgraduate, and doctoral programmes, with several programmes accredited by the National Board of Accreditation (NBA).
            </p>
            <p>
              PTU is a leading center for innovation, research, and entrepreneurship, supported by major national initiatives including ATAL Innovation Mission (AIM), TEQIP, and RUSA. The University has secured significant research funding from premier agencies such as DST, CSIR, and the Ministry of Education. With strong collaborations with reputed institutions and universities in India and abroad, PTU fosters global academic engagement and cutting-edge research. Its distinguished alumni hold leadership positions in multinational corporations, renowned universities, research organizations, and public services across the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PTU;

