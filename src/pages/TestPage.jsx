import React from 'react'
import TestContainer from '../components/TestContainer'
import Header from '../components/Header'


const TestPage = () => {
  return (
    <React.Fragment>
        <Header />
        <main className="w-full">
            <TestContainer />
        </main>
    </React.Fragment>
  )
}

export default TestPage