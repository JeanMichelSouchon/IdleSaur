import React from 'react';
import './EventOverlay.css';
import { DinosaurEvent } from '../../types/DinosaurEvent';

interface EventOverlayProps {
  event: DinosaurEvent;
}

const formatValue = (value: number): string => {
  return value > 0 ? `+${value}` : `${value}`;
};

const EventOverlay: React.FC<EventOverlayProps> = ({ event }) => {
  return (
    <div className="event-overlay">
      <div className="event-header">
        <h3 className="event-title">{event.name}</h3>
        <div className="event-info">
          <span className="event-action">Action: {event.actionType}</span>
          <span className="event-minlevel">Min Level: {event.minLevel}</span>
          <span className="event-weight">Weight: {event.weight}</span>
          <span className="event-positivity">
            Positivity: {event.positivityScore}
          </span>
        </div>
      </div>
      {event.description && <p className="event-description">{event.description}</p>}
      <div className="event-modifiers">
        <h4>Modificateurs</h4>
        {event.modifiers.length === 0 ? (
          <p>Aucun modificateur</p>
        ) : (
          event.modifiers.map((mod, index) => (
            <div key={index} className="modifier">
              <span className="modifier-target">{mod.target}</span> :{' '}
              <span className="modifier-type">{mod.type}</span>{' '}
              <span className="modifier-value">{formatValue(mod.value)}</span>
              <span className="modifier-source">({mod.source})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventOverlay;
