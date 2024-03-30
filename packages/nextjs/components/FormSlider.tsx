"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FieldValues, UseFormRegister } from "react-hook-form";

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

const FormSlider = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isPrevButtonDisabled = page === 0;
  const isNextButtonDisabled = page === 3;

  const paginate = (newDirection: number) => {
    if (newDirection === 1 && page === 3) {
      // handleSubmit(onSubmit)();
    } else {
      setPage([page + newDirection, newDirection]);
    }
  };

  return (
    <div>
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
          {/* Pass register to each step component */}
          {page === 0 && <StepOne register={register} />}
          {page === 1 && <StepTwo register={register} />}
          {page === 2 && <StepThree register={register} />}
          {page === 3 && <StepFinal />}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between absolute bottom-0 left-0 right-0 p-4">
        <div className="flex-item">
          <button
            type="button"
            className={`btn btn-sm ${isPrevButtonDisabled ? "bg-gray-200 cursor-default" : "btn btn-primary"}`}
            disabled={isPrevButtonDisabled}
            onClick={() => paginate(-1)}
          >
            Back
          </button>
        </div>

        <div className="flex flex-item justify-center p-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${page === index ? "bg-green-500" : "bg-gray-300"}`}
            />
          ))}
        </div>

        <div className="flex-item">
          <button
            type="button"
            className={`btn btn-sm ${isNextButtonDisabled ? "bg-gray-200 cursor-default" : "btn btn-primary"}`}
            onClick={() => paginate(1)}
          >
            {isNextButtonDisabled ? "Submit" : "Next"}
          </button>
        </div>
      </div>

      {/* <div className="flex flex-row justify-center p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${page === index ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div> */}
    </div>
  );
};

const StepOne = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  // State to manage the selected button
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const industries = ["Technology", "Healthcare", "FinTech", "Consumer Goods", "Education", "Public Goods"];

  const handleSelectIndustry = (industry: string) => {
    setSelectedIndustry(industry);
  };

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Investment Focus</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {industries.map(industry => (
          <button
            key={industry}
            type="button" // Ensure this is explicitly set to prevent form submission
            className={`rounded-lg p-2 ${selectedIndustry === industry ? "bg-nextGreen" : "bg-gray-700"}`}
            onClick={() => handleSelectIndustry(industry)}
          >
            {industry}
          </button>
        ))}
      </div>
      <p className="mb-4">Can&rsquo;t find your favourite industry above?</p>
      <input
        {...register("customIndustry")} // This allows the user to input a custom industry
        type="text"
        placeholder="Type industry here..."
        className="w-full p-2 rounded-lg bg-nextCardBg text-white"
        onChange={e => handleSelectIndustry(e.target.value)}
      />
      {/* Hidden input to store the selected industry value */}
      <input {...register("selectedIndustry")} type="hidden" value={selectedIndustry} />
    </div>
  );
};

const StepTwo = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  // State to manage the selected investment stage
  const [selectedStage, setSelectedStage] = useState("");

  const stages = ["Seed Stage", "Early Stage", "Growth Stage", "Later Stage"];

  const handleSelectStage = (stage: string) => {
    setSelectedStage(stage);
  };

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Investment Stage Preference</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {stages.map(stage => (
          <button
            key={stage}
            type="button" // Prevent default form submission
            className={`rounded-lg p-2 ${selectedStage === stage ? "bg-nextGreen" : "bg-gray-700"}`}
            onClick={() => handleSelectStage(stage)}
          >
            {stage}
          </button>
        ))}
      </div>
      <p className="mb-4">Can&rsquo;t find your favorite stage above?</p>
      <input
        {...register("customStage")} // Allows user to input a custom stage
        type="text"
        placeholder="Type stage here..."
        className="w-full p-2 rounded-lg bg-nextCardBg text-white"
        onChange={e => handleSelectStage(e.target.value)}
      />
      {/* Hidden input to store the selected stage value */}
      <input {...register("selectedStage")} type="hidden" value={selectedStage} />
    </div>
  );
};

const StepThree = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  // State for the selected geographic focus
  const [selectedRegion, setSelectedRegion] = useState("");

  const regions = ["North America", "Europe", "Asia", "Australia", "South America", "Africa", "Global"];

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">Geographic Focus</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {regions.map(region => (
          <button
            key={region}
            type="button" // Prevent form submission
            className={`rounded-lg p-2 ${selectedRegion === region ? "bg-nextGreen" : "bg-gray-700"}`}
            onClick={() => handleSelectRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <p className="mb-4">Can&rsquo;t find your preferred region?</p>
      <input
        {...register("customRegion")} // For entering a custom region
        type="text"
        placeholder="Type region here..."
        className="w-full p-2 rounded-lg bg-nextCardBg text-white"
        onChange={e => handleSelectRegion(e.target.value)}
      />
      {/* Hidden input to store the selected or custom region value */}
      <input {...register("selectedRegion")} type="hidden" value={selectedRegion} />
    </div>
  );
};

const StepFinal = () => {
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="text-white text-center p-8"
    >
      <h2 className="text-2xl font-bold mb-4">You&rsquo;re all set!</h2>
      <p className="mb-8">We&rsquo;re finding the best matches for your search preferences.</p>
      <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-nextGreen">
        Show me my matches
      </button>
    </motion.div>
  );
};

export default FormSlider;
