import React from "react";
import { ScrollText, Award, MailIcon, FileText, BookOpen, ExternalLink, Download } from "lucide-react";
import atlantisLogo from '../../assets/Images/logos/atlantis.png';

// Title & Paragraph Data
const content = [
  {
    title: "GUIDELINES FOR AUTHORS",
    icon: <ScrollText className="w-10 h-10" />,
    paragraph: [
      "Prospective authors are encouraged to submit research papers not exceeding 10 pages in single line spacing, including all figures, tables, and references.",
      "Please prepare your manuscript using the official Word Template and adhere to the Proceedings Author Guidelines.",
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

      <div className="mt-40 mb-8 text-white text-center">
        <p className="text-blue-700 text-center text-lg md:text-2xl font-semibold mb-2">
          Submit your paper and follow the official format
        </p>
        <p className="text-blue-900 text-center text-lg md:text-2xl font-semibold mb-2">
          Last Date for Paper Submission: <b>28th September 2026</b>
        </p>
        <p className="text-blue-800 text-center text-sm md:text-base font-medium mb-6">
          Last Date for Registration: <b>28th September 2026</b> &nbsp;|&nbsp; Registration Closing: <b>10th October 2026</b>
          <span className="block text-xs md:text-sm text-amber-900 mt-1 font-semibold">⚠️ Processing charge of Rs. 1,000 will be charged for late submissions after 10th October.</span>
        </p>

        {/* Action Buttons Grid */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-4xl mx-auto">
          {/* Submit Paper Button */}
          <a
            href="https://meteor.springer.com/ICAISDA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-full font-bold transition shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>📤</span>
            <span>Submit Paper</span>
          </a>

          {/* Word Template Button */}
          <a
            href="https://drive.google.com/drive/folders/1F-UdCoJtnJ60xmlznowQ8h9-ft3H23PV?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 hover:bg-indigo-800 text-white px-5 py-3 rounded-full font-bold transition shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-indigo-100" />
            <span>Word Template</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Proceedings Author Guidelines Button */}
          <a
            href="https://docs.google.com/presentation/d/11jGtYTXokSTyP0UPXTRaVJ3o_fvYBbN7/edit?usp=sharing&ouid=114098769929117624762&rtpof=true&sd=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full font-bold transition shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-100" />
            <span>Proceedings Author Guidelines</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Paper Format Button */}
          <a
            href="https://www.atlantis-press.com/policies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base bg-gradient-to-tr from-slate-700 via-slate-600 to-slate-800 hover:bg-slate-900 text-white px-5 py-3 rounded-full font-bold transition shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>📄</span>
            <span>View Paper Format</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* FULLY CENTERED CONTENT CONTAINER */}
      <div className="w-full max-w-20xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 mb-8 p-6 md:p-16 rounded-2xl shadow-2xl text-white text-justify flex flex-col items-center">

        {/* TEMPLATE & AUTHOR RESOURCES HIGHLIGHT CARD */}
        <div className="w-full mb-8 bg-gradient-to-br from-white via-slate-50 to-blue-50 text-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">
          <div className="text-center md:text-left mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Official Downloads & Guidance
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-900">
              Templates & Proceedings Author Guidelines
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Please download and use the official Microsoft Word template and review the author guidelines before submitting your paper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Word Template Box */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-indigo-950">Word Template (.docx)</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Official template formatted with appropriate margins, column layouts, heading hierarchies, fonts, and references format for Atlantis Press / Springer Nature.
                </p>
              </div>
              <a
                href="https://drive.google.com/drive/folders/1F-UdCoJtnJ60xmlznowQ8h9-ft3H23PV?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Open Word Template Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Proceedings Author Guidelines Box */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950">Proceedings Author Guidelines</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Comprehensive slide deck detailing paper preparation, checklist, ethical guidelines, plagiarism policies, and submission workflow.
                </p>
              </div>
              <a
                href="https://docs.google.com/presentation/d/11jGtYTXokSTyP0UPXTRaVJ3o_fvYBbN7/edit?usp=sharing&ouid=114098769929117624762&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow hover:shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Author Guidelines Slides</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

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
