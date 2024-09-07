import React, { useContext } from 'react'
import { QuizContext } from '../Context/QuizContext';
import QuestionCard from './QuestionCard';
import QuizResult from './QuizResult';

const TriviaGame = () => {
    const quizContext = useContext(QuizContext);

    if (!quizContext) {
        return <div>Loading..</div>
    }

    const { questions, currentQuestionIndex, selectedAnswer, showResult, correctedAnswersCount, handleAnswerClick, handleSubmit, handleNextQuestion, correctAnswerExplaination, errorMessage } = quizContext;

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className='text-center'>
                <h2 className='text-2xl font-bold'>Results</h2>
                <p>Total Questions: {questions.length}</p>
                <p>Total Correct: {correctedAnswersCount}</p>
                <p>Total Incorrect : {questions.length - correctedAnswersCount}</p>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort()

    return (
        <>
            <div className='p-4 bg-white rounded shadow-md'>
                {quizContext.errorMessage && (
                    <div className='text-red-500'>{quizContext.errorMessage}</div>
                )}
                <QuestionCard
                    question={currentQuestion.question}
                    answers={allAnswers}
                    selectedAnswer={selectedAnswer}
                    onAnswerClick={handleAnswerClick}
                    onSubmit={handleSubmit}
                    onNextquestion={handleNextQuestion}
                    errorMessage={errorMessage}
                />

                {showResult && (
                    <QuizResult
                        isCorrect={selectedAnswer === currentQuestion.correct_answer}
                        correctAnswer={currentQuestion.correct_answer}
                        correctAnswerExplaination={correctAnswerExplaination}
                        onNextQuestion={handleNextQuestion}
                    />
                )}
            </div>
        </>
    )
}

export default TriviaGame;
