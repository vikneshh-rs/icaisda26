import React, { useState, useEffect } from "react";
import backgroundImage1 from "../../assets/Images/cs10.jpg";
import backgroundImage2 from "../../assets/Images/cs7.jpg";
import backgroundImage3 from "../../assets/Images/cs8.jpg";

const Organizing_Secretaries = [
  "Dr. P. Salini, Associate Professor, CSE, PTU",
  "Dr. M. Thenmozhi, Associate Professor, CSE, PTU",
  "Dr. J. I. Sheeba, Associate Professor, CSE, PTU",
];

const Joint_Secretaries = [
  "Dr. S. Lakshmana Pandian, Professor, CSE, PTU",
  "Dr. K. Sathiyamurthy, Professor, CSE, PTU",
  "Dr. R. Sarala, Professor, CSE, PTU",
];



const CommitteeCard = ({ title, name, position, department }) => (
  <div className="bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 w-full max-w-md border border-blue-300/50 hover:shadow-2xl">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
      {position && <p className="text-lg text-white mb-1">{position}</p>}
      {department && <p className="text-white mb-1">{department}</p>}
    </div>
  </div>
);

const SecretarySection = ({ title, members }) => (
  <div className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-xl p-6 shadow-lg border border-blue-300/30 hover:shadow-2xl transition-all duration-300">
    <h3 className="text-xl font-semibold text-white mb-4 text-center border-b border-blue-400 pb-2">
      {title}
    </h3>
    <ul className="space-y-2">
      {members.map((member, index) => (
        <li
          key={index}
          className="text-white text-center font-medium py-1 px-4 rounded-lg hover:bg-blue-500/20 transition-colors duration-200"
        >
          {member}
        </li>
      ))}
    </ul>
  </div>
);

function OrganizCommittee() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mt-3 text-white mb-4">
              Organizing Committee
            </h1>
            <div className="w-32 h-1 bg-blue-300 mx-auto rounded-full"></div>
          </div>

          {/* Chief Patron - Centered */}
          <div className="flex justify-center mb-10">
            <CommitteeCard
              title="Chief Patron"
              name="Prof. S. Mohan"
              position="Vice Chancellor"
              department="Puducherry Technological University"
            />
          </div>

          {/* Patron & Co-Patron */}
          <div className="flex justify-center gap-12 mb-16">
            <CommitteeCard
              title="Patron"
              name="Dr. R. Manoharan"
              position="Professor"
              department="Computer Science and Engineering"
            />

            <CommitteeCard
              title="Co-Patron"
              name="Dr. K. Saruladha"
              position="Professor"
              department="Computer Science and Engineering"
            />
          </div>

          {/* Secretaries Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <SecretarySection
              title="Organizing Secretaries"
              members={Organizing_Secretaries}
            />

            <SecretarySection
              title="Joint Secretaries"
              members={Joint_Secretaries}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizCommittee;
