import React from "react";
import speakerBalajiRajendran from "../../assets/Images/keynote-2026/balaji-rajendran.jpg";
import speakerKrishnaMohan from "../../assets/Images/keynote-2026/krishna-mohan.jpg";
import speakerPeterRevesz from "../../assets/Images/keynote-2026/peter-revesz.jpg";
import speakerBalajiPalanisamy from "../../assets/Images/keynote-2026/balaji-palanisamy.jpg";
import speakerRajarajanSivaraj from "../../assets/Images/keynote-2026/rajarajan-sivaraj.png";
import nirfBanner from "../../assets/Images/nirf-banner.png";

const Speakers = () => {
  const speakers = [
    {
      image: speakerBalajiRajendran,
      name: "Dr. Balaji Rajendran",
      designation: "Scientist F & Group Head",
      university: "Resilient Information Systems and Engineering (RISE), Centre for Development of Advanced Computing (C-DAC), Bengaluru",
      keynote: "Digital Trust Triad: Users, Devices, Agents",
    },
    {
      image: speakerKrishnaMohan,
      name: "Dr. C. Krishna Mohan",
      designation: "Professor",
      university: "Department of Computer Science and Engineering, IIT Hyderabad",
      keynote: "AI for Healthcare",
    },
    {
      image: speakerPeterRevesz,
      name: "Dr. Peter Z. Revesz",
      designation: "Professor",
      university: "University of Nebraska-Lincoln, Lincoln, USA",
      keynote:
        "Computational Decipherment of the Indus Valley Script: Recent Progress and Future Possibilities",
    },
    {
      image: speakerBalajiPalanisamy,
      name: "Dr. Balaji Palanisamy",
      designation: "Associate Professor",
      university: "School of Computing and Information, University of Pittsburgh, USA",
      keynote:
        "Adversarial Attacks in Virtual Reality: Detection, Prevention, and Defense",
    },
    {
      image: speakerRajarajanSivaraj,
      name: "Dr. Rajarajan Sivaraj",
      designation: "Vice President of Solution Architecture",
      university: "Aira Technologies, USA",
      keynote:
        "INTelligence-of-Things: Scalable and Practical AI for Large-Scale Operational Systems",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/30">
            Distinguished Guests
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Keynote Speakers
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mt-3 mx-auto"></div>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-5xl justify-items-center">
          {speakers.map((ele, ind) => (
            <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl w-full max-w-sm hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300" key={ind}>
              <div className="w-36 h-36 md:w-44 md:h-44 relative rounded-full flex justify-center items-center group cursor-pointer my-2">
                <div className="absolute bg-blue-500 w-full h-full rounded-full -z-10 -translate-x-1.5 -translate-y-1.5 shadow-lg opacity-80 group-hover:scale-105 transition-transform"></div>
                <img
                  src={ele.image}
                  alt={`Portrait of ${ele.name}`}
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-blue-400 object-cover shadow-md"
                />
              </div>
              <div className="text-center mt-4 w-full">
                <p className="font-bold text-blue-300 text-lg md:text-xl">{ele.name}</p>
                <p className="text-slate-300 text-xs md:text-sm mt-1">{ele.designation}</p>
                <p className="text-slate-400 text-xs mt-1 leading-snug">{ele.university}</p>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-yellow-300 text-xs italic font-medium">"{ele.keynote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ICAISDA-2025 Proceedings */}
        <div className="mt-16 max-w-4xl w-full bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>ICAISDA-2025 Proceedings</span>
          </h2>
          <ul className="text-slate-200 list-disc list-inside space-y-2.5 text-sm md:text-base leading-relaxed">
            <li>
              The conference proceedings are available at:{" "}
              <a
                href="https://atlantis-press.com/proceedings/icaisda-25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline font-semibold hover:text-yellow-200 break-all"
              >
                https://atlantis-press.com/proceedings/icaisda-25
              </a>{" "}
              (Springer Nature)
            </li>
            <li>
              The extended versions of 34 papers presented at the conference have
              been published in Gongcheng Kexue Yu Jishu / Advanced Engineering
              Journal (Scopus-indexed).
            </li>
          </ul>
        </div>

        {/* NIRF Banner */}
        <div className="mt-8 max-w-4xl w-full">
          <img
            src={nirfBanner}
            alt="NIRF Banner"
            className="w-full rounded-2xl shadow-xl border border-white/10 object-contain bg-white"
          />
        </div>

        {/* Query Email */}
        <div className="mt-8 bg-blue-900/40 border border-blue-500/30 rounded-full px-6 py-2.5 text-center shadow-md">
          <p className="text-slate-200 text-sm md:text-base font-medium">
            Any queries please mail to:{" "}
            <a
              href="mailto:icaisda@ptuniv.edu.in"
              className="text-yellow-300 font-bold underline hover:text-yellow-200 ml-1"
            >
              icaisda@ptuniv.edu.in
            </a>
          </p>
        </div>

        {/* Key Highlights Section */}
        <div className="relative z-10 flex flex-col items-center gap-6 border mt-12 border-blue-400/40 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-indigo-900/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl w-full text-center">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-300/30">
              Conference Features
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 drop-shadow-md">
              Key Highlights
            </h1>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mt-2 mx-auto"></div>
          </div>
          <ul className="text-slate-100 text-left list-disc list-inside space-y-3 text-sm md:text-base leading-relaxed w-full px-2 md:px-4">
            <li>
              Technical Tracks on Artificial Intelligence, Secure Computing,
              Communication, Secure Data Analytics and Internet of Things
            </li>
            <li>Distinguished keynote speakers and Insightful Plenary sessions</li>
            <li>
              All the accepted papers will be published in conference proceedings
              with ISBN
            </li>
            <li>
              Choice for paper publications in a Reputed Journals with indexing
            </li>
            <li>
              Opportunities to connect with National and International Experts
            </li>
            <li>Best Paper Awards</li>
          </ul>
        </div>

        {/* Important Dates Section */}
        <div className="relative z-10 flex flex-col items-center gap-6 border mt-10 border-blue-400/40 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-indigo-900/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl w-full text-center">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-300/30">
              Schedule &amp; Deadlines
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 drop-shadow-md">
              Important Dates
            </h1>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mt-2 mx-auto"></div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="text-sm md:text-base border-separate border-spacing-2.5 text-white w-full min-w-[500px]">
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
                  <tr
                    key={index}
                    className="bg-blue-800/50 hover:bg-blue-700/60 transition duration-300 rounded-xl"
                  >
                    <td className="font-semibold px-4 py-3 text-left border border-blue-400/30 rounded-xl w-1/2">
                      {row.label}
                    </td>
                    <td className="font-medium px-4 py-3 text-left border border-blue-400/30 rounded-xl w-1/2">
                      {row.oldDate && (
                        <span className="line-through text-blue-300/60 mr-3 text-xs md:text-sm">
                          {row.oldDate}
                        </span>
                      )}
                      <span className="text-yellow-300 font-bold">{row.newDate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Late Submission Notice */}
          <div className="w-full bg-amber-400/20 border border-yellow-300/60 rounded-xl p-3.5 md:p-4 text-yellow-200 text-sm md:text-base font-semibold flex items-center justify-center gap-2 shadow-inner">
            <span className="text-xl shrink-0">⚠️</span>
            <span>Processing charge of <strong className="text-yellow-300 font-bold">Rs. 1,000</strong> will be charged for late submissions after 10th October.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Speakers;
