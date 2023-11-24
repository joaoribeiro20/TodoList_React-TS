import React, { useState, useEffect } from 'react';
import '../styles/ErrorCard.scss'; // Certifique-se de ter um arquivo de estilo CSS correspondente

interface ErrorCardProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // Tempo em milissegundos (15 segundos)

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.max(prev - (100 / 15000) * 1000, 0));
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleMouseEnter = () => {
    setProgress(100); // Reinicia a barra de progresso ao passar o mouse sobre o card
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div className="error-card" onMouseEnter={handleMouseEnter}>
        <div className="error-message">{errorMessage}</div>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <button className="close-button" onClick={handleClose}>
          Fechar
        </button>
      </div>
    )
  );
};

export default ErrorCard;

