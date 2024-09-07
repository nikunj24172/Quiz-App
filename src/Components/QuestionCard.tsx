import React, { useContext } from 'react'
import { QuizContext } from '../Context/QuizContext'
import { useNavigate } from 'react-router-dom';
import he from 'he';


const QuestionCard: React.FC = () => {
    const quizContext = useContext(QuizContext);
    const navigate = useNavigate();

    if (!quizContext) {
        return <div>Loading..</div>
    }

    const { questions, currentQuestionIndex, selectedAnswer, handleAnswerClick, handleSubmit, handleNextQuestion, errorMessage, correctAnswerExplaination } = quizContext;

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <div>No Questions Available..</div>;
    }

    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

    const handleFinalSubmit = () => {
        handleSubmit();
        navigate('/result');
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='p-8 bg-white rounded shadow-md w-full max-w-lg'>
                {errorMessage && (
                    <div data-testid="error-message" className='text-red-500'>{errorMessage}</div>
                )}
                <h1 className='text-2xl font-bold mb-4'>{he.decode(currentQuestion.question)}</h1>
                <div className='mt-4'>
                    {allAnswers.map((answer, index) => {
                        const isSelected = selectedAnswer === answer;
                        const isCorrect = answer === currentQuestion.correct_answer;
                        const buttonClass = isSelected ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : (selectedAnswer && isCorrect ? 'bg-green-500 text-white' : 'bg-dark hover:bg-gray-100');
                        return (
                            <button data-testid={`answer-${index}`} key={index} className={`block w-full p-2 my-2 border ${buttonClass} transition`} onClick={() => handleAnswerClick(answer)} disabled={selectedAnswer !== null}>
                                {he.decode(answer)}
                            </button>
                        )
                    })}

                    {selectedAnswer && (
                        <div data-testid="result-message" className='mt-4'>
                            {selectedAnswer === currentQuestion.correct_answer ? (
                                <p className='text-green-600'>{selectedAnswer} is Correct!</p>
                            ) : (
                                <p className='text-red-600'>Incorrect answer. The correct answer is {currentQuestion.correct_answer}.</p>
                            )}

                        </div>
                    )}

                    {currentQuestionIndex < questions.length - 1 ? (
                        <button data-testid="next-button" className='mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition' onClick={handleNextQuestion} disabled={!selectedAnswer}>Next</button>
                    ) : <button data-testid="submit-button" className='mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition' onClick={handleFinalSubmit}>Submit</button>}
                </div>
            </div>
        </div>
    )
}

export default QuestionCard;
