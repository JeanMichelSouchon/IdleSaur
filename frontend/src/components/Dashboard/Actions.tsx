import * as React from 'react';
import './Actions.css';
import api from '../../services/api';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import { DinosaurAction } from '../../types/DinosaurAction';
import { Dinosaur } from '../../types/Dinosaur';
import LuckGauge from './utils/LuckGauge';
import ActionCard from './utils/ActionCard';

export interface ActionDetail {
  name: string;
  description: string;
  canPerform: boolean;
  endpoint: string;
  image: string;
}

interface ActionsProps {
  dinosaur: Dinosaur;
  refreshDinosaur: () => void;
  availableActions: ActionDetail[];
  onActionEvent: (event: DinosaurEvent) => void; // Callback pour envoyer les événements
  onActionStart: (action: ActionDetail) => void;   // Callback pour indiquer le début d'une action
}

const Actions: React.FC<ActionsProps> = ({
  dinosaur,
  refreshDinosaur,
  availableActions,
  onActionEvent,
  onActionStart
}) => {
  const [isActionDisabled, setIsActionDisabled] = React.useState(false);

  const handleAction = async (action: ActionDetail) => {
    onActionStart(action);
    setIsActionDisabled(true);
    try {
      const response = await api.post(action.endpoint);
      console.log(response);
      if (response.status === 200) {
        const { event } = response.data;
        onActionEvent(event);
        console.log(event);
        refreshDinosaur();
      } else {
        throw new Error(`Échec de l'action ${action.name}`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur interne du serveur.';
      onActionEvent({
        id: 0,
        name: `Erreur lors de l'action ${action.name}`,
        description: errorMessage,
        actionType: DinosaurAction.Error,
        minLevel: 0,
        weight: 0,
        positivityScore: 0,
        modifiers: []
      });
    } finally {
      setTimeout(() => setIsActionDisabled(false), 3000);
    }
  };

  return (
    <div className="actions">
      {/* En-tête avec la jauge de chance */}
      <div className="actions-header">
        <h2>Actions</h2>
        <LuckGauge dinosaur={dinosaur} />
      </div>
      {/* Grille des actions sous forme de cartes */}
      <div className="actions-cards">
        {availableActions.filter(action => action.canPerform).map(action => (
          <ActionCard
            key={action.name}
            action={action}
            disabled={isActionDisabled}
            onClick={() => handleAction(action)}
          />
        ))}
      </div>
    </div>
  );
};

export default Actions;
