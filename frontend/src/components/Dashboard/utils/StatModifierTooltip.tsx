import React from 'react';
import './StatModifierTooltip.css';
import { StatModifier } from '../../../types/stats-modifiers.types';

interface StatModifierTooltipProps {
    statName: string;
    modifiers: StatModifier[];
}

const StatModifierTooltip: React.FC<StatModifierTooltipProps> = ({ statName, modifiers }) => {
    return (
        <div className="stat-modifier-tooltip">
            <h4>Détails pour {statName}</h4>
            {modifiers.length === 0 ? (
                <p className="no-modifiers">Aucun modifier appliqué.</p>
            ) : (
                <ul>
                    {modifiers.map((mod, index) => (
                        <li key={index}>
                            <span className="modifier-source">{mod.source}</span>
                            <span className="separator">-</span>
                            <span className="modifier-type">{mod.type}</span>
                            <span className="separator">:</span>
                            <span className="modifier-value">{mod.value}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StatModifierTooltip;
