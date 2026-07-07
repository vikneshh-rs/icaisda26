import React from "react";
import { Highlights_Details } from "../../Data/KeyHighlights";

const Highlights = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 bg-slate-500 px-10 py-5 rounded-xl">
        <h1 className="text-2xl font-bold">Key Highlights</h1>
        <div>
          <ul className="list-disc">
            {Highlights_Details.map((ele, index) => {
              return <li key={index}>{ele}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
