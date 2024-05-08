import React, { useEffect, useState } from 'react'
import StartRecording from './StartRecording';
import { Link } from 'react-router-dom';

const PracticeTestCard = ({ item, onTotalScoreChange, onClickNext, isLastTest, testNumber }) => {
    const [isAudioRecorded, setIsAudioRecorded] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null)
    const [practiceAudioUrl, setPracticeAudioUrl] = useState(null)
    const [score, setScore] = useState(0)
    const minScore = 7
    const currentTotalScore = localStorage.getItem('practiceTestTotalScore')
    console.log(currentTotalScore)

  const changeAudioUrl = (url) => {
    setIsAudioRecorded(true)
    setAudioUrl(url)
  }

  const onScoreChange = (score) => {
    setScore(score)
    if(score >= minScore) {
        onTotalScoreChange(score)
    }
  }

  useEffect(() => {
    async function importAudio() {
      try {
        const { default: audio } = await import(`../assets/american_audios/${item.id}.wav`);
        setPracticeAudioUrl(audio)
      } catch (error) {
        console.error(`Error importing audio for ID ${item.id}:`, error);
        return null;
      }
    }

    importAudio()
  })

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <section className='w-full flex flex-col items-center space-y-4'>
        <p className='w-full text-start'>Text - {testNumber}: {item.text}</p>
          <div className='flex flex-col space-y-4 py-6'>
            <span>Listen to the below audio and practice the accent and get the score</span>
            <audio
                    src={practiceAudioUrl}
                    controls
                    className='w-full'
                    autoPlay={false}
                    preload="auto"
                />
          </div>
        {isAudioRecorded ? (
            <React.Fragment>
              <span>Recorded Audio:</span>
                <audio
                    src={audioUrl}
                    controls
                    className='w-1/2'
                    autoPlay={false}
                />
                <div className={`w-full flex justify-between ${score < minScore && "flex-col items-center justify-start py-4 space-y-4"}`}>
                    <span className={`${score < minScore ? "bg-red-600" : "bg-green-600" } p-1 rounded-lg`}>Score: {score}</span>
                    {score < minScore ? (
                        <div className='flex items-center space-x-4'>
                            <span className='text-sm'>Your accent score is not up to the level re-attempt this test case. </span>
                        <button className='rounded-md bg-red-200 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-fit' onClick={refreshPage}>Re-attempt</button>
                        </div>
                    ) : (
                        <React.Fragment>
                            {isLastTest ? (
                                <Link to="/practice-test-completion"><button onClick={onClickNext} className="rounded-md bg-slate-200 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-full">Submit Test</button></Link>
                                ) : (
                                <button onClick={onClickNext} className="rounded-md bg-slate-200 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-fit">Next</button>
                                )
                            }
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        ) : (
            <StartRecording item={item} onRecordingStopped={changeAudioUrl} onScoreChange={onScoreChange} />
        )} 
    </section>
  )
}

export default PracticeTestCard