import React from "react";
import { ScrollText, Award, CreditCard } from "lucide-react";

// Title & Paragraph Data
const content = [
  {
    title: "GUIDELINES FOR AUTHORS",
    icon: <ScrollText className="w-10 h-10" />,
    paragraph: [
      "Prospective authors are invited to submit original and unpublished research papers, case studies, and innovative applications in the areas of Artificial Intelligence, Secure Data Analytics and Secure Communications and Computing.",
      "Manuscripts should not exceed 10 pages, including figures, tables, and references.",
      "All submissions must clearly highlight the research problem, methodology, key findings, and contributions.",
      "To ensure academic integrity, each manuscript must be accompanied by a plagiarism report with an overall similarity index not exceeding 10%.",
      "All submissions to ICAISDA-2026 will undergo a rigorous peer-review process conducted by the Conference Programme Committee to ensure the quality and relevance of accepted papers.",
      "Information regarding the conference proceedings and publication opportunities in Journals will be updated upon finalization of the publisher.",
      "The proceedings of ICAISDA-2025 were published by Springer Nature through the Atlantis Press series, and selected extended papers were published in Gongcheng Kexue Yu Jishu (Advanced Engineering Journal), a Scopus-indexed journal, with concessional Article Processing Charges (APC)."
    ]
  },
  {
    title: "Registration Fee and Article Publication Charges",
    icon: <CreditCard className="w-10 h-10" />,
    paragraph: [
      "Each paper submission may include one corresponding author and up to two co-authors.",
      "Only papers that are accepted through the review process and presented at the conference will be eligible for inclusion in the conference proceedings and consideration for subsequent publication opportunities.",
      "Upon acceptance, at least one author must complete the registration process for the paper to be included in the conference programme.",
      "Details regarding registration fees and payment procedures will be communicated to authors through email and published on the conference website."
    ]
  },
  {
    title: "Best Paper Award",
    icon: <Award className="w-10  h-10" />,
    paragraph: [
      "The Best Paper Award will be awarded to exceptional contributions.",
      "More details about the award criteria and selection process will be updated on the conference website."
    ]
  }
];

const Guidelines = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 px-3 md:px-6">
      
      {/* FULLY CENTERED CONTENT CONTAINER */}
      <div className="w-full mt-40 max-w-20xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 mb-8 p-6 md:p-16 rounded-2xl shadow-2xl text-white text-justify flex flex-col items-center">

        
        <h1 className="text-3xl text-center  md:text-5xl font-bold text-white mb-5 md:mb-10">
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
              
            {Array.isArray(section.paragraph) ? (
              <ul className="space-y-4 text-gray-700 md:text-lg list-disc px-5">
                {section.paragraph.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                {section.paragraph}
              </p>
            )}
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
