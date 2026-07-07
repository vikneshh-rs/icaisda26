import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const SpeakerCard = ({ image, name, title, organization, topic }) => (
  <div className="bg-white w-full h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
    <div className="h-[300px] flex justify-center items-center overflow-hidden bg-gray-100">
      <img src={image} alt={`Portrait of ${name}`} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{name}</h3>
      <p className="text-gray-600 font-medium text-center">{title}</p>
      <p className="text-gray-500 text-sm text-center">{organization}</p>
      {topic && (
        <div className="mt-4 border-t border-gray-200 pt-2">
          <p className="text-sm font-medium text-gray-900">Keynote:</p>
          <p className="text-sm text-gray-600 italic">{topic}</p>
        </div>
      )}
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="w-full text-center mb-12 relative z-10">
    <h2 className="text-4xl font-bold text-blue-800 mb-2">{title}</h2>
    <div className="w-24 h-1 bg-blue-700/50 mx-auto rounded-full"></div>
  </div>
);

function Speakers() {
  const keynoteSpeakers = [
    {
      image: "/images/keynote-2026/krishna-mohan.jpg",
      name: "Dr. C. Krishna Mohan",
      title: "Professor",
      organization: "Department of Computer Science and Engineering, IIT Hyderabad",
      topic: null
    },
    {
      image: "/images/keynote-2026/peter-revesz.jpg",
      name: "Dr. Peter Z. Revesz",
      title: "Professor",
      organization: "University of Nebraska-Lincoln, Lincoln, USA",
      topic: "Computational Decipherment of the Indus Valley Script: Recent Progress and Future Possibilities"
    },
    {
      image: "/images/keynote-2026/balaji-palanisamy.jpg",
      name: "Dr. Balaji Palanisamy",
      title: "Associate Professor",
      organization: "School of Computing and Information, University of Pittsburgh, USA",
      topic: "Adversarial Attacks in Virtual Reality: Detection, Prevention, and Defense"
    },
    {
      image: "/images/keynote-2026/rajarajan-sivaraj.png",
      name: "Dr. Rajarajan Sivaraj",
      title: "Vice President of Solution Architecture",
      organization: "Aira Technologies, USA",
      topic: "INTelligence-of-Things: scalable and practical AI for large-scale operational systems"
    }
  ];

  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x234881,
          backgroundColor: 0xffffff,
          points: 12.0,
          maxDistance: 30.0,
          spacing: 22.0
        })
      );
    }
    return () => vantaEffect && vantaEffect.destroy();
  }, [vantaEffect]);

  return (
    <div className="relative mt-20 min-h-screen w-full bg-gray-100 py-20">
      <div ref={vantaRef} className="fixed inset-0 z-0 opacity-40" />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black">Distinguished Speakers</h1>
          <p className="text-xl text-gray-700 mt-2">
            Join us in welcoming world-renowned experts in technology and innovation
          </p>
        </div>

        <SectionTitle title="Keynote Speakers" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {keynoteSpeakers.map((speaker, idx) => (
            <SpeakerCard key={idx} {...speaker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Speakers;
