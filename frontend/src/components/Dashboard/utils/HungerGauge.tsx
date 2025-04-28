import React from 'react';
import './HungerGauge.css';
import { Dinosaur } from '../../../types/Dinosaur';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

/**
 * Composant de jauge pour la faim.
 * La couleur varie d'un rouge très pâle (lorsqu'elle est vide) à un rouge profond (quand elle est pleine).
 * Une animation de transition est appliquée.
 * Si la jauge de nourriture est à zéro et que la faim dépasse 80% de sa capacité,
 * la bordure clignote (lentement entre 80% et 90%, puis rapidement au-delà).
 */
const HungerGauge: React.FC<{ dinosaur: Dinosaur }> = ({ dinosaur }) => {
  const { openStatDetail } = useOverlay();
  const currentHunger = dinosaur.hunger;
  const maxHunger = dinosaur.final_max_hunger;
  const fraction = Math.min(currentHunger / maxHunger, 1);
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

  // Nouvelles couleurs de base pour la jauge de faim :
  const colorLow = "#FFE0E0"; // rouge très pâle
  const colorFull = "#B71C1C"; // rouge profond
  const hungerColor = blendColors(colorLow, colorFull, fraction);

  // Halo : plus la faim est faible, plus le halo est prononcé
  const haloRatio = 1 - fraction;
  const haloSize = 4 + haloRatio * 4;
  const haloStyle = {
    boxShadow: haloRatio > 0 ? `0 0 ${haloSize}px ${hungerColor}` : 'none',
    transition: 'box-shadow 0.5s ease-out'
  };

  // Animation de clignotement de la bordure si la jauge de nourriture est à zéro
  // et que la faim dépasse 80% de sa capacité
  let blinkClass = "";
  if (dinosaur.food === 0 && fraction >= 0.8) {
    blinkClass = fraction < 0.9 ? "blink-slow" : "blink-fast";
  }

  return (
    <div className="hunger-gauge">
      <div className="hunger-label">FAIM</div>
      <div className={`hunger-bar ${blinkClass}`} style={haloStyle} onClick={() => openStatDetail(ClickableStatTarget.HUNGER_GAUGE)}>
        <div
          className="hunger-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: hungerColor,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>
      <div className="hunger-text" onClick={() => openStatDetail(ClickableStatTarget.HUNGER_GAUGE_TEXT)}>
        {currentHunger} / {maxHunger}
      </div>
    </div>
  );
};

export default HungerGauge;
