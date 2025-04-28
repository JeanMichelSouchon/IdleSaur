import React from 'react';
import './Gauge_XP.css';

interface GaugeProps {
    label: string;
    current: number;
    max: number;
    tooltipText?: string; // Ajout de texte pour le tooltip
    color?: string; // Couleur optionnelle
}

const Gauge: React.FC<GaugeProps> = ({ label, current, max, tooltipText = '', color = '#4CAF50' }) => {
    const percentage = Math.min((current / max) * 100, 100);

    return (
        <div className="gaugexp tooltipxp">
            <span className="gauge-xplabel">{label}</span>
            <div className="gauge-xpbar">
                <div
                    className="gauge-xpfill"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                ></div>
            </div>
            <span className="gauge-xptext">{current} / {max}</span>
            {tooltipText && <span className="tooltip-xptext">{tooltipText}</span>}
        </div>
    );
};

export default Gauge;
