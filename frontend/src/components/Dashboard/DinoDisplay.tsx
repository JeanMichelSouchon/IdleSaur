// src/components/Dashboard/DinoDisplay.tsx
import React, { useEffect, useState } from 'react';
import { Dinosaur } from '../../types/Dinosaur';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import { ActionDetail } from './Actions';
import './DinoDisplay.css';
import { GameplayService } from '../../services/gameplay.service';

/**
 * Composant DinoDisplay
 * 
 * Affiche le dinosaure avec ses animations et la roue d'actions.
 * 
 * Modifications apportées :
 * - Suppression de la génération et de l'affichage des notifications emoji.
 * - Mise à jour du switch de gestion des animations pour intégrer les nouveaux cas :
 *    • Prier         => animation 'pray'
 *    • Garde du corps et Garde d'enfants => animation 'wonder'
 *    • Plonger       => animation 'dive'
 *    • Voler         => pour les dinos de type "Air", animation 'fly', sinon 'wonder'
 *    • Creuser       => animation 'dig'
 */
interface DinoDisplayProps {
  dinosaur: Dinosaur;
  lastEvent: DinosaurEvent | null;
  action: ActionDetail | null;
  levelUp: boolean;
}

const DinoDisplay: React.FC<DinoDisplayProps> = ({ dinosaur, lastEvent, action, levelUp }) => {
  // Construit le chemin de l'image en fonction du régime et du type du dinosaure
  const dietName = dinosaur?.diet?.name.toLowerCase();
  const typeName = dinosaur?.type?.name.toLowerCase();
  const dinosaurImagePath = dinosaur ? `/assets/dino/dino_${dietName}_${typeName}.svg` : '';

  // Détermine l'animation d'action en fonction du nom de l'action reçue
  let animation = '';
  switch (action?.name) {
    case 'Se Réveiller':
      animation = '';
      break;
    case 'Manger':
      animation = 'baisser';
      break;
    case 'Dormir':
      animation = 'sleep';
      break;
    case 'Cueillir':
      animation = 'baisser';
      break;
    case 'Chasser':
    case 'Découvrir':
    case 'Garde du corps': // Nouvelle action : Bodyguard
    case "Garde d'enfants":  // Nouvelle action : Babysitter
      animation = 'wonder';
      break;
    case 'Voler':
      // Pour les dinos de type Air, on utilise l'animation 'fly'
      if (dinosaur.type.name.toLowerCase() === 'air') {
        animation = 'fly';
      } else {
        animation = 'wonder';
      }
      break;
    case 'Prier': // Nouvelle action : Pray
      animation = 'pray';
      break;
    case 'Plonger': // Nouvelle action : Dive
      animation = 'dive';
      break;
    case 'Creuser': // Nouvelle action : Dig
      animation = 'dig';
      break;
    default:
      break;
  }
  if (dinosaur.is_sleeping && !dinosaur.is_dead) {
    animation = 'sleep';
  }

  // Animation de montée de niveau (logique existante)
  const [levelUpClass, setLevelUpClass] = useState<string>('');
  useEffect(() => {
    if (levelUp) {
      const uniqueClass = `level-up-${Date.now()}`;
      setLevelUpClass(uniqueClass);
      const timer = setTimeout(() => {
        setLevelUpClass('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [levelUp]);

  // Gestion de l'animation de Karma : si l'event contient un modificateur de karma,
  // on applique une animation de pulsation sur l'image du dinosaure.
  const [karmaAnimationClass, setKarmaAnimationClass] = useState<string>('');
  useEffect(() => {
    if (lastEvent) {
      const hasKarma = lastEvent.modifiers.some(mod => mod.target === 'karma');
      if (hasKarma) {
        setKarmaAnimationClass('karma-animation');
        const timer = setTimeout(() => {
          setKarmaAnimationClass('');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [lastEvent]);

  // Combine les classes CSS pour l'image du dinosaure
  const className = `dino-svg ${dinosaur.is_dead ? 'dino-dead' : 'dino-alive'} ${animation} ${levelUpClass} ${karmaAnimationClass}`;

  // La roue d'action ne doit s'afficher que si le dinosaure n'est ni endormi ni mort
  const [showActionWheel, setShowActionWheel] = useState<boolean>(false);
  const gameplayService = new GameplayService();

  const handleMouseEnter = () => {
    if (!dinosaur.is_sleeping && !dinosaur.is_dead) {
      setShowActionWheel(true);
    }
  };

  return (
    <div 
      className="dino-display-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowActionWheel(false)}
    >
      <img
        src={dinosaurImagePath}
        alt={`Dinosaure ${dinosaur.name}`}
        className={className}
      />
    </div>
  );
};

export default DinoDisplay;
