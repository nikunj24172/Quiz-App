import React, { useContext } from 'react'
import { QuizContext } from '../Context/QuizContext'

const QuizResult: React.FC = () => {
    const quizContext = useContext(QuizContext);
    if (!quizContext) {
        return <div>Loading...</div>
    }

    const { questions, correctedAnswersCount, apiErrorMessage } = quizContext;

    const totalQuestions = questions.length;
    const incorrectAnswersCount = totalQuestions - correctedAnswersCount;

    if (apiErrorMessage) {
        return <div className='text-red-500'>{apiErrorMessage}</div>;
    }


    return (
        <>
           <div className='mt-4 p-8 bg-white rounded-lg shadow-lg border w-1/2 border-gray-300 text-center mx-auto'>
                <h1 className='text-3xl font-bold mb-6 text-blue-600'>Quiz Result</h1>
                <p data-testid="total-questions" className='text-xl mb-2'>Total Questions: <span className='font-semibold'>{totalQuestions}</span></p>
                <p data-testid="correct-answers" className='text-green-600 text-xl mb-2'>Correct Answers: <span className='font-semibold'>{correctedAnswersCount}</span></p>
                <p data-testid="incorrect-answers" className='text-red-600 text-xl mb-2'>Incorrect Answers: <span className='font-semibold'>{incorrectAnswersCount}</span></p>
            </div>
        </>
    )
}

export default QuizResult
