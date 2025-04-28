import React, { useState } from 'react';
import './Gauge_XP.css';
import { useOverlay } from '../../../contexts/OverlayContext';
import { ClickableStatTarget } from '../../../types/ClickableStatTarget';

interface GaugeXPProps {
  label: string;
  current: number;
  max: number;
  color?: string;
  calculationBreakdown?: string;
}

/**
 * Composant Gauge_XP avec affichage du tooltip personnalisé au clic.
 * Le tooltip affiche uniquement la chaîne de calcul détaillée (calculationBreakdown).
 */
const Gauge_XP: React.FC<GaugeXPProps> = ({ label, current, max, color = '#4CAF50', calculationBreakdown }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { openStatDetail } = useOverlay();
  const percentage = Math.min((current / max) * 100, 100);

  const toggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  return (
    <div className="gaugexp">
      <span className="gauge-xplabel">{label}</span>
      <div className="gauge-xpbar" onClick={() => openStatDetail(ClickableStatTarget.EXPERIENCE_GAUGE)}>
        <div
          className="gauge-xpfill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="gauge-xptext" onClick={() => openStatDetail(ClickableStatTarget.EXPERIENCE_GAUGE_TEXT)}>
        {current} / {max}
      </span>
      {showTooltip && calculationBreakdown && (
        <div className="tooltip-xpdetail">
          {calculationBreakdown}
        </div>
      )}
    </div>
  );
};

export default Gauge_XP;
