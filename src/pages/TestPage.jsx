import React from 'react'
import TestContainer from '../components/TestContainer'
import Header from '../components/Header'


const TestPage = () => {
  return (
    <React.Fragment>
        <Header title={"Accent Test"} description={"Read each  text / phrase in American accent and record your voice."} />
        <main className="w-full">
            <TestContainer />
        </main>
    </React.Fragment>
  )
}

export default TestPage