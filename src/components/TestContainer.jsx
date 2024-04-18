import React, { useState, useEffect } from 'react';
import { dummyTestData } from '../constants/dummyTestData';
import TestCard from './TestCard';
import { Navigate } from 'react-router-dom';

const TestContainer = () => {
  const testData = dummyTestData;

  const [totalScore, setTotalScore] = useState(
    parseInt(localStorage.getItem('totalScore')) || 0
  );

  const [currentTestNumber, setCurrentTestNumber] = useState(
    parseInt(localStorage.getItem('currentTestNumber')) || 0
  );

  const [isLastTest, setIsLastTest] = useState(false);

  const [currentTestData, setCurrentTestData] = useState(() => {
    const storedTestData = JSON.parse(localStorage.getItem('currentTestData'));
    return storedTestData || testData[currentTestNumber];
  });

  const handleTotalScoreChange = (score) => {
    setTotalScore((prevScore) => prevScore + score);
    localStorage.setItem('totalScore', totalScore + score);
  };

  const changeCurrentTestData = () => {
    if (!isLastTest) {
      setCurrentTestNumber((prevNum) => prevNum + 1);
      localStorage.setItem('currentTestNumber', currentTestNumber + 1);
    } else {
      localStorage.clear();
      localStorage.setItem('finalScore', totalScore)
      return <Navigate to="/test-completion" />;
    }
  };

  useEffect(() => {
    if (currentTestNumber === testData.length - 1) {
      setIsLastTest(true);
    }
    setCurrentTestData(testData[currentTestNumber]);
    localStorage.setItem('currentTestData', JSON.stringify(testData[currentTestNumber]));
  }, [currentTestNumber, testData]);

  return (
    <div className="flex flex-col items-center w-1/2 mx-auto space-y-8">
      <TestCard
        key={currentTestData.id}
        item={currentTestData}
        testNumber={currentTestNumber + 1}
        onTotalScoreChange={handleTotalScoreChange}
        onClickNext={changeCurrentTestData}
        isLastTest={isLastTest}
      />
    </div>
  );
};

export default TestContainer;
