import React from 'react';
import './EpochGauge.css';

interface EpochGaugeProps {
  epoch: string;
}

/**
 * Affiche une jauge représentant l'époque du dinosaure.
 * Le format attendu est "NomEpoch_EpochN" (exemple : "Prehistoric_Epoch3").
 * La jauge indique le nom de l'époque et un remplissage proportionnel au niveau (sur 4).
 */
const EpochGauge: React.FC<EpochGaugeProps> = ({ epoch }) => {
  // Extraction du nom et du niveau à partir de la chaîne
  const [epochName, epochLevelStr] = epoch.split('_Epoch');
  const epochLevel = parseInt(epochLevelStr, 10);
  const maxLevel = 4;
  const percentage = (epochLevel / maxLevel) * 100;

  return (
    <div className="epoch-gauge">
      <div className="epoch-label">{epochName}</div>
      <div className="epoch-bar">
        <div className="epoch-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="epoch-level">{`Époque ${epochLevel} / ${maxLevel}`}</div>
    </div>
  );
};

export default EpochGauge;
