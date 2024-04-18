import React from "react"
import "./App.css"
import Layout from "./layout/Layout"

function App() {
  return (
    <div className="bg-slate-950 text-slate-200 h-screen overflow-x-hidden flex flex-col items-center justify-center space-y-12">
      {/* <Header />
      <main className="w-full">
        <TestContainer />
      </main> */}
      <Layout />
    </div>
  )
}

export default App
