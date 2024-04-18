import React from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import TestPage from "../pages/TestPage"
import TestCompletedPage from "../pages/TestCompletedPage"

export const Routers = () => {
    return (
      <Router>
          <Routes>
              <Route path='/' element={<Navigate to='/accent-test' />} />
              <Route path='/accent-test' element={<TestPage />} />  
              <Route path='/test-completion' element={<TestCompletedPage />} />         
          </Routes>
      </Router>
      )
}