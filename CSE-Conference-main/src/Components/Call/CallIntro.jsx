import React, { useState } from "react";
import { Brain, Shield, Calendar, MapPin, Users, TrendingUp } from "lucide-react";

const aiTopics = [
  "Machine Learning and Deep Learning",
  "Large Language Models and Transformers",
  "AI Algorithms and Architectures",
  "Reinforcement Learning and Autonomous Systems",
  "Generative, Responsive, and Explainable AI",
  "Automated Code Generation and Algorithm Optimization",
  "Information Theory for AI",
  "Statistical Learning Theory in AI",
  "Graphical Models and Probabilistic Inference",
  "Representation Learning and Feature Engineering",
  "Human-Machine Interaction and Data Capturing Techniques",
  "AI Model Optimization and Efficiency",
  "Bias, Fairness, and Ethics in AI Models",
  "AI-Powered Cloud Resource Allocation",
  "Natural Language Processing and Speech Recognition",
  "Computer Vision and Image Processing"
];

const aiApplicationsTopics = [
  "AI in Healthcare and Medicine",
  "AI in Supply Chain Management and Automation",
  "AI in Financial Systems and FinTech",
  "AI and the Internet of Things (IoT)",
  "AI in Cybersecurity and Privacy",
  "AI in Education and Intelligent Learning Systems",
  "AI in Robotics and Autonomous Systems",
  "AI in Manufacturing and Industry 4.0",
  "AI in Blockchain and Decentralized Systems"
];

const secureDataAnalyticsTopics = [
  "Encryption Methods for Data Analysis",
  "Applications of Data Analytics in Security Domains",
  "Data Analytics for Security Attacks and Defenses",
  "Secure Social Network Analysis and Mining",
  "Stream Data Analytics for Cybersecurity",
  "Privacy in Big Data Management and Analytics",
  "Security Issues in Supply Chain Analytics",
  "Security Issues in Computer Vision and Video Analytics",
  "Privacy-Preserving Big Data Analytics",
  "Network and Information Security Using Data Analytics",
  "Fraud Detection and Risk Management",
  "Threat Intelligence and Incident Response",
  "Blockchain and Data Security",
  "Privacy, Surveillance, and AI Ethics",
  "Secure Software Development",
  "Leveraging AI for Enhanced Cybersecurity",
  "Advances in Data Science and Analytics"
];

const secureCommunicationsTopics = [
  "Secure Edge and Fog Computing",
  "High-Performance Secure Computing Systems",
  "Pervasive and Mobile Computing",
  "Secure Wireless Communication",
  "Network Protocols and Congestion Control",
  "Secure Vehicular Networks and Communication",
  "Intelligent Sensors and Sensor Networks",
  "Blockchain for Secure Communication",
  "Multimedia Processing and Communication",
  "Ad Hoc, PAN, and Mesh Networks",
  "Communication Challenges in IoT and Resource-Constrained Devices",
  "Network Function Virtualization and Software-Defined Networking"
];

const sustainableEmergingTopics = [
  "AI for Sustainable Development",
  "AI for Social Good and Sustainable Development",
  "AI in Smart Agriculture",
  "AI in Smart Cities and Urban Planning",
  "AI in Environmental Monitoring and Climate Science",
  "AI in Energy Management and Smart Grids",
  "AI in Digital Governance and E-Governance",
  "Sustainable Communication and Computing",
  "Networking and Computing for Sustainability, Society, and Development",
  "AI and Emerging Technologies",
  "Prompt and Cognitive Computing",
  "Quantum Computing, Quantum Machine Learning and Quantum Algorithms",
  "Quantum Communication and Cryptography",
  "Secure Next-Generation Networks",
  "Agentic AI and Intelligent Agents"
];

const App = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen mt-40 w-full bg-gradient-to-b from-blue-100 to-white flex flex-col">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-20 px-6 text-center w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-3 mb-6">
          </div>
          <h1 className="text-6xl font-bold">ICAISDA-2026</h1>
          <p className="text-2xl text-white max-w-4xl mx-auto mt-2">
            Second International Conference on Artificial Intelligence and Secure Data Analytics
          </p>
         
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
        {/* Call for Papers Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <p className="text-lg text-gray-700 mb-6">
            The <span className="font-bold text-blue-700">Second International Conference on Artificial Intelligence and Secure Data Analytics (ICAISDA-2026)</span> invites researchers, academicians, scientists, industry professionals, and practitioners to submit original and unpublished research contributions, including research papers, case studies, survey articles, and innovative applications. Submissions are solicited on a broad range of topics, including but not limited to the following:
          </p>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Scope</h3>
          <p className="text-lg text-gray-700 mb-8">
            Scope of the conference tentatively includes, but is not limited to:
          </p>

          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 flex-wrap">
            {[
              ['ai', 'Artificial Intelligence', <Brain className="w-5 h-5" />],
              ['aiApplications', 'AI Applications in Industry and Society', <Brain className="w-5 h-5" />],
              ['security', 'Secure Data Analytics', <Shield className="w-5 h-5" />],
              ['communications', 'Secure Communications and Computing', <Shield className="w-5 h-5" />],
              ['sustainable', 'Sustainable Development and Emerging Technologies', <TrendingUp className="w-5 h-5" />]
            ].map(([id, label, icon]) => (
              <button key={id} onClick={() => setActiveSection(activeSection === id ? null : id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-lg font-bold transition whitespace-nowrap ${activeSection === id ? 'bg-blue-600 text-white font-bold' : 'bg-blue-200 text-blue-700 hover:bg-blue-300'}`}>
                {icon}<span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        {activeSection === 'ai' && <Section title="Artificial Intelligence" topics={aiTopics} />}
        {activeSection === 'aiApplications' && <Section title="AI Applications in Industry and Society" topics={aiApplicationsTopics} />}
        {activeSection === 'security' && <Section title="Secure Data Analytics" topics={secureDataAnalyticsTopics} />}
        {activeSection === 'communications' && <Section title="Secure Communications and Computing" topics={secureCommunicationsTopics} />}
        {activeSection === 'sustainable' && <Section title="Sustainable Development and Emerging Technologies" topics={sustainableEmergingTopics} />}
      </div>
    </div>
  );
};

const Section = ({ title, topics }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn w-full">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {topics.map((topic, index) => (
        <div key={index} className="flex items-start font-bold space-x-2 p-3 rounded-lg">
          <span className="text-blue-500 mt-1">•</span>
          <span className="text-white-800">{topic}</span>
        </div>
      ))}
      {/* Highlighted "Not limited to above topics" as a separate entry */}
      <div className="col-span-1 md:col-span-2 flex justify-center">
        <div className="p-3 rounded-lg bg-purple-200 text-blue-700 font-bold text-center w-full">
          Not limited to above topics
        </div>
      </div>
    </div>
  </div>
);



export default App;
