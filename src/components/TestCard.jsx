import React, { useState } from 'react'
import StartRecording from './StartRecording';

const TestCard = ({ item, onTotalScoreChange, onClickNext, isLastTest }) => {
    const [isAudioRecorded, setIsAudioRecorded] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null)
    const [score, setScore] = useState(0)

  const changeAudioUrl = (url) => {
    setIsAudioRecorded(true)
    setAudioUrl(url)
  }

  const onScoreChange = (score) => {
    setScore(score)
    onTotalScoreChange(score)
  }

  return (
    <section className='w-full flex flex-col items-center space-y-4'>
        <p className='w-full text-start'>Text - {item.id}: {item.text}</p>
        {isAudioRecorded ? (
            <React.Fragment>
                <audio
                    src={audioUrl}
                    controls
                    className='w-full'
                    autoPlay={false}
                />
                <div className='w-full flex space-between'>
                <span className='w-full text-start pl-4'>Score: {score}</span>
                {isLastTest ? (
                  <a href="/test-completion"><button onClick={onClickNext} className="rounded-md bg-slate-200 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-fit">Submit Test</button></a>
                ) : (
                  <button onClick={onClickNext} className="rounded-md bg-slate-200 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-fit">Next</button>
                  )
                }
                </div>
            </React.Fragment>
        ) : (
            <StartRecording item={item} onRecordingStopped={changeAudioUrl} onScoreChange={onScoreChange} />
        )}
    </section>
  )
}

export default TestCard