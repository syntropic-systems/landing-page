import React, { useState, useEffect } from "react";

const fileIcons = [
  { type: ".PDF", color: "from-red-500 to-pink-600" },
  { type: ".DOCX", color: "from-blue-500 to-indigo-600" },
  { type: ".JPG", color: "from-amber-400 to-orange-500" },
  { type: ".MP4", color: "from-teal-400 to-emerald-500" },
  { type: ".ZIP", color: "from-purple-500 to-violet-600" },
];

// Glass-style SVG file icon
const FileIcon = ({ label, gradient }) => (
  <div
    className={`w-[4.5rem] h-[6rem] flex flex-col justify-center items-center 
      rounded-md border 
      border-transparent bg-gradient-to-br ${gradient} p-[1px]`}
  >
    <div
      className="flex flex-col justify-center items-center w-full h-full 
      rounded-sm bg-gray-900/70 backdrop-blur-sm"
    >
      {/* SVG-style file shape */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-[2rem] h-[2rem] mb-2 text-white opacity-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
        <path d="M14 2v6h6" />
      </svg>
      <span className="text-white text-xs font-medium tracking-wide">
        {label}
      </span>
    </div>
  </div>
);

const FileCycleBox = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % fileIcons.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-40 h-[7rem] flex justify-center items-center 
      relative rounded-2xl overflow-hidden bg-transparent"
    >
      {fileIcons.map((icon, i) => (
        <div
          key={i}
          className={`absolute transition-opacity duration-700 ease-in-out 
            ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <FileIcon label={icon.type} gradient={icon.color} />
        </div>
      ))}
    </div>
  );
};

export default FileCycleBox;
