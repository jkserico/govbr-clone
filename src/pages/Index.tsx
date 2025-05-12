
import React, { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import CPFConsultation from '@/components/CPFConsultation';
import CalculationProcess from '@/components/CalculationProcess';
import QuestionnaireChat from '@/components/QuestionnaireChat';
import PixRegistration from '@/components/PixRegistration';
import Receipt from '@/components/Receipt';
import { getUserData, UserData } from '@/data/userData';

enum Stage {
  COUNTDOWN = 'countdown',
  CPF_CONSULTATION = 'cpf_consultation',
  CALCULATION = 'calculation',
  QUESTIONNAIRE = 'questionnaire',
  PIX_REGISTRATION = 'pix_registration',
  RECEIPT = 'receipt'
}

const Index = () => {
  const [stage, setStage] = useState<Stage>(Stage.COUNTDOWN);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pixType, setPixType] = useState<string>('');
  const [pixKey, setPixKey] = useState<string>('');

  const handleCountdownFinish = () => {
    setStage(Stage.CPF_CONSULTATION);
  };

  const handleCPFSubmit = (cpf: string) => {
    const data = getUserData(cpf);
    setUserData(data);
    setStage(Stage.CALCULATION);
  };

  const handleCalculationFinish = () => {
    setStage(Stage.QUESTIONNAIRE);
  };

  const handleQuestionnaireFinish = () => {
    setStage(Stage.PIX_REGISTRATION);
  };

  const handlePixSubmit = (type: string, key: string) => {
    setPixType(type);
    setPixKey(key);
    setStage(Stage.RECEIPT);
  };

  return (
    <div className="min-h-screen bg-[#1a3fa6] text-white flex flex-col items-center justify-center">
      {stage === Stage.COUNTDOWN && <CountdownTimer onFinish={handleCountdownFinish} />}
      {stage === Stage.CPF_CONSULTATION && <CPFConsultation onSubmit={handleCPFSubmit} />}
      {stage === Stage.CALCULATION && <CalculationProcess onFinish={handleCalculationFinish} />}
      {stage === Stage.QUESTIONNAIRE && <QuestionnaireChat onFinish={handleQuestionnaireFinish} />}
      {stage === Stage.PIX_REGISTRATION && <PixRegistration onSubmit={handlePixSubmit} />}
      {stage === Stage.RECEIPT && <Receipt pixType={pixType} pixKey={pixKey} />}
    </div>
  );
};

export default Index;
