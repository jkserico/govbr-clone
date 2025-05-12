
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ seconds, onComplete }) => {
  const [count, setCount] = useState(seconds);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setCount(count - 1);
      setProgress(((seconds - count + 1) / seconds) * 100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [count, onComplete, seconds]);
  
  // Format time as M:SS
  const minutes = Math.floor(count / 60);
  const remainingSeconds = count % 60;
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-6">
        <p className="text-govBlue text-center mb-2">
          Você poderá iniciar a<br />consulta em
        </p>
        <span className="text-govBlue text-4xl font-bold">{formattedTime}</span>
      </div>
      
      <div className="w-full max-w-xs mb-4">
        <Progress value={progress} />
      </div>
      
      <p className="mt-4 text-center text-gray-600 text-sm px-4">
        Aguarde até a barra azul<br />se completar.
      </p>
    </div>
  );
};

export default CountdownTimer;
