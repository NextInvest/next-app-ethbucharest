"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

// const swipeConfidenceThreshold = 10000;

const FormSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isPrevButtonDisabled = page === 0;
  const isNextButtonDisabled = page === 3;

  const prevButtonClass = isPrevButtonDisabled ? "bg-gray-200 cursor-default" : "btn btn-primary";
  const nextButtonClass = isNextButtonDisabled ? "bg-gray-200 cursor-default" : "btn btn-primary";

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {page === 0 && <StepOne />}
          {page === 1 && <StepTwo />}
          {page === 2 && <StepThree />}
          {page === 3 && <StepFinal />}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between absolute bottom-0 left-0 right-0 p-4">
        <button
          className={`btn btn-sm ${prevButtonClass}`}
          disabled={isPrevButtonDisabled}
          onClick={() => paginate(-1)}
        >
          Back
        </button>
        <button className={`btn btn-sm ${nextButtonClass}`} disabled={isNextButtonDisabled} onClick={() => paginate(1)}>
          Next
        </button>
      </div>

      <div className="flex justify-center p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${page === index ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

const StepOne: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Investment Focus</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button className="bg-green-700 rounded-lg p-2">Technology</button>
        <button className="bg-gray-700 rounded-lg p-2">Healthcare</button>
        <button className="bg-gray-700 rounded-lg p-2">FinTech</button>
        <button className="bg-gray-700 rounded-lg p-2">Consumer Goods</button>
        <button className="bg-gray-700 rounded-lg p-2">Education</button>
        <button className="bg-gray-700 rounded-lg p-2">Public Goods</button>
      </div>
      <p className="mb-4">Can&rsquo;t find your favourite industry above?</p>
      <input type="text" placeholder="Type industry here..." className="w-full p-2 rounded-lg bg-gray-800 text-white" />
    </div>
  );
};
const StepTwo: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Investment Stage Preference</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button className="bg-green-700 rounded-lg p-2">Seed Stage</button>
        <button className="bg-gray-700 rounded-lg p-2">Early Stage</button>
        <button className="bg-gray-700 rounded-lg p-2">Growth Stage</button>
        <button className="bg-gray-700 rounded-lg p-2">Later Stage</button>
      </div>
      <p className="mb-4">Can&rsquo;t find your favorite stage above?</p>
      <input type="text" placeholder="Type stage here..." className="w-full p-2 rounded-lg bg-gray-800 text-white" />
    </div>
  );
};
const StepThree: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Geographic Focus</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button className="bg-gray-700 rounded-lg p-2">North America</button>
        <button className="bg-gray-700 rounded-lg p-2">Europe</button>
        <button className="bg-gray-700 rounded-lg p-2">Asia</button>
        <button className="bg-gray-700 rounded-lg p-2">Australia</button>
        <button className="bg-gray-700 rounded-lg p-2">South America</button>
        <button className="bg-green-700 rounded-lg p-2">Africa</button>
        <button className="bg-gray-700 rounded-lg p-2">Global</button>
      </div>
      <p className="mb-4">Can&rsquo;t find your preferred region?</p>
      <input type="text" placeholder="Type region here..." className="w-full p-2 rounded-lg bg-gray-800 text-white" />
    </div>
  );
};

const StepFinal: React.FC = () => {
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="text-white text-center p-8"
    >
      <h2 className="text-2xl font-bold mb-4">You&rsquo;re all set!</h2>
      <p className="mb-8">We&rsquo;re finding the best matches for your search preferences</p>
      <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700">
        Show me my matches
      </button>
    </motion.div>
  );
};

export default FormSlider;
