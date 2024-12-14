import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col mx-56 gap-9 items-center">
      <h1
        className="font-extrabold text=[50px]
      text-center mt-16"
      >
        <span className="text-[#054761]">
          Discover Ypur next Adventure With AI:
        </span>{" "}
        Personalised Itineraries
      </h1>
      <p className="text-xl text-grey-500 text-center">
        Your personal trip planner and travel curator , creating custom
        Itineraries tailored to your interest and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started , Its Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
