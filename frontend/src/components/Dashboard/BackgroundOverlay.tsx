import React, { useEffect, useState } from 'react';
import { Dinosaur } from '../../types/Dinosaur';
import { Epoch } from '../../types/Epoch';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import { ActionDetail } from './Actions';
import './BackgroundOverlay.css';

interface BackgroundOverlayProps {
  dinosaur: Dinosaur;
  lastEvent: DinosaurEvent | null;
  action: ActionDetail | null;
  levelUp: boolean;
}

// Construction du mapping entre les epochs et l'image de fond correspondante
const EPOCH_BACKGROUND_IMAGES: Record<Epoch, string> = Object.values(Epoch).reduce((acc, epoch) => {
  acc[epoch as Epoch] = `/assets/img/epochs/${epoch}.webp`;
  return acc;
}, {} as Record<Epoch, string>);

/**
 * Mapping des types de particules vers l'emoji correspondant.
 * Seuls les modificateurs suivants auront un emoji : food, money, skillPoints, weapons, armors, friends, employees.
 * Le modificateur levelUp reste inchangé.
 */
const particleEmojiMapping: Record<Particle['type'], string> = {
  food: '🍎',
  money: '💰',
  skillPoints: '⭐',
  weapons: '⚔️',
  armors: '🛡️',
  friends: '🤝',
  employees: '👥',
  levelUp: '🎉',
};

interface Particle {
  id: number;
  style: React.CSSProperties & { [key: string]: string | number };
  type: 'food' | 'money' | 'skillPoints' | 'weapons' | 'armors' | 'friends' | 'employees' | 'levelUp';
}

/**
 * Composant BackgroundOverlay
 * Gère l'affichage de l'image de fond en fonction de l'époque,
 * applique les animations liées aux actions, événements et montée de niveau,
 * et génère des notifications sous forme d'emoji pour certains modificateurs.
 */
const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({ dinosaur, lastEvent, action, levelUp }) => {
  const [actionClass, setActionClass] = useState<string>('');
  const [eventClass, setEventClass] = useState<string>('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [karmaEffectClass, setKarmaEffectClass] = useState<string>('');
  const [levelUpClass, setLevelUpClass] = useState<string>('');

  let imageUrl = EPOCH_BACKGROUND_IMAGES[dinosaur.epoch] || EPOCH_BACKGROUND_IMAGES[Epoch.Ancient_Epoch1];
  if (dinosaur.is_dead) {
    imageUrl = `/assets/img/epochs/graveyard.webp`;
  }
  const sleepingClass = dinosaur.is_sleeping ? 'sleeping' : '';

  // Gestion de l'animation d'action (inchangée)
  useEffect(() => {
    if (action) {
      const actionClassName = `action-${action.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      setActionClass(actionClassName);
    }
  }, [action]);

  // Gestion des animations d'événement : création des particules en fonction des modificateurs
  useEffect(() => {
    if (lastEvent) {
      setEventClass(`event-animation-${Date.now()}`);
      const newParticles: Particle[] = [];
      let particleId = Date.now();

      // Seuls les modificateurs ayant des emojis associés
      const allowedTargets = ['food', 'money', 'skillPoints', 'weapons', 'armors', 'friends', 'employees'];
      
      lastEvent.modifiers.forEach(mod => {
        if (mod.value !== 0 && allowedTargets.includes(mod.target)) {
          const particleType = mod.target as Particle['type'];
          // Nombre de particules limité et proportionnel à la valeur absolue
          const numParticles = Math.min(20, Math.ceil(Math.abs(mod.value) / 10));
          for (let i = 0; i < numParticles; i++) {
            // Réduction de l'amplitude du déplacement pour une animation plus subtile
            const translateX = (Math.random() - 0.5) * 50;
            const translateY = -50 - Math.random() * 100;
            // Animation plus lente : durée entre 4 et 6 secondes
            const animationDuration = 4 + Math.random() * 2;
            newParticles.push({
              id: particleId++,
              type: particleType,
              style: {
                left: `${Math.random() * 100}%`,
                bottom: '0%',
                '--translateX': `${translateX}px`,
                '--translateY': `${translateY}px`,
                '--animationDuration': `${animationDuration}s`,
              },
            });
          }
        }
      });
      setParticles(newParticles);

      // Effet spécifique pour le karma (aucun emoji généré, juste l'effet visuel)
      const karmaMod = lastEvent.modifiers.find(mod => mod.target === 'karma' && mod.value !== 0);
      if (karmaMod) {
        const uniqueClass = karmaMod.value > 0 ? `karma-brighten-${Date.now()}` : `karma-darken-${Date.now()}`;
        setKarmaEffectClass(uniqueClass);
      }

      const timer = setTimeout(() => {
        setEventClass('');
        setActionClass('');
        setKarmaEffectClass('');
        setParticles([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastEvent]);

  // Gestion de l'animation de montée de niveau
  useEffect(() => {
    if (levelUp) {
      const uniqueClass = `level-up-${Date.now()}`;
      setLevelUpClass(uniqueClass);
      const newParticles: Particle[] = [];
      let particleId = Date.now();
      const numParticles = 50; // Nombre de particules pour le niveau
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = 100 + Math.random() * 200;
        const translateX = Math.cos(angle) * speed;
        const translateY = Math.sin(angle) * speed;
        // Animation plus lente pour l'effet de montée de niveau : durée entre 3 et 5 secondes
        const animationDuration = 3 + Math.random() * 2;
        newParticles.push({
          id: particleId++,
          type: 'levelUp',
          style: {
            left: '50%',
            top: '50%',
            '--translateX': `${translateX}px`,
            '--translateY': `${translateY}px`,
            '--animationDuration': `${animationDuration}s`,
          },
        });
      }
      setParticles(prev => [...prev, ...newParticles]);
      const timer = setTimeout(() => {
        setLevelUpClass('');
        setParticles([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [levelUp]);

  const classes = [
    'background-overlay',
    sleepingClass,
    actionClass,
    eventClass,
    karmaEffectClass,
    levelUpClass,
  ]
    .filter(Boolean)
    .join(' ');

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div className={classes} style={overlayStyle}>
      <img src={imageUrl} alt="Background" style={imgStyle} />
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle particle-${particle.type}`}
            style={particle.style}
          >
            {particleEmojiMapping[particle.type]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundOverlay;
