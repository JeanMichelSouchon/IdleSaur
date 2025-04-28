import React, { useEffect, useState } from 'react';
import './RankingOverlay.css';
import { fetchRanking } from '../../../services/rankingService';
import { User } from '../../../types/User';

interface RankingOverlayProps {
  onClose: () => void;
  active?: boolean;
}

/**
 * Définit les différentes catégories d'onglet pour le classement.
 * Par exemple : 'SoulPoints', 'Experience', 'Karma', etc.
 */
type RankingTab = 'soulPoints' | 'experience' | 'karma' | 'lifetime';

/**
 * Composant affichant un overlay pour les Classements (Leaderboard).
 * Il propose un système d'onglets permettant de trier les joueurs
 * en fonction de différents critères (Soul Points, Expérience, Karma, etc.).
 */
const RankingOverlay: React.FC<RankingOverlayProps> = ({ onClose, active = false }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<RankingTab>('soulPoints');

  useEffect(() => {
    if (active) {
      // Lorsque l'overlay s'active, on récupère la liste des utilisateurs.
      fetchRankingData();
    }
  }, [active]);

  /**
   * Récupère la liste des utilisateurs depuis le backend,
   * puis met à jour le state local.
   */
  const fetchRankingData = async () => {
    try {
      setLoading(true);
      const data = await fetchRanking();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du classement :', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fonction de tri selon l'onglet actif.
   * On renvoie un nouveau tableau trié.
   */
  const getSortedUsers = (): User[] => {
    if (!users || users.length === 0) return [];

    // Copie pour éviter de muter le state original
    const sortedUsers = [...users];

    switch (activeTab) {
      case 'soulPoints':
        // Classement par totalSoulPoints (desc)
        sortedUsers.sort((a, b) => {
          const scoreA = a.player_score?.totalSoulPoints || 0;
          const scoreB = b.player_score?.totalSoulPoints || 0;
          return scoreB - scoreA;
        });
        break;

      case 'experience':
        // Classement par totalExperience (desc)
        sortedUsers.sort((a, b) => {
          const scoreA = a.player_score?.totalExperience || 0;
          const scoreB = b.player_score?.totalExperience || 0;
          return scoreB - scoreA;
        });
        break;

      case 'karma':
        // Classement par latestKarma (desc) – ou totalKarma, à adapter
        sortedUsers.sort((a, b) => {
          const scoreA = a.player_score?.latestKarma || 0;
          const scoreB = b.player_score?.latestKarma || 0;
          return scoreB - scoreA;
        });
        break;

      case 'lifetime':
        // Classement par totalLifetime (desc)
        sortedUsers.sort((a, b) => {
          const scoreA = a.player_score?.totalLifetime || 0;
          const scoreB = b.player_score?.totalLifetime || 0;
          return scoreB - scoreA;
        });
        break;

      default:
        // Par défaut, on ne trie pas.
        break;
    }

    return sortedUsers;
  };

  if (!active) return null;

  const sortedUsers = getSortedUsers();

  return (
    <div className="overlay active">
      <div className="overlay-content ranking-overlay-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h2>Classements</h2>

        {/* Barre d'onglets */}
        <div className="ranking-tabs">
          <button
            className={`ranking-tab ${activeTab === 'soulPoints' ? 'active' : ''}`}
            onClick={() => setActiveTab('soulPoints')}
          >
            Soul Points
          </button>
          <button
            className={`ranking-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Expérience
          </button>
          <button
            className={`ranking-tab ${activeTab === 'karma' ? 'active' : ''}`}
            onClick={() => setActiveTab('karma')}
          >
            Karma
          </button>
          <button
            className={`ranking-tab ${activeTab === 'lifetime' ? 'active' : ''}`}
            onClick={() => setActiveTab('lifetime')}
          >
            Lifetime
          </button>
        </div>

        {/* Affichage du contenu selon l’onglet */}
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <table className="ranking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Utilisateur</th>
                {activeTab === 'soulPoints' && <th>Soul Points</th>}
                {activeTab === 'experience' && <th>Expérience Totale</th>}
                {activeTab === 'karma' && <th>Karma Actuel</th>}
                {activeTab === 'lifetime' && <th>Durée de vie Totale</th>}
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((userItem, index) => {
                const rank = index + 1;
                const score = userItem.player_score;
                return (
                  <tr key={userItem.id}>
                    <td>{rank}</td>
                    <td>{userItem.username}</td>

                    {activeTab === 'soulPoints' && (
                      <td>{score?.totalSoulPoints ?? 0}</td>
                    )}
                    {activeTab === 'experience' && (
                      <td>{score?.totalExperience ?? 0}</td>
                    )}
                    {activeTab === 'karma' && (
                      <td>{score?.latestKarma ?? 0}</td>
                    )}
                    {activeTab === 'lifetime' && (
                      <td>{score?.totalLifetime ?? 0}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RankingOverlay;
