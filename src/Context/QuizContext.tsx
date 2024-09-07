import React from 'react';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

interface Question {
    question: string,
    correct_answer: string,
    incorrect_answers: string[];
}

interface QuizContextProps {
    questions: Question[];
    currentQuestionIndex: number,
    selectedAnswer: string | null;
    showResult: boolean;
    correctedAnswersCount: number,
    errorMessage: string,
    apiErrorMessage: string,
    correctAnswerExplaination: string | null;
    handleAnswerClick: (answer: string) => void;
    handleNextQuestion: () => void;
    handleSubmit: () => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [correctedAnswersCount, setCorrectAnswerCount] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswerExplaination, setcorrectAnswerExplanation] = useState<string | null>(null);
    const [apiErrorMessage, setApiErrorMessage] = useState<string>("");



useEffect(() => {
    const fetchQuestions = async () => {
        if (questions.length > 0) return;
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=10');
            if (response.status === 200) {
                setQuestions(response.data.results);
                setCurrentQuestionIndex(0);
            } else {
                throw new Error(`HTTP status ${response.status}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setApiErrorMessage(`Failed to fetch questions. Error: ${error.message}`);
            } else {
                setApiErrorMessage("Failed to fetch questions. Please try again later.");
            }
        }
    };
    fetchQuestions();
}, [questions]);



    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].correct_answer) {
            setCorrectAnswerCount(correctedAnswersCount + 1);
        }
        setShowResult(true);
        setErrorMessage("");
        setcorrectAnswerExplanation(questions[currentQuestionIndex].correct_answer);
    }


    const handleSubmit = () => {
        if (!selectedAnswer) {
            setErrorMessage("Please Select your answer");
            return;
        }
        setErrorMessage("");
        if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
            setCorrectAnswerCount(correctedAnswersCount + 1);
        }
        setShowResult(true);
        setcorrectAnswerExplanation(questions[currentQuestionIndex].correct_answer)
    }


    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            setErrorMessage("Please select your answer");
            return;
        }
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setErrorMessage("");
    }

    return (
        <QuizContext.Provider value={{
            questions,
            currentQuestionIndex,
            selectedAnswer,
            showResult,
            correctedAnswersCount,
            handleAnswerClick,
            handleSubmit,
            errorMessage,
            handleNextQuestion,
            correctAnswerExplaination,
            apiErrorMessage
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export { QuizContext, QuizProvider };