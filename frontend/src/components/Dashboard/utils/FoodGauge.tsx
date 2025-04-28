import React from 'react';
import './FoodGauge.css';
import { Dinosaur } from '../../../types/Dinosaur';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

/**
 * Composant de jauge pour la nourriture.
 * La couleur évolue de jaune pâle (quand vide) vers un jaune intense (#FF9800) quand pleine.
 * Une animation de transition est appliquée.
 * Si la jauge de faim dépasse 80% de sa capacité, la barre clignote pour signaler qu'il faut manger.
 */
const FoodGauge: React.FC<{ dinosaur: Dinosaur }> = ({ dinosaur }) => {
  const { openStatDetail } = useOverlay();
  const currentFood = dinosaur.food;
  const maxFood = dinosaur.final_max_food;
  const fraction = Math.min(currentFood / maxFood, 1);
  const percentage = fraction * 100;

  // Fonction d'interpolation entre deux couleurs hexadécimales
  const blendColors = (color1: string, color2: string, fraction: number): string => {
    let c1 = color1.replace('#', '');
    let c2 = color2.replace('#', '');
    if (c1.length === 3) {
      c1 = c1.split('').map(c => c + c).join('');
    }
    if (c2.length === 3) {
      c2 = c2.split('').map(c => c + c).join('');
    }
    const r1 = parseInt(c1.substring(0, 2), 16);
    const g1 = parseInt(c1.substring(2, 4), 16);
    const b1 = parseInt(c1.substring(4, 6), 16);
    const r2 = parseInt(c2.substring(0, 2), 16);
    const g2 = parseInt(c2.substring(2, 4), 16);
    const b2 = parseInt(c2.substring(4, 6), 16);
    const r = Math.round(r1 + (r2 - r1) * fraction);
    const g = Math.round(g1 + (g2 - g1) * fraction);
    const b = Math.round(b1 + (b2 - b1) * fraction);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Couleurs de base pour la jauge de nourriture
  const colorLow = "#FFECB3"; // jaune clair, pâle
  const colorFull = "#FF9800"; // jaune intense
  const foodColor = blendColors(colorLow, colorFull, fraction);

  // Halo similaire : plus la nourriture est faible, plus le halo est prononcé
  const haloRatio = 1 - fraction;
  const haloSize = 4 + haloRatio * 4;
  const haloOpacity = haloRatio * 0.6;
  const haloColor = foodColor;
  const haloStyle = {
    boxShadow: haloRatio > 0 ? `0 0 ${haloSize}px ${haloColor}` : 'none',
    transition: 'box-shadow 0.5s ease-out'
  };

  // Si la jauge de faim dépasse 80% (calculé par rapport au dinosaure), la barre blink
  const hungerRatio = dinosaur.hunger / dinosaur.final_max_hunger;
  const blinkClass = hungerRatio >= 0.8 ? "blink" : "";

  return (
    <div className="food-gauge">
      <div className="food-label">NOURRITURE</div>
      <div className={`food-bar ${blinkClass}`} style={haloStyle} onClick={() => openStatDetail(ClickableStatTarget.FOOD_GAUGE)}>
        <div
          className="food-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: foodColor,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>
      <div className="food-text" onClick={() => openStatDetail(ClickableStatTarget.FOOD_GAUGE_TEXT)}>
        {currentFood} / {maxFood}
      </div>
    </div>
  );
};

export default FoodGauge;
