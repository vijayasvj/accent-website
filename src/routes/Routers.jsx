import React from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import TestPage from "../pages/TestPage"
import TestCompletedPage from "../pages/TestCompletedPage"
import LearnAccentPage from "../pages/LearnAccentPage"
import PracticeTestCompletionPage from "../pages/PracticeTestCompletionPage"
import HomePage from "../pages/HomePage";
import ExamplePage from "../pages/ExamplePage";

export const Routers = () => {
    return (
      <Router>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/learn-accent' element={<LearnAccentPage />} />  
              <Route path='/accent-test' element={<TestPage />} />  
              <Route path='/test-completion' element={<TestCompletedPage />} />  
              <Route path='/practice-test-completion' element={<PracticeTestCompletionPage />} /> 
              <Route path='/examples' element={<ExamplePage />} />         
          </Routes>
      </Router>
      )
}