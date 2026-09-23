import React from "react";
import { OneBillLogo, AicPecfLogo } from "../../assets";

const partnersData = [
  {
    category: "INDUSTRY PARTNER",
    name: "OneBill",
    logo: OneBillLogo,
    url: "https://www.onebillsoftware.com/",
    logoAlt: "OneBill Logo",
    logoClass: "h-16 md:h-20 max-w-[220px]",
  },
  {
    category: "INNOVATION & INCUBATION PARTNER",
    name: "Atal Incubation Centre (AIC - PECF)",
    logo: AicPecfLogo,
    url: "https://aicpecf.org/",
    logoAlt: "Atal Incubation Centre (AIC - PECF) Logo",
    logoClass: "h-24 md:h-28 max-w-[220px]",
  },
];

const Sponsors = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] tracking-tight">
            Our Partners &amp; Sponsors
          </h2>
          <div className="w-16 md:w-20 h-1 md:h-1.5 bg-blue-600 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Partners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {partnersData.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between items-center text-center min-h-[340px] group"
            >
              {/* Partner Badge */}
              <span className="px-4 py-1 text-xs font-bold tracking-wider text-blue-600 bg-blue-50/90 border border-blue-200/80 rounded-full uppercase">
                {partner.category}
              </span>

              {/* Logo Area */}
              <div className="flex-1 flex items-center justify-center w-full my-6">
                <img
                  src={partner.logo}
                  alt={partner.logoAlt}
                  className={`${partner.logoClass} object-contain transition-transform duration-300 group-hover:scale-105`}
                />
              </div>

              {/* Name and Link */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 hover:underline"
                >
                  Visit Website &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
