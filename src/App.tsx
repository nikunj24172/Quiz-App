import React from 'react'
import { QuizProvider } from './Context/QuizContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuestionCard from './Components/QuestionCard'
import QuizResult from './Components/QuizResult'
import DisableRightClick from './Components/DisableRightClick'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <QuizProvider>
          {/* <DisableRightClick /> */}
          <div className='app flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 bg-cover bg-center'>
            <h1 className='text-2xl font-bold mb-8'>Trivia Game</h1>
            <Routes>
              <Route path='/' element={<QuestionCard />} />
              <Route path='/result' element={<QuizResult />} />
            </Routes>
          </div>
        </QuizProvider>
      </BrowserRouter>
    </>
  )
}

export default App
