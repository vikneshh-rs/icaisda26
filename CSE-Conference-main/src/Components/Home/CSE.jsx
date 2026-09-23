import React from "react";
import cseImg from "../../assets/Images/cs3.jpg";

const CSE = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="w-full md:w-5/12 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={cseImg}
                className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                alt="Department of Computer Science and Engineering"
              />
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-4 text-slate-700 text-base md:text-lg leading-relaxed text-justify">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Department Overview
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mt-2">
                About CSE Department
              </h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mt-3 mx-auto md:mx-0"></div>
            </div>

            <p>
              The Department of Computer Science and Engineering (CSE) at Puducherry Technological University has twenty-two highly qualified faculty members and over fifty research scholars pursuing doctoral research in diverse areas of computing. The department offers undergraduate programmes in Computer Science and Engineering and Artificial Intelligence & Data Science, postgraduate programmes in Data Science, Information Security, and MCA, along with Ph.D. programmes. Faculty members and research scholars regularly publish their work in reputed national and international journals and conferences.
            </p>
            <p>
              The department is recognized as a research center under the Quality Improvement Programme (QIP) and is equipped with modern laboratories comprising over 400 computer systems and dedicated research facilities. Faculty members actively undertake funded research, consultancy, and collaborative projects. The department also maintains strong industry linkages through MoUs with leading organizations and hosts a Centre of Excellence in Artificial Intelligence, established by OneBill, and an Innovation Centre for Intelligent Computing and Research, jointly established by Egnora and the PTU Alumni Association.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CSE;

