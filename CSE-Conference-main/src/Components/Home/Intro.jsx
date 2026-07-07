import React from "react";
import icdnLogo from "../../assets/Images/logos/mainLogo.png";

const Intro = () => {
  return (
    <div className="w-screen relative flex justify-center items-center py-10 md:py-16">
      <div className="w-[90%] md:w-[75%] text-justify text-lg tracking-wide leading-relaxed flex flex-col gap-6">
        <img
          src={icdnLogo}
          alt="logo"
          className="w-[500px] absolute -left-32 -z-10 opacity-20"
        />

        <h1 className="text-3xl font-bold text-blue-800">
          The ICAISDA - 2026
        </h1>
        <p>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; The Second International Conference on Artificial Intelligence
           and Secure Data Analytics (ICAISDA-2026) provides a premier international platform for researchers, academicians,
           scientists, industry professionals, and students to share research findings, exchange ideas, and discuss emerging
           developments in Artificial Intelligence (AI) and Secure Data Analytics. AI is transforming industries through intelligent
           automation, predictive decision-making, and innovative solutions to complex challenges, while Secure Data Analytics ensures
           the confidentiality, integrity, privacy, and reliability of data across critical sectors such as healthcare, finance,
           governance, education, and smart systems{" "}
        </p>
        <p>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ICAISDA-2026 aims to promote collaboration among global academic institutions,
           research organizations, and industry leaders to advance intelligent and secure digital technologies. The conference
           offers opportunities for presenting innovative research, sharing best practices, and exploring future directions in
           AI-driven and data-centric systems. By fostering interdisciplinary discussions and professional networking, ICAISDA-2026
           seeks to address emerging technological challenges and contribute to the development of trustworthy, resilient, and
           sustainable digital ecosystems. The conference will be conducted in a hybrid mode, with participants encouraged to attend
           in person whenever possible. 
        </p>
      </div>
    </div>
  );
};

export default Intro;
