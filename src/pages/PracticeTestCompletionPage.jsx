import React from "react";
import { Completion } from "../assets";

const PracticeTestCompletionPage = () => {
  return (
    <section className="text-slate-900 flex flex-col items-center space-y-6 bg-slate-200 p-24 rounded-lg">
      <React.Fragment>
        <Completion />
        <div className="flex flex-col items-center space-y-2">
          <span className="text-2xl font-semibold">Great Job!</span>
          <div className="flex flex-col items-center">
            <p className="text-md font-medium">You've completed your practice successfully!</p>
            <p className="text-md font-medium">Now, you're ready for the real test.</p>
            <a href="/accent-test" className="w-fit mt-4 rounded-md bg-slate-900 text-slate-100 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">Take Real Test</a>
          </div>
        </div>
      </React.Fragment>
    </section>
  );
};

export default PracticeTestCompletionPage;
