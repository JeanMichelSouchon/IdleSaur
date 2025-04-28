import React, { useEffect, useRef, useState } from 'react';
import './LuckGauge.css';
import { Dinosaur } from '../../../types/Dinosaur';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

interface LuckGaugeProps {
  dinosaur: Dinosaur;
}

const LuckGauge: React.FC<LuckGaugeProps> = ({ dinosaur }) => {
  const { openStatDetail } = useOverlay();
  // Le luck factor est compris entre 0 et 1, on le convertit en pourcentage
  const luckPercentage = dinosaur.final_luck_factor * 100;

  // Définir la couleur de l'arc et la classe de halo selon le pourcentage
  let gaugeColor = '#FFD700'; // jaune par défaut
  let haloClass = '';
  if (luckPercentage < 30) {
    gaugeColor = '#FF6347'; // rouge tomate pour la malchance
    haloClass = luckPercentage <= 10 ? 'halo-low' : 'halo-mid';
  } else if (luckPercentage > 70) {
    gaugeColor = '#32CD32'; // vert lime pour la chance élevée
    haloClass = luckPercentage === 100 ? 'halo-high-blink' : 'halo-mid';
  } else {
    haloClass = 'halo-mid';
  }

  // Gestion de l'animation lors du changement de valeur
  const [animationClass, setAnimationClass] = useState('');
  const prevLuck = useRef(luckPercentage);
  useEffect(() => {
    if (luckPercentage > prevLuck.current) {
      setAnimationClass('value-increase');
    } else if (luckPercentage < prevLuck.current) {
      setAnimationClass('value-decrease');
    }
    prevLuck.current = luckPercentage;
    if (animationClass !== '') {
      const timer = setTimeout(() => setAnimationClass(''), 800);
      return () => clearTimeout(timer);
    }
  }, [luckPercentage, animationClass]);

  // Calcul de l'arc en demi-cercle
  // On définit un SVG avec viewBox 0 0 200 100 pour un demi-cercle.
  const arcAngle = (luckPercentage / 100) * 180;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;
  // Point de départ (extrémité gauche de l'arc)
  const startX = centerX - radius;
  const startY = centerY;
  // Calcul du point d'arrivée de l'arc en fonction de l'angle
  const theta = (Math.PI * (180 - arcAngle)) / 180;
  const endX = centerX + radius * Math.cos(theta);
  const endY = centerY - radius * Math.sin(theta);
  const largeArcFlag = arcAngle > 180 ? 1 : 0;
  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

  return (
    <div className="luck-gauge-container" onClick={() => openStatDetail(ClickableStatTarget.LUCK_GAUGE)}>
      <svg className="luck-gauge-svg" viewBox="0 0 200 100">
        {/* Fond de la jauge (demi-cercle gris) */}
        <path
          className="luck-gauge-bg"
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#ccc"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Arc de chance avec couleur dynamique, halo et animation */}
        <path
          className={`luck-gauge-arc ${haloClass} ${animationClass}`}
          d={arcPath}
          fill="none"
          stroke={gaugeColor}
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>
      <div className="luck-gauge-info">
        <div className="luck-gauge-percentage-text">{luckPercentage.toFixed(1)}%</div>
        <div className="luck-gauge-label">Chance</div>
      </div>
    </div>
  );
};

export default LuckGauge;
