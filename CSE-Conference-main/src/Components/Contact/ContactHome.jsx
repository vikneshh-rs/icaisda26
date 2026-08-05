import React from "react";
import { FaGraduationCap, FaMobileAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import backgroundImage from "../../assets/Images/cs2.jpg"; // Add your background image

const ProfessorCard = (props) => {
  return (
    <div className="border border-slate-100 bg-white p-5 rounded-xl hover:scale-105 text-center transition-all shadow-md hover:shadow-lg w-full h-[180px] flex flex-col justify-center">
      <h1 className="font-bold text-blue-800 text-lg">{props.name}</h1>
      <h1 className="flex items-center gap-2 text-left">
        <FaGraduationCap size={20} className="text-blue-700" />
        {props.designation}, CSE, Puducherry Technological University, Puducherry, India
      </h1>
      <h1 className="flex gap-2 items-center">
        <FaMobileAlt className="text-blue-700" /> Cell: {props.number}
      </h1>
      <h1 className="flex gap-2 items-center">
        <AiOutlineMail className="text-blue-700" />
        <a href={`mailto:${props.mail}`} className="text-blue-700 underline hover:text-blue-500">
          {props.mail}
        </a>
      </h1>
    </div>
  );
};

const ContactHome = () => {
  return (
    <div 
      className="w-screen min-h-screen flex justify-center items-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
    >
      <div className="flex flex-col gap-8 items-center relative z-10">
        <h1 className="font-bold text-5xl text-white">Contacts</h1>
        
        {/* Queries related to publication */}
        <div className="rounded-xl overflow-hidden mt-5  p-6 shadow-lg">
          <div className="px-4 py-5">
            <h1 className="text-2xl font-bold text-center text-white">QUERIES RELATED TO PUBLICATION</h1>
          </div>
          <div className="px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            <ProfessorCard name={"Dr. K. Saruladha"} designation={"Professor"} number={"+91 9442396080"} mail={"icaisda-pub@ptuniv.edu.in"} />
            <ProfessorCard name={"Dr. P. Salini"} designation={"Associate Professor"} number={"+91 9994738640"} mail={"icaisda-pub@ptuniv.edu.in"} />
            <ProfessorCard name={"Dr. M. Thenmozhi"} designation={"Associate Professor"} number={"+91 9500893708"} mail={"icaisda-pub@ptuniv.edu.in"} />
            <ProfessorCard name={"Dr. J.I. Sheeba"} designation={"Associate Professor"} number={"+91 9443084976"} mail={"icaisda-pub@ptuniv.edu.in"} />
          </div>
        </div>

        {/* Queries related to hospitality and local sightseeing */}
        <div className="rounded-xl overflow-hidden  p-6 shadow-lg">
          <div className="px-4 py-5">
            <h1 className="text-2xl font-bold text-center text-white">QUERIES RELATED TO HOSPITALITY AND LOCAL SIGHTSEEING</h1>
          </div>
          <div className="px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            <ProfessorCard name={"Dr. M. Thirumaran"} designation={"Professor"} number={"+91 9894593367"} mail={"icaisda-hos@ptuniv.edu.in"} />
            <ProfessorCard name={"Dr. N. Sivakumar"} designation={"Professor"} number={"+91 9840901054"} mail={"icaisda-hos@ptuniv.edu.in"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHome;

