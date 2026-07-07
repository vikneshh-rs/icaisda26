import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full relative justify-center py-3 bg-black text-white">
      <div className="px-3">
        <h1 className="text-lg font-semibold py-2">
          Copyright ©2026{" "}
          <a
            className="text-gray-400 hover:underline"
            target="_blank"
            href="https://ptuniv.edu.in/cse"
          >
            PTU CSE
          </a>{" "}
          | Designed by{" "}
          <a
            className="text-gray-400 hover:underline"
            target="_blank"
            href="https://ptu-designclub.netlify.app/"
          >
            Design Club PTU
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
