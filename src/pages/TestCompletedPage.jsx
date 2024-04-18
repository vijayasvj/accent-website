import React from "react";
import { Completion } from "../assets";

const TestCompletedPage = () => {
    const totalScore = localStorage.getItem('finalScore');
  return (
    <section className="text-slate-950 flex flex-col items-center space-y-6 bg-slate-400 p-24 rounded-lg">
      <Completion />
      <div className="flex flex-col items-center space-y-2">
        <span className="text-2xl font-semibold">Congratulations!</span>
        <div className="flex flex-col items-center">
          <p className="text-md font-medium">You have completed the test successfully!</p>
          <div className="flex items-end bg-slate-950 text-slate-200 px-2 py-1 rounded-lg my-6 space-x-2">
            <span className="text-lg text-slate-400">Total Score:</span>
            <span className="text-2xl font-semibold">{totalScore}</span>
          </div>
          <p className="text-md font-medium">You can now leave the page safely.</p>
        </div>
      </div>
    </section>
  );
};

export default TestCompletedPage;
