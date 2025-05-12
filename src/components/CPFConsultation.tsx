
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { formatCPF, unformatCPF } from '@/lib/formatCPF';
import { validateCPF } from '@/lib/validateCPF';
import { useToast } from '@/hooks/use-toast';

interface CPFConsultationProps {
  onSubmit: (cpf: string) => void;
}

const CPFConsultation: React.FC<CPFConsultationProps> = ({ onSubmit }) => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = unformatCPF(value);
    
    // Only update if it's empty or contains only numbers and is no longer than 11 digits
    if (value === '' || (!/\D/.test(numbersOnly) && numbersOnly.length <= 11)) {
      setCpf(formatCPF(numbersOnly));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const cleanCPF = unformatCPF(cpf);
    
    if (!validateCPF(cleanCPF)) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, insira um CPF válido.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      onSubmit(cleanCPF);
    }, 2000);
  };

  return (
    <div className="relative w-full min-h-screen bg-govBlue flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img 
          src="/lovable-uploads/d7798f07-8b31-469f-890a-fc43c46895ee.png" 
          alt="Pessoas felizes segurando celular com formulário" 
          className="w-full h-full object-contain md:object-cover"
        />
      </div>

      {/* CPF Form Card */}
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md z-20 mx-4">
        <div className="flex justify-center mb-4">
          <img 
            src="https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png" 
            alt="Logo Gov.br" 
            className="h-8"
          />
          {/* Removed Canal Gov image */}
        </div>
        
        <h2 className="text-xl font-bold text-center text-govDarkBlue mb-6">
          Verifique sua indenização no canal oficial do GOV.BR:
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="flex items-center mb-2">
              <svg 
                className="w-5 h-5 text-govBlue mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
              </svg>
              <span className="font-medium text-sm">Número do CPF</span>
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Digite seu CPF para consultar sua indenização do gov.br
            </p>
            <input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="Digite seu CPF"
              className="gov-input"
              disabled={loading}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-govBlue text-white font-bold py-3 px-4 rounded-md hover:bg-govDarkBlue transition-colors duration-200 uppercase text-sm w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-3 h-4 w-4"></div>
                <span>CONSULTANDO...</span>
              </div>
            ) : 'CONSULTAR INDENIZAÇÃO'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-govBlue text-xs hover:underline">
            Termos de Uso e Aviso de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
};

export default CPFConsultation;
