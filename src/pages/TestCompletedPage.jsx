import React from "react";
import { Completion } from "../assets";

const TestCompletedPage = () => {
  return (
    <section className="text-slate-950 flex flex-col items-center space-y-6 bg-slate-400 p-24 rounded-lg">
      <Completion />
      <div className="flex flex-col items-center space-y-2">
        <span className="text-2xl font-semibold">Congratulations!</span>
        <div className="flex flex-col items-center">
          <p className="text-md font-medium">You have completed the test successfully!</p>
          <p className="text-md font-medium">You can now leave the page safely.</p>
        </div>
      </div>
    </section>
  );
};

export default TestCompletedPage;
