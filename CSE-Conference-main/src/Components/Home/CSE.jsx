import React from "react";
import cseImg from "../../assets/Images/cs3.jpg";

const CSE = () => {
  return (
    <div className="w-screen flex justify-center items-center mt-10 mb-5 pb-5  border-gray-300">
      <div className="w-[90%] md:w-[75%] text-justify items-center text-lg flex flex-col md:flex-row-reverse gap-6 tracking-wide leading-relaxed ">
        <div className="w-full md:w-[40%]">
          <img src={cseImg} className=" h-96 object-cover" alt="" />
        </div>
        <div className="w-full w-[60%]">
          <h1 className="text-3xl font-bold mb-10 text-blue-800">
            About CSE DEPARTMENT
          </h1>
          <p>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; The Department of Computer Science and Engineering (CSE)
            at Puducherry Technological University has twenty-two highly qualified faculty members and over
            fifty research scholars pursuing doctoral research in diverse areas of computing. The department 
            offers undergraduate programmes in Computer Science and Engineering and Artificial Intelligence &
            Data Science, postgraduate programmes in Data Science, Information Security, and MCA, along with 
            Ph.D. programmes. Faculty members and research scholars regularly publish their work in reputed
            national and international journals and conferences.{" "}
          </p>
          <p>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; The department is recognized as a research center under
            the Quality Improvement Programme (QIP) and is equipped with modern laboratories comprising over
            400 computer systems and dedicated research facilities. Faculty members actively undertake funded
            research, consultancy, and collaborative projects. The department also maintains strong industry 
            linkages through MoUs with leading organizations and hosts a Centre of Excellence in Artificial 
            Intelligence, established by OneBill, and an Innovation Centre for Intelligent Computing and Research, 
            jointly established by Egnora and the PTU Alumni Association.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CSE;
