import React from "react";

const Speakers = () => {
  const speakers = [
    {
      image: "images/keynote-2026/balaji-rajendran.jpg",
      name: "Dr. Balaji Rajendran",
      designation: "Scientist F & Group Head",
      university: "Resilient Information Systems and Engineering (RISE), Centre for Development of Advanced Computing (C-DAC), Bengaluru",
      keynote: "Digital Trust Triad: Users, Devices, Agents",
    },
    {
      image: "images/keynote-2026/krishna-mohan.jpg",
      name: "Dr. C. Krishna Mohan",
      designation: "Professor",
      university: "Department of Computer Science and Engineering, IIT Hyderabad",
      keynote: "AI for Healthcare",
    },
    {
      image: "images/keynote-2026/peter-revesz.jpg",
      name: "Dr. Peter Z. Revesz",
      designation: "Professor",
      university: "University of Nebraska-Lincoln, Lincoln, USA",
      keynote:
        "Computational Decipherment of the Indus Valley Script: Recent Progress and Future Possibilities",
    },
    {
      image: "images/keynote-2026/balaji-palanisamy.jpg",
      name: "Dr. Balaji Palanisamy",
      designation: "Associate Professor",
      university: "School of Computing and Information, University of Pittsburgh, USA",
      keynote:
        "Adversarial Attacks in Virtual Reality: Detection, Prevention, and Defense",
    },
    {
      image: "images/keynote-2026/rajarajan-sivaraj.png",
      name: "Dr. Rajarajan Sivaraj",
      designation: "Vice President of Solution Architecture",
      university: "Aira Technologies, USA",
      keynote:
        "INTelligence-of-Things: Scalable and Practical AI for Large-Scale Operational Systems",
    },
  ];

  return (
    <div className="flex mx-auto max-w-fit flex-col items-center justify-center my-20 text-white">
      <h2 className="font-semibold text-4xl text-center border-b-[3px] pb-1 border-blue-500 max-w-fit text-blue-400">
        Keynote Speakers
      </h2>
      <div className="mt-6 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {speakers.map((ele, ind) => (
          <div className="flex flex-col items-center" key={ind}>
            <div className="min-w-40 min-h-40 md:min-w-48 md:min-h-48 max-w-48 max-h-48 relative rounded-full flex justify-center items-center group cursor-pointer">
              <div className="absolute bg-blue-500 w-full h-full rounded-full -z-10 -translate-x-2 -translate-y-2 shadow-lg"></div>
              <img
                src={ele.image}
                alt={`Portrait of ${ele.name}`}
                className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-400 object-cover"
              />
            </div>
            <div className="text-center mt-4 max-w-xs">
              <p className="font-bold text-blue-400 text-xl">{ele.name}</p>
              <p className="text-blue-500 text-sm">{ele.designation}</p>
              <p className="text-blue-500 text-sm">{ele.university}</p>
              <p className="text-yellow-300 text-xs mt-3 italic">{ele.keynote}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ICAISDA-2025 Proceedings */}
      <div className="mt-20 max-w-3xl w-full mx-4 text-left bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4">
          ICAISDA-2025 Proceedings
        </h2>
        <ul className="text-white list-disc list-inside space-y-2 md:text-lg">
          <li>
            The conference proceedings are available at:{" "}
            <a
              href="https://atlantis-press.com/proceedings/icaisda-25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 underline hover:text-yellow-200"
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
      <div className="mt-10 max-w-3xl w-full mx-4">
        <img
          src="images/nirf-banner.png"
          alt="NIRF Banner"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* Query Email */}
      <p className="mt-6 text-red-500 font-semibold text-lg md:text-xl">
        Any queries please mail to:{" "}
        <a
          href="mailto:icaisda@ptuniv.edu.in"
          className="underline hover:text-red-400"
        >
          icaisda@ptuniv.edu.in
        </a>
      </p>

      {/* Key Highlights Section */}
      <div className="relative z-10 flex flex-col items-center gap-6 border mt-20 border-blue-400 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8 rounded-xl shadow-2xl max-w-3xl w-full mx-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-lg">
          Key Highlights
        </h1>
        <ul className="text-white text-left list-disc list-inside space-y-3 md:text-lg px-2 md:px-4">
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
      <div className="relative z-10 flex flex-col items-center gap-6 border mt-10 border-blue-400 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8 rounded-xl shadow-2xl max-w-3xl w-full mx-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-lg">
          Important Dates
        </h1>
        <table className="md:text-lg border-separate border-spacing-3 text-white w-full">
          <tbody>
            {[
              ["Full Paper Submission Deadline", "31st August, 2026"],
              ["Acceptance Intimation", "27th September, 2026"],
              ["Registration Deadline", "19th October, 2026"],
              ["Conference Date", "12 - 13, November, 2026"],
            ].map((row, index) => (
              <tr
                key={index}
                className="bg-blue-600/80 border border-blue-300 rounded-lg transition duration-500 hover:bg-blue-00 hover:text-yellow-300"
              >
                <th className="font-medium px-4 py-3 text-left border border-blue-300 rounded-lg drop-shadow-lg">
                  {row[0]}
                </th>
                <th className="font-medium px-4 py-3 text-left border border-blue-300 rounded-lg drop-shadow-lg">
                  {row[1]}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Speakers;
