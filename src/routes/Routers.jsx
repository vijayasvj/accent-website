import React from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import TestPage from "../pages/TestPage"
import TestCompletedPage from "../pages/TestCompletedPage"
import LearnAccentPage from "../pages/LearnAccentPage"
import PracticeTestCompletionPage from "../pages/PracticeTestCompletionPage"

export const Routers = () => {
    return (
      <Router>
          <Routes>
              <Route path='/' element={<Navigate to='/learn-accent' />} />
              <Route path='/learn-accent' element={<LearnAccentPage />} />  
              <Route path='/accent-test' element={<TestPage />} />  
              <Route path='/test-completion' element={<TestCompletedPage />} />  
              <Route path='/practice-test-completion' element={<PracticeTestCompletionPage />} />         
          </Routes>
      </Router>
      )
}