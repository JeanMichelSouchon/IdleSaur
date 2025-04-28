import * as React from 'react';
import './ActionCard.css';

export interface ActionDetail {
  name: string;
  description: string;
  canPerform: boolean;
  endpoint: string;
  image: string;
}

interface ActionCardProps {
  action: ActionDetail;
  disabled: boolean;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ action, disabled, onClick }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div
      className="action-card"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="action-card-button">
        <img src={action.image} alt={action.name} className="action-card-icon" />
      </div>
      {showTooltip && (
        <div className="action-card-tooltip">
          <strong className="action-card-tooltip-title">{action.name}</strong>
          <p className="action-card-tooltip-description">{action.description}</p>
        </div>
      )}
    </div>
  );
};

export default ActionCard;
