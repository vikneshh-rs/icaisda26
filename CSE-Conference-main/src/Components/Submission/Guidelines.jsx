import React from "react";
import { ScrollText, Award, MailIcon } from "lucide-react";
import atlantisLogo from '../../assets/Images/logos/atlantis.png';

// Title & Paragraph Data
const content = [
  {
    title: "GUIDELINES FOR AUTHORS",
    icon: <ScrollText className="w-10 h-10" />,
    paragraph: [
      "Prospective authors are encouraged to submit research papers not exceeding 10 pages in single line spacing, including all figures, tables, and references.",
      "Further details on formatting will be provided once the publishers/journals are finalized.",
      "Only original papers that have not been published or submitted for publication elsewhere will be considered.",
      "Every submission must be accompanied by a plagiarism report, with a similarity index not exceeding 10%.",
      "The ICAISDA will ensure quality through a rigorous review process.",
      "Submissions can be made to the main conference or co-located workshops.",
      "Papers not accepted for the main conference will be considered for the workshop if the contributions of the papers are suitable for the workshop.",
      "The organizers may transfer papers between tracks with the consent of the authors."
    ]
  },
  {
    title: "Best Paper Award",
    icon: <Award className="w-10 h-10" />,
    paragraph: [
      "The Best Paper Award will be awarded.",
      "More details about the award will be updated on the conference website."
    ]
  }
];

const Guidelines = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 px-3 md:px-6">

      <div className="mt-40 mb-8 text-white text-center md:text-left">
        <p className="text-blue-700 text-center text-lg md:text-2xl font-semibold mb-2">
          Submit your paper and follow the official format
        </p>
        <p className="text-blue-900 text-center text-lg md:text-2xl font-semibold mb-4">
          Last Date for Paper Submission: <b>31st August 2026</b>
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Paper Format Button */}
          <a
            href="https://www.atlantis-press.com/policies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 hover:opacity-90 px-6 py-2 rounded-full font-semibold transition"
          >
            📄 View Paper Format
          </a>
        </div>
      </div>

      {/* FULLY CENTERED CONTENT CONTAINER */}
      <div className="w-full max-w-20xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 mb-8 p-6 md:p-16 rounded-2xl shadow-2xl text-white text-justify flex flex-col items-center">

        <h1 className="text-3xl text-center md:text-5xl font-bold text-white mb-5 md:mb-10">
          Publication Details
        </h1>
        
        <div className="w-full mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-8 text-justify">
          <div className="flex flex-col items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Peer-Reviewed Proceedings
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
              Each submissions may have one main author and upto three co-authors. All submitted papers will undergo a double-blind review by two experts from the program
              committee. Accepted papers will be published by <b>Atlantis Press (Part of Springer Nature) </b>
              in the <b>Advances in Intelligent Systems Research (AISR) series</b> (ISSN: 1951-6851). The
              proceedings will be submitted to relevant indexing databases such as <b>Dimensions, IET
              Inspec, CNKI</b>, and <b>Clarivate's Web of Science (CPCI)</b> (subject to acceptance).
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Extended Journal Publication
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
              Selected papers presented at ICAISDA-2026 may be invited to submit an extended version
              for publication in a Scopus-indexed journal, with a 25% to 50% discount on the Article
              Processing Charge (APC).
            </p>
          </div>

          <div className="md:flex px-10 text-black justify-between items-center mt-10">
            <div className="mb-8 md:mb-0">
              <h2 className="text-xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text ">Publication partner</h2>
              <img src={atlantisLogo} alt="altantis press" className="w-[500px] relative right-2" />
            </div>
            <span className="hidden md:inline-block min-h-28 min-w-1 bg-gradient-to-t from-purple-600 to-blue-600"></span>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Contact for Publication Queries:</h2>
              <a className="text-lg flex items-center gap-2" href="mailto:icaisda-pubs@ptuniv.edu.in"><MailIcon className="w-6 h-6" /> icaisda-pubs@ptuniv.edu.in</a>
            </div>
          </div>
        </div>

        <h1 className="text-3xl text-center md:text-5xl font-bold text-white mb-5 md:mb-10">
          Conference Guidelines
        </h1>

        {content.map((section, index) => (
          <div
            key={index}
            className="w-full mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-8 text-justify"
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600">
                {section.icon}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {section.title}
              </h2>
            </div>

            <ul className="space-y-4 text-gray-700 md:text-lg list-disc px-5">
              {section.paragraph.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-justify mt-6 text-white/80 text-dt">
          © 2026 ICAISDA Conference. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
