import React from "react";
import ptuImg from "../../assets/Images/cs1.jpg";
import { PTULogo } from "../../assets";

const PTU = () => {
  return (
    <div className="w-screen relative flex justify-center items-center py-20">
      <div className="md:w-[75%] text-justify text-lg flex flex-col md:flex-row items-center gap-6 tracking-wide leading-relaxed ">
        <img
          src={PTULogo}
          alt="logo"
          className="w-[300px] absolute bottom-[40%] md:top-[30%] md:right-[10%] -z-10 opacity-20"
        />
        <div className="w-[90%] md:w-[40%]">
          <img src={ptuImg} className="h-96 object-cover" alt="ptu" />
        </div>
        <div className="w-[90%] md:w-[60%] px-1 md:px-0">
          <h1 className="text-3xl font-bold pb-10 text-blue-800">Puducherry Technological University-(PTU)</h1>
          <p>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Puducherry Technological University (PTU), the first State 
            University of the Union Territory of Puducherry, was established on 5th September 2020 through the 
            elevation of the erstwhile Pondicherry Engineering College (PEC), founded in 1985. Recognized for
            excellence in technical education and research, PTU has been ranked in the 201–300 band in the
            Engineering category of the National Institutional Ranking Framework (NIRF), Ministry of Education,
            Government of India. The University offers a wide range of undergraduate, postgraduate, and doctoral
            programmes, with several programmes accredited by the National Board of Accreditation (NBA).{" "}
          </p>
          <p>
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PTU is a leading center for innovation, research, and
             entrepreneurship, supported by major national initiatives including ATAL Innovation Mission 
             (AIM), TEQIP, and RUSA. The University has secured significant research funding from premier 
             agencies such as DST, CSIR, and the Ministry of Education. With strong collaborations with 
             reputed institutions and universities in India and abroad, PTU fosters global academic engagement
             and cutting-edge research. Its distinguished alumni hold leadership positions in multinational 
             corporations, renowned universities, research organizations, and public services across the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PTU;
