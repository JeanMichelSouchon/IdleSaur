import * as React from 'react';
import './Actions.css';
import api from '../../services/api';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import { DinosaurAction } from '../../types/DinosaurAction';

export interface ActionDetail {
  name: string;
  description: string;
  canPerform: boolean;
  endpoint: string;
  image: string;
}

interface ActionsProps {
  refreshDinosaur: () => void;
  availableActions: ActionDetail[];
  onActionEvent: (event: DinosaurEvent) => void; // Callback pour envoyer les événements
  onActionStart: (action: ActionDetail) => void; // Callback pour indiquer le début d'une action
}

const Actions: React.FC<ActionsProps> = ({ refreshDinosaur, availableActions, onActionEvent, onActionStart }) => {
  const [isActionDisabled, setIsActionDisabled] = React.useState(false);

  /**
   * Fonction pour gérer l'action dynamique
   */
  const handleAction = async (action: ActionDetail) => {
    onActionStart(action); // Indique que l'action commence
    setIsActionDisabled(true); // Désactive les boutons

    try {
      const response = await api.post(action.endpoint); // Appel à l'API pour effectuer l'action
      console.log(response);
      if (response.status === 200) {
        const { event } = response.data;
        onActionEvent(event); // Passe l'événement à onActionEvent
        console.log(event);
        refreshDinosaur(); // Rafraîchir les données du dinosaure après l'action
      } else {
        throw new Error(`Échec de l'action ${action.name}`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur interne du serveur.';
      // Création d'un événement d'erreur conforme à la nouvelle structure
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
      setTimeout(() => setIsActionDisabled(false), 1000); // Réactive les boutons après 1 sec
    }
  };

  return (
    <div className="actions">
      {availableActions
        .filter((action) => action.canPerform)
        .map((action) => (
          <button
            key={action.name}
            onClick={() => handleAction(action)}
            disabled={isActionDisabled} // Applique l'état disabled
          >
            <img src={action.image} alt={action.name} className="action-image" />
            {action.name}
          </button>
        ))}
    </div>
  );
};

export default Actions;
