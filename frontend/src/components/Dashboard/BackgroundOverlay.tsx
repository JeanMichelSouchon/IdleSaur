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

const EPOCH_BACKGROUND_IMAGES: Record<Epoch, string> = Object.values(Epoch).reduce((acc, epoch) => {
  acc[epoch as Epoch] = `/assets/img/epochs/${epoch}.webp`;
  return acc;
}, {} as Record<Epoch, string>);

interface Particle {
  id: number;
  style: React.CSSProperties & { [key: string]: string | number };
  type: 'food' | 'experience' | 'karma' | 'levelUp';
}

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

  // Gestion des animations d'action (inchangée)
  useEffect(() => {
    if (action) {
      const actionClassName = `action-${action.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      setActionClass(actionClassName);
    }
  }, [action]);

  // Gestion des animations d'événement : utilisation du nouveau système de modificateurs
  useEffect(() => {
    if (lastEvent) {
      setEventClass(`event-animation-${Date.now()}`);
      const newParticles: Particle[] = [];
      let particleId = Date.now();

      // Parcourir les modificateurs pour générer des particules
      lastEvent.modifiers.forEach(mod => {
        if (mod.value !== 0) {
          // Détermine le type de particule en fonction de la cible (target)
          let particleType: Particle['type'] = 'food';
          if (mod.target === 'experience') {
            particleType = 'experience';
          } else if (mod.target === 'karma') {
            particleType = 'karma';
          } else if (mod.target === 'energy' || mod.target === 'food' || mod.target === 'hunger') {
            particleType = 'food';
          }
          // Nombre de particules proportionnel à la valeur absolue
          const numParticles = Math.min(100, Math.ceil(Math.abs(mod.value) / 5));
          for (let i = 0; i < numParticles; i++) {
            const translateX = (Math.random() - 0.5) * 100;
            const translateY = -100 - Math.random() * 300;
            const animationDuration = 2 + Math.random();
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

      // Gestion spécifique de l'effet de karma si un modificateur de karma est présent
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

  // Gestion de l'animation de montée de niveau (inchangée)
  useEffect(() => {
    if (levelUp) {
      const uniqueClass = `level-up-${Date.now()}`;
      setLevelUpClass(uniqueClass);

      // Générer des particules pour l'effet de montée de niveau
      const newParticles: Particle[] = [];
      let particleId = Date.now();
      const numParticles = 150; // Nombre de particules pour l'effet de niveau

      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = 100 + Math.random() * 200;
        const translateX = Math.cos(angle) * speed;
        const translateY = Math.sin(angle) * speed;
        const animationDuration = 2 + Math.random() * 2;
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
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundOverlay;
