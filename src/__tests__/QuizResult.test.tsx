import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuizContext } from '../Context/QuizContext';
import QuizResult from '../Components/QuizResult';

describe('QuizResult Component', () => {
    const mockContextValue = {
        questions: [
            { question: 'Question 1', correct_answer: 'Answer 1', incorrect_answers: ['Wrong 1', 'Wrong 2', 'Wrong 3'] },
            { question: 'Question 2', correct_answer: 'Answer 2', incorrect_answers: ['Wrong 1', 'Wrong 2', 'Wrong 3'] },
        ],
        correctedAnswersCount: 1,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showResult: false,
        errorMessage: '',
        correctAnswerExplaination: null,
        handleAnswerClick: jest.fn(),
        handleNextQuestion: jest.fn(),
        handleSubmit: jest.fn(),
        apiErrorMessage: '', 
    };

    it('renders the quiz result correctly', () => {
        render(
            <QuizContext.Provider value={mockContextValue}>
                <QuizResult />
            </QuizContext.Provider>
        );

        expect(screen.getByTestId('total-questions')).toHaveTextContent('Total Questions: 2');
        expect(screen.getByTestId('correct-answers')).toHaveTextContent('Correct Answers: 1'); // Added space
        expect(screen.getByTestId('incorrect-answers')).toHaveTextContent('Incorrect Answers: 1'); // Added space
    });
});