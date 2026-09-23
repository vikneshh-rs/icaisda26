import React from "react";
import icdnLogo from "../../assets/Images/logos/mainLogo.png";

const Intro = () => {
  return (
    <section className="w-full relative py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <img
          src={icdnLogo}
          alt="logo"
          className="w-80 md:w-96 absolute -left-10 top-1/2 -translate-y-1/2 -z-10 opacity-10 pointer-events-none"
        />

        <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed text-justify">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              About The Event
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-2">
              The ICAISDA - 2026
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full mt-3 mx-auto md:mx-0"></div>
          </div>

          <p>
            The Second International Conference on Artificial Intelligence and Secure Data Analytics (ICAISDA-2026) provides a premier international platform for researchers, academicians, scientists, industry professionals, and students to share research findings, exchange ideas, and discuss emerging developments in Artificial Intelligence (AI) and Secure Data Analytics. AI is transforming industries through intelligent automation, predictive decision-making, and innovative solutions to complex challenges, while Secure Data Analytics ensures the confidentiality, integrity, privacy, and reliability of data across critical sectors such as healthcare, finance, governance, education, and smart systems.
          </p>
          <p>
            ICAISDA-2026 aims to promote collaboration among global academic institutions, research organizations, and industry leaders to advance intelligent and secure digital technologies. The conference offers opportunities for presenting innovative research, sharing best practices, and exploring future directions in AI-driven and data-centric systems. By fostering interdisciplinary discussions and professional networking, ICAISDA-2026 seeks to address emerging technological challenges and contribute to the development of trustworthy, resilient, and sustainable digital ecosystems. The conference will be conducted in a hybrid mode, with participants encouraged to attend in person whenever possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
