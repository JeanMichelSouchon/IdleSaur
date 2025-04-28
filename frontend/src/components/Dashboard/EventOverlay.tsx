import React from 'react';
import './EventOverlay.css';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import { EventModifier, EventModifierTarget } from '../../types/EventModifier';

/**
 * Mapping pour traduire et associer des emoji aux cibles de modificateur.
 */
const targetMapping: Record<EventModifierTarget, { label: string; emoji: string }> = {
  energy: { label: 'Énergie', emoji: '⚡' },
  food: { label: 'Nourriture', emoji: '🍎' },
  hunger: { label: 'Faim', emoji: '😰' },
  experience: { label: 'Expérience', emoji: '📚' },
  karma: { label: 'Karma', emoji: '☯️' },
  money: { label: 'Argent', emoji: '💰' },
  skillPoints: { label: 'Points de comp.', emoji: '⭐' },
  weapons: { label: 'Armes', emoji: '⚔️' },
  armors: { label: 'Armures', emoji: '🛡️' },
  friends: { label: 'Amis', emoji: '🤝' },
  employees: { label: 'Employés', emoji: '👥' },
};

/**
 * Formate l'affichage d'un modificateur selon son type.
 * Pour 'additive' : affiche directement la valeur avec signe.
 * Pour 'multiplicative' : convertit le ratio en pourcentage (ex : 2 => +200%).
 */
const formatModifierValue = (mod: EventModifier): string => {
  if (mod.type === 'additive') {
    return mod.value > 0 ? `+${mod.value}` : `${mod.value}`;
  } else {
    // Pour un modificateur multiplicatif, on affiche le ratio multiplié par 100
    const percentage = Math.round(mod.value * 100);
    return percentage >= 0 ? `+${percentage}%` : `${percentage}%`;
  }
};

/**
 * Composant affichant la jauge de positivité.
 * La valeur varie de -10 (négatif) à +10 (positif).
 * La jauge se remplit depuis le centre : à droite en jaune pour le positif,
 * et à gauche en noir pour la négatif.
 */
interface PositivityGaugeProps {
  value: number;
}
const PositivityGauge: React.FC<PositivityGaugeProps> = ({ value }) => {
  // Calcul de la largeur de remplissage en pourcentage de la moitié du container (50%)
  const fillPercentage = (Math.abs(value) / 10) * 50;
  const fillStyle: React.CSSProperties = {
    width: `${fillPercentage}%`,
    backgroundColor: value >= 0 ? '#FFD700' : '#333',
    position: 'absolute',
    top: 0,
    bottom: 0,
    ...(value >= 0 ? { right: '50%' } : { left: '50%' }),
  };

  return (
    <div className="positivity-gauge">
      <div className="positivity-fill" style={fillStyle} />
      <span className="positivity-text">{value}</span>
    </div>
  );
};

/**
 * Composant principal affichant un événement appliqué à un dinosaure.
 * Il présente le nom, la description, une jauge de positivité et la liste des modificateurs.
 */
interface EventOverlayProps {
  event: DinosaurEvent;
}
const EventOverlay: React.FC<EventOverlayProps> = ({ event }) => {
  return (
    <div className="event-overlay">
      <div className="event-header">
        <h3 className="event-title">{event.name}</h3>
        <PositivityGauge value={event.positivityScore} />
      </div>
      {event.description && <p className="event-description">{event.description}</p>}
      <div className="event-modifiers">
        <h4>Modificateurs</h4>
        {event.modifiers.length === 0 ? (
          <p>Aucun modificateur</p>
        ) : (
          event.modifiers.map((mod, index) => {
            const targetData = targetMapping[mod.target];
            return (
              <div key={index} className="modifier">
                <span className="modifier-target">
                  {targetData.emoji} {targetData.label}
                </span>
                <span className="modifier-value">{formatModifierValue(mod)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventOverlay;
