import React, { useEffect, useState } from 'react';
import { Dinosaur } from '../../types/Dinosaur';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import { ActionDetail } from './Actions';
import './DinoDisplay.css';

interface DinoDisplayProps {
    dinosaur: Dinosaur;
    lastEvent: DinosaurEvent | null;
    action: ActionDetail | null;
    levelUp: boolean;
}

const DinoDisplay: React.FC<DinoDisplayProps> = (props: DinoDisplayProps) => {
    const { dinosaur } = props;
    // Utiliser le nom (en minuscule) du régime et du type pour construire le chemin de l'image
    const dietName = dinosaur?.diet?.name.toLowerCase();
    const typeName = dinosaur?.type?.name.toLowerCase();
    const dinosaurImagePath = dinosaur ? `/assets/dino/dino_${dietName}_${typeName}.svg` : '';

    let animation = '';

    switch (props.action?.name) {
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
            animation = 'wonder';
            break;
        case 'Découvrir':
            animation = 'wonder';
            break;
        case 'Voler':
            animation = 'wonder';
            break;
        default:
            break;
    }

    if (dinosaur.is_sleeping && !dinosaur.is_dead) {
        animation = 'sleep';
    }

    // Gestion de l'animation de montée de niveau
    const [levelUpClass, setLevelUpClass] = useState<string>('');
    useEffect(() => {
        if (props.levelUp) {
            const uniqueClass = `level-up-${Date.now()}`;
            setLevelUpClass(uniqueClass);

            const timer = setTimeout(() => {
                setLevelUpClass('');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [props.levelUp]);

    const className = `dino-svg ${dinosaur.is_dead ? 'dino-dead' : 'dino-alive'} ${animation} ${levelUpClass}`;

    return (
        <img
            src={dinosaurImagePath}
            alt={`Dinosaure ${dinosaur.name}`}
            className={className}
        />
    );
};

export default DinoDisplay;
