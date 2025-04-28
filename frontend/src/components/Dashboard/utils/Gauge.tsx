import React, { useState } from 'react';
import './Gauge.css';
import StatModifierTooltip from './StatModifierTooltip';
import { StatModifier } from '../../../types/stats-modifiers.types';

interface GaugeProps {
    label: string;
    current: number;
    max: number;
    tooltipText?: string;
    color?: string;
    statModifiers?: StatModifier[];
}

const Gauge: React.FC<GaugeProps> = ({ label, current, max, tooltipText = '', color = '#4CAF50', statModifiers }) => {
    const [showDetail, setShowDetail] = useState(false);
    const percentage = Math.min((current / max) * 100, 100);

    return (
        <div 
            className="gauge tooltip" 
            onMouseEnter={() => setShowDetail(true)} 
            onMouseLeave={() => setShowDetail(false)}
        >
            <span className="gauge-label">{label}</span>
            <div className="gauge-bar">
                <div
                    className="gauge-fill"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                ></div>
            </div>
            <span className="gauge-text">{current} / {max}</span>
            {tooltipText && <span className="tooltip-text">{tooltipText}</span>}
            {statModifiers && statModifiers.length > 0 && (
                <div className={`tooltip-detail ${showDetail ? 'show' : ''}`}>
                    <StatModifierTooltip statName={label} modifiers={statModifiers} />
                </div>
            )}
        </div>
    );
};

export default Gauge;
