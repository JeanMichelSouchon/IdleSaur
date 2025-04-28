import React from 'react';
import './EnergyGauge.css';
import { Dinosaur } from '../../../types/Dinosaur';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

/**
 * Composant de jauge pour l'énergie.
 * Affiche l'énergie actuelle par rapport à l'énergie maximale.
 * La couleur de remplissage s'assombrit à mesure que l'énergie diminue.
 * Un effet d'éclat est déclenché lorsque l'énergie atteint son maximum.
 */
const EnergyGauge: React.FC<{ dinosaur: Dinosaur }> = ({ dinosaur }) => {
  const { openStatDetail } = useOverlay();
  const currentEnergy = dinosaur.energy;
  const maxEnergy = dinosaur.final_max_energy;
  const fraction = Math.min(currentEnergy / maxEnergy, 1);
  const percentage = fraction * 100;

  // Interpolation linéaire entre noir et vert (#4CAF50) en fonction de l'énergie.
  const r = Math.floor(76 * fraction);
  const g = Math.floor(175 * fraction);
  const b = Math.floor(80 * fraction);
  const energyColor = `rgb(${r}, ${g}, ${b})`;

  // Effet d'éclat déclenché lorsque l'énergie est pleine.
  const isFull = currentEnergy === maxEnergy;

  return (
    <div className="energy-gauge">
      <div className="energy-label">ÉNERGIE</div>
      <div className={`energy-bar ${isFull ? 'sparkle' : ''}`} onClick={() => openStatDetail(ClickableStatTarget.ENERGY_GAUGE)}>
        <div
          className="energy-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: energyColor,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>
      <div className="energy-text" onClick={() => openStatDetail(ClickableStatTarget.ENERGY_GAUGE_TEXT)}>
        {currentEnergy} / {maxEnergy}
      </div>
    </div>
  );
};

export default EnergyGauge;
