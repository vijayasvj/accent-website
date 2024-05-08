import React from 'react';
import PracticeTestCard from './PracticeTestCard';
import { dummyExamplesData } from '../constants/dummyExampleData';
import ExampleCard from './ExampleCard';

const ExampleContainer = () => {
  const exampleData = dummyExamplesData;

  return (
    <div className="flex flex-col items-center w-1/2 mx-auto space-y-8">
      {exampleData.map((example) => (
        <ExampleCard data={example} />
      ))}
    </div>
  );
};

export default ExampleContainer;
