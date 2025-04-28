import React from 'react';
import { Dinosaur } from '../../types/Dinosaur';
import './DinosaurInfo.css';
import Gauge from './utils/Gauge';

/**
 * Calcule l'âge du dinosaure en fonction de sa dernière renaissance.
 * @param lastReborn Date de la dernière renaissance.
 * @returns Chaîne indiquant l'âge.
 */
export function calculateDinosaurAge(lastReborn: string): string {
    const lastRebornDate = new Date(lastReborn);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - lastRebornDate.getTime();

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((diffInMilliseconds / 1000) % 60);

    return `${days} jours, ${hours} heures, ${minutes} min, ${seconds} sec`;
}

const DinosaurInfo: React.FC<{ dinosaur: Dinosaur }> = ({ dinosaur }) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="dinosaur-info">
            <h3>Dinosaure : {dinosaur.name}</h3>
            <p>
                <strong>Régime alimentaire</strong> : {capitalizeFirstLetter(dinosaur.diet.name)}
            </p>
            <p>
                <strong>Type</strong> : {capitalizeFirstLetter(dinosaur.type.name)}
            </p>

            {/* Utilisation de Gauge avec les tooltips pour Énergie, Nourriture et Faim */}
            <Gauge
                label="Énergie"
                current={dinosaur.energy}
                max={dinosaur.final_max_energy}
                color="#4CAF50"
                tooltipText={`Récupération : ${dinosaur.final_energy_recovery}/s, Décroissance : ${dinosaur.final_energy_decay}/s`}
            />
            <Gauge
                label="Nourriture"
                current={dinosaur.food}
                max={dinosaur.final_max_food}
                color="#FF9800"
                tooltipText={`Multiplicateurs nourriture : Global ${dinosaur.final_earn_food_global_multiplier}x, Herbi ${dinosaur.final_earn_food_herbi_multiplier}x, Carni ${dinosaur.final_earn_food_carni_multiplier}x`}
            />
            <Gauge
                label="Faim"
                current={dinosaur.hunger}
                max={dinosaur.final_max_hunger}
                color="#F44336"
                tooltipText={`Augmentation de la faim : ${dinosaur.final_hunger_increase}/s`}
            />

            <p>
                <strong>Âge</strong> : {calculateDinosaurAge(dinosaur.last_reborn)}
            </p>
            <p>
                <strong>Époque</strong> : {dinosaur.epoch}
            </p>
            <p>
                <strong>Nombre de renaissances</strong> : {dinosaur.reborn_amount}
            </p>
            <p>
                <strong>Karma</strong> : {dinosaur.karma}
            </p>
            <p>
                <strong>Argent</strong> : {dinosaur.money} €
            </p>
            <p>
                <strong>Points de compétences</strong> : {dinosaur.skill_points}
            </p>
            <p className="notDisplayed">
                <strong>Créé le </strong>: {new Date(dinosaur.created_at).toLocaleDateString()}
            </p>
            <p className="notDisplayed">
                <strong>Dernière mise à jour</strong> : {new Date(dinosaur.last_update_by_time_service).toLocaleDateString()}
            </p>
            <p>
                <strong>En Sommeil</strong> : {dinosaur.is_sleeping ? 'Oui' : 'Non'}
            </p>
            <p>
                <strong>Mort</strong> : {dinosaur.is_dead ? 'Oui' : 'Non'}
            </p>
        </div>
    );
};

export default DinosaurInfo;
