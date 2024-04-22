import React from 'react'
import Header from '../components/Header'
import PracticeContainer from '../components/PracticeContainer'


const TestPage = () => {
  return (
    <React.Fragment>
        <Header
        title={"Learn Accent Practice"}
        description={"Practice your accent by listening to audio files and repeating them."}
      />
        <main className="w-full">
            <PracticeContainer />
        </main>
    </React.Fragment>
  )
}

export default TestPage