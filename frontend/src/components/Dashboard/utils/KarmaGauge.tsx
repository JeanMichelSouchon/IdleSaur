import React from 'react';
import './KarmaGauge.css';
import { Dinosaur } from '../../../types/Dinosaur';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

interface KarmaGaugeProps {
  dinosaur: Dinosaur;
}

/**
 * Composant de jauge d'équilibre pour le Karma.
 * Le karma est une valeur comprise entre -karma_width et +karma_width.
 * - Si la valeur est négative, la jauge se remplit vers la gauche avec un dégradé progressif vers le noir.
 * - Si la valeur est positive, la jauge se remplit vers la droite avec un dégradé progressif vers le jaune or.
 * La bordure de la jauge évolue en ajoutant un halo dynamique (noir ou jaune selon le signe),
 * et une animation accompagne toute évolution de la valeur.
 * Le libellé ("Karma") est affiché au-dessus et les valeurs numériques en dessous.
 */
const KarmaGauge: React.FC<KarmaGaugeProps> = ({ dinosaur }) => {
  const { openStatDetail } = useOverlay();
  const maxKarma = dinosaur.karma_width;
  const currentKarma = dinosaur.karma;

  // Calcul des pourcentages de remplissage (la jauge est divisée en deux moitiés à partir du centre)
  const positivePercentage =
    currentKarma > 0 ? Math.min((currentKarma / maxKarma) * 50, 50) : 0;
  const negativePercentage =
    currentKarma < 0 ? Math.min((Math.abs(currentKarma) / maxKarma) * 50, 50) : 0;

  // Calcul de l'intensité du halo pour la bordure de la jauge (de 0 à 1)
  const haloRatio = Math.min(Math.abs(currentKarma) / maxKarma, 1);
  const haloSize = 4 + haloRatio * 4; // de 4px à 8px
  const haloOpacity = haloRatio * 0.6; // opacité de 0 à 0.6
  const haloColor =
    currentKarma >= 0
      ? `rgba(255, 215, 0, ${haloOpacity})`
      : `rgba(0, 0, 0, ${haloOpacity})`;
  const haloStyle = {
    boxShadow: haloRatio > 0 ? `0 0 ${haloSize}px ${haloColor}` : 'none',
    transition: 'box-shadow 0.5s ease-out'
  };

  return (
    <div className="karma-gauge">
      <div className="karma-label">KARMA</div>
      <div className="karma-bar" style={haloStyle} onClick={() => openStatDetail(ClickableStatTarget.KARMA_GAUGE)}>
        <div
          className="karma-fill negative"
          style={{
            width: `${negativePercentage}%`,
            transition: 'width 0.5s ease-out'
          }}
        />
        <div className="karma-center" />
        <div
          className="karma-fill positive"
          style={{
            width: `${positivePercentage}%`,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>
      <div className="karma-text" onClick={() => openStatDetail(ClickableStatTarget.KARMA_GAUGE_TEXT)}>
        {currentKarma < 0 ? '-' : ''}
        {Math.abs(currentKarma)} / {currentKarma < 0 ? '-' : ''}
        {maxKarma}
      </div>
    </div>
  );
};

export default KarmaGauge;
