import React from 'react';
import './AgeEpochDisplay.css';
import { Dinosaur } from '../../../types/Dinosaur';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

interface AgeEpochDisplayProps {
  dinosaur: Dinosaur;
}

/**
 * Composant unique qui affiche l'âge et l'époque du dinosaure de manière moderne et intuitive.
 * 
 * - L'âge est affiché à partir du champ "age" (en secondes) et formaté de manière adaptée :
 *   • Moins d'une minute : affichage des secondes.
 *   • Moins d'une heure : minutes et secondes.
 *   • Moins d'un jour : heures et minutes.
 *   • Moins d'une année : jours et heures.
 *   • Sinon : années et jours.
 *   De plus, le facteur d'âge final (final_age_factor) est affiché.
 * 
 * - L'époque est représentée par une jauge animée.
 *   Le nom et le niveau d'époque (format "NomEpoch_EpochN") sont extraits pour afficher le nom et le niveau (sur 4) sous forme de barre.
 * 
 * Des triggers overlay sont associés :
 * - En cliquant sur l'âge, on affiche le détail associé à AGE (incluant le calcul du ratio d'âge).
 * - En cliquant sur le nom de l'époque, on affiche le détail EPOCH_LABEL.
 * - En cliquant sur la barre d'époque, on affiche le détail EPOCH_BAR.
 */
const AgeEpochDisplay: React.FC<AgeEpochDisplayProps> = ({ dinosaur }) => {
  const { openStatDetail } = useOverlay();

  // Formatage de la durée en secondes selon différents paliers
  const formatAge = (lastReborn: Date): string => {
    const now = new Date().getTime();
    const diffMs = now - new Date(lastReborn).getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      const remainingDays = days % 365;
      return `${years} an${years > 1 ? 's' : ''} ${remainingDays} j`;
    } else if (days > 0) {
      const remainingHours = hours % 24;
      return `${days} j ${remainingHours} h`;
    } else if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours} h ${remainingMinutes} min`;
    } else if (minutes > 0) {
      const remainingSeconds = seconds % 60;
      return `${minutes} min ${remainingSeconds} sec`;
    } else {
      return `${seconds} sec`;
    }
  };

  // Ici on utilise le champ "age" stocké dans le dinosaure
  // Si ce champ n'est pas défini, on peut se rabattre sur last_reborn
  const ageValue = (typeof dinosaur.age === 'number' && dinosaur.age >= 0)
    ? dinosaur.age
    : (new Date().getTime() - new Date(dinosaur.last_reborn).getTime()) / 1000;

  const ageText = formatAge(new Date(new Date().getTime() - ageValue * 1000));

  // Extraction du nom et du niveau d'époque à partir de la valeur epoch
  const parseEpoch = (epoch: string) => {
    const [epochName, epochLevelStr] = epoch.split('_Epoch');
    const epochLevel = parseInt(epochLevelStr, 10);
    const maxLevel = 4;
    const percentage = (epochLevel / maxLevel) * 100;
    return { epochName, epochLevel, maxLevel, percentage };
  };

  const { epochName, epochLevel, maxLevel, percentage } = parseEpoch(dinosaur.epoch);

  return (
    <div className="age-epoch-display">
      {/* Affichage de l'âge avec déclencheur overlay */}
      <div className="age-container" onClick={() => openStatDetail(ClickableStatTarget.AGE)}>
        <div className="age-label">Âge : {ageText}</div>
      </div>

      {/* Affichage de la jauge d'époque */}
      <div className="epoch-container">
        <div className="epoch-header" onClick={() => openStatDetail(ClickableStatTarget.EPOCH_LABEL)}>
          <span className="epoch-name">{epochName}</span>
          <span className="epoch-level">{`Époque ${epochLevel} / ${maxLevel}`}</span>
        </div>
        <div className="epoch-bar" onClick={() => openStatDetail(ClickableStatTarget.EPOCH_BAR)}>
          <div className="epoch-fill" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
};

export default AgeEpochDisplay;
