import React from 'react';
import { Dinosaur } from '../../types/Dinosaur';
import './DinosaurInfo.css';
import KarmaGauge from './utils/KarmaGauge';
import EnergyGauge from './utils/EnergyGauge';
import FoodGauge from './utils/FoodGauge';
import HungerGauge from './utils/HungerGauge';
import AgeEpochDisplay from './utils/AgeEpochDisplay';

/**
 * Calcule l'âge du dinosaure en fonction de sa dernière renaissance.
 * @param lastReborn Date de la dernière renaissance.
 * @returns Chaîne indiquant l'âge.
 */
export function calculateDinosaurAge(lastReborn: Date): string {
  const lastRebornDate = new Date(lastReborn);
  const now = new Date();
  const diff = now.getTime() - lastRebornDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days} jours, ${hours} heures, ${minutes} min, ${seconds} sec`;
}

const DinosaurInfo: React.FC<{ dinosaur: Dinosaur }> = ({ dinosaur }) => {
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="dinosaur-info">
      <h2>{dinosaur.name}</h2>
      <div className="dino-basic-info">
        <AgeEpochDisplay dinosaur={dinosaur} />
      </div>
      <div className="dino-gauges">
        <EnergyGauge dinosaur={dinosaur} />
        <FoodGauge dinosaur={dinosaur} />
        <HungerGauge dinosaur={dinosaur} />
        <KarmaGauge dinosaur={dinosaur} />

      </div>
    </div>
  );
};

export default DinosaurInfo;
