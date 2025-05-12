
import React, { useEffect, useState } from "react";

export default function CalculationProcess() {
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowResult(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 bg-white rounded-md shadow-md max-w-xl mx-auto mt-10">
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-4">
        <div
          className="h-full bg-green-500 transition-all duration-100"
          style={{ width: progress + "%" }}
        ></div>
      </div>

      {!showResult ? (
        <>
          <h2 className="text-lg font-medium text-center text-gray-800 mb-2">Calculando sua indenização...</h2>
          <p className="text-sm text-center text-gray-500">Estamos analisando seus dados.</p>
        </>
      ) : (
        <div className="space-y-2 text-left text-sm text-gray-800">
          <p><strong>Nome:</strong> João da Silva</p>
          <p><strong>CPF:</strong> 123.456.789-00</p>
          <p><strong>Nome da Mãe:</strong> Maria Silva</p>
          <p><strong>Data de Nascimento:</strong> 10/03/1986</p>
          <p><strong>Valor da Indenização:</strong> R$ 1.412,00</p>
        </div>
      )}
    </div>
  );
}
