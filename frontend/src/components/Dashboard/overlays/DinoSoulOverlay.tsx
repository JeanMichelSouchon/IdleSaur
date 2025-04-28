import React from 'react';
import './DinoSoulOverlay.css';
import { Dinosaur } from '../../../types/Dinosaur';

/**
 * Composant affichant en overlay plein écran les statistiques des vies passées du dinosaure.
 * Il ne rend rien si "active" n'est pas vrai, pour rester homogène aux autres overlays.
 */
const DinoSoulOverlay: React.FC<{ dinosaur: Dinosaur; onClose: () => void; active?: boolean; }> = ({ dinosaur, onClose, active = false }) => {
  if (!active) return null;

  // Calcul des totaux issus de l'historique des vies
  const totalNeutral = dinosaur.lives.reduce((sum, life) => sum + life.soul_points, 0);
  const totalDark = dinosaur.lives.reduce((sum, life) => sum + life.dark_soul_points, 0);
  const totalBright = dinosaur.lives.reduce((sum, life) => sum + life.bright_soul_points, 0);

  const livesCount = dinosaur.lives.length;
  const lastLife = livesCount > 0 ? dinosaur.lives[livesCount - 1] : null;

  // Pour l'affichage des soul skills du dinosaure dans une grille d'emoji
  const getEmojiForSoulType = (type: string): string => {
    if (type === 'neutral') return '⚖️';
    if (type === 'bright') return '🌟';
    if (type === 'dark') return '🌑';
    return '❓';
  };

  return (
    <div className="overlay active">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Afterlife Stats</h2>

        <div className="stat-row">
          <span className="stat-label">Vies enregistrées:</span>
          <span className="stat-value">{livesCount}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Points Neutres:</span>
          <span className="stat-value">{totalNeutral}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Points Dark:</span>
          <span className="stat-value">{totalDark}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Points Bright:</span>
          <span className="stat-value">{totalBright}</span>
        </div>

        {lastLife && (
          <>
            <div className="stat-row">
              <span className="stat-label">Dernière Vie - Niveau:</span>
              <span className="stat-value">{lastLife.level}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dernière Vie - Exp:</span>
              <span className="stat-value">{lastLife.experience}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dernière Vie - Karma:</span>
              <span className="stat-value">{lastLife.karma}</span>
            </div>
          </>
        )}

        {/* Section Soul Skills affichée discrètement */}
        {dinosaur.soulSkills && dinosaur.soulSkills.length > 0 && (
          <div className="soul-skills-section">
            <h3>Soul Skills</h3>
            <div className="soul-skills-grid">
              {dinosaur.soulSkills.map(skill => (
                <div key={skill.id} className="soul-skill-card">
                  <span className="soul-skill-emoji">{getEmojiForSoulType(skill.soulType)}</span>
                  <span className="soul-skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinoSoulOverlay;
