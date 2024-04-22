import React, { useState, useEffect } from 'react';
import { dummyTestData } from '../constants/dummyTestData';
import PracticeTestCard from './PracticeTestCard';
import { Navigate } from 'react-router-dom';

const PracticeContainer = () => {
  const testData = dummyTestData;

  const [totalScore, setTotalScore] = useState(
    parseInt(localStorage.getItem('practiceTestTotalScore')) || 0
  );

  const [currentTestNumber, setCurrentTestNumber] = useState(
    parseInt(localStorage.getItem('practiceCurrentTestNumber')) || 0
  );

  const [isLastTest, setIsLastTest] = useState(false);

  const [currentTestData, setCurrentTestData] = useState(() => {
    const storedTestData = JSON.parse(localStorage.getItem('practiceCurrentTestData'));
    return storedTestData || testData[currentTestNumber];
  });

  const handleTotalScoreChange = (score) => {
    setTotalScore((prevScore) => prevScore + score);
    localStorage.setItem('practiceTestTotalScore', totalScore + score);
  };

  const changeCurrentTestData = () => {
    if (!isLastTest) {
      setCurrentTestNumber((prevNum) => prevNum + 1);
      localStorage.setItem('practiceCurrentTestNumber', currentTestNumber + 1);
    } else {
      localStorage.clear();
      localStorage.setItem('practiceTestFinalScore', totalScore)
      return <Navigate to="/practice-test-completion" />;
    }
  };

  useEffect(() => {
    if (currentTestNumber === testData.length - 1) {
      setIsLastTest(true);
    }
    setCurrentTestData(testData[currentTestNumber]);
    localStorage.setItem('practiceCurrentTestData', JSON.stringify(testData[currentTestNumber]));
  }, [currentTestNumber, testData]);

  return (
    <div className="flex flex-col items-center w-1/2 mx-auto space-y-8">
      <PracticeTestCard
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

export default PracticeContainer;
