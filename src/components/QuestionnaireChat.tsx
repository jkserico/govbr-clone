import React, { useState, useEffect } from 'react';
import { UserData } from '@/data/userData';
import { getMotherOptions } from '@/data/userData';

interface Question {
  id: number;
  type: 'multiple' | 'yesno' | 'options';
  question: string;
  options?: string[];
  correctAnswer?: string;
}

interface QuestionnaireProps {
  userData: UserData;
  onComplete: () => void;
}

const QuestionnaireChat: React.FC<QuestionnaireProps> = ({ userData, onComplete }) => {
  // Prepare questions based on user data
  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple',
      question: 'Qual é o nome da sua mãe?',
      options: [...getMotherOptions(userData.motherName).slice(0, 3), "Nenhuma das alternativas"],
      correctAnswer: userData.motherName
    },
    {
      id: 2,
      type: 'yesno',
      question: 'Já acessou o GOV no celular?'
    },
    {
      id: 3,
      type: 'options',
      question: 'Qual seu estado civil?',
      options: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));

    // Animate to next question
    setShowNextQuestion(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setFinished(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
      setShowNextQuestion(false);
    }, 1000);
  };
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div className="relative w-full h-48 bg-govGray overflow-hidden">
        {/* This would be a video in a real implementation */}
        <div className="absolute inset-0 flex items-center justify-center bg-govDarkBlue/10">
          <div className="text-govDarkBlue text-center">
            <p className="font-bold">VALOR DA INDENIZAÇÃO</p>
            <p className="text-2xl font-bold text-govGreen mt-2">
              {formatCurrency(userData.compensation)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-govDarkBlue">
            Confirme suas informações para receber
          </h2>
          <p className="text-sm text-govDarkGray">
            Responda às perguntas abaixo para validar seus dados
          </p>
        </div>
        
        <div className="space-y-6">
          {questions.map((question, index) => {
            const answered = answers[question.id] !== undefined;
            const isActive = index === currentQuestionIndex;
            const wasAnswered = index < currentQuestionIndex;
            
            if (!isActive && !wasAnswered) return null;
            
            return (
              <div 
                key={question.id} 
                className={`p-3 rounded-lg ${
                  wasAnswered ? 'bg-govGray' : 'bg-white border border-govBlue/30'
                } ${
                  showNextQuestion && isActive ? 'opacity-50 transition-opacity' : ''
                }`}
              >
                <p className="font-semibold mb-3">{question.question}</p>
                
                {wasAnswered ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-govGreen flex items-center justify-center mr-2">
                      <svg 
                        className="w-3 h-3 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </div>
                    <p className="text-sm">{answers[question.id]}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {question.type === 'multiple' && question.options?.map(option => (
                      <button
                        key={option}
                        className={`p-2 text-left rounded border ${
                          option === question.correctAnswer 
                            ? 'border-govBlue hover:bg-govBlue/10' 
                            : 'border-govDarkGray hover:bg-govGray'
                        }`}
                        onClick={() => handleAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                    
                    {question.type === 'yesno' && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className="p-2 text-center rounded border border-govBlue hover:bg-govBlue/10"
                          onClick={() => handleAnswer('Sim')}
                        >
                          Sim
                        </button>
                        <button
                          className="p-2 text-center rounded border border-govDarkGray hover:bg-govGray"
                          onClick={() => handleAnswer('Não')}
                        >
                          Não
                        </button>
                      </div>
                    )}
                    
                    {question.type === 'options' && question.options?.map(option => (
                      <button
                        key={option}
                        className="p-2 text-left rounded border border-govDarkGray hover:bg-govGray"
                        onClick={() => handleAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {finished && (
            <div className="p-4 flex items-center justify-center">
              <div className="loading-spinner mr-3"></div>
              <span className="font-semibold">Processando suas respostas...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireChat;
