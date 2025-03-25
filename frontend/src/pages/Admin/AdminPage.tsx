import React, { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import './AdminPage.css';
import api from '../../services/api';
import { User } from '../../types/User';
import { Dinosaur } from '../../types/Dinosaur';

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDinosaur, setSelectedDinosaur] = useState<Dinosaur | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [levelsXp, setLevelsXp] = useState<{ level: number, xpRequired: number }[]>([]);
  const [epochThresholds, setEpochThresholds] = useState<{ epoch: string, threshold: number }[]>([]);

  // Récupère la liste des utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data as User[]);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des utilisateurs.', error);
      alert('Erreur lors de la récupération des utilisateurs.');
    }
  };

  // Récupère les niveaux et leurs XP requis
  const fetchLevelsXp = async () => {
    try {
      const response = await api.get('/admin/levels-xp-table');
      setLevelsXp(response.data);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des niveaux.', error);
      alert('Erreur lors de la récupération des niveaux.');
    }
  };

  // Récupère les seuils des époques
  const fetchEpochThresholds = async () => {
    try {
      const response = await api.get('/dinosaurs/epochs/thresholds');
      setEpochThresholds(response.data.thresholds);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des seuils des époques.', error);
      alert('Erreur lors de la récupération des seuils des époques.');
    }
  };

  const deleteUser = async (userId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      alert('Utilisateur supprimé avec succès');
      fetchUsers();
    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      alert(`Erreur lors de la suppression de l'utilisateur: ${error.response?.data?.message || 'Erreur interne.'}`);
    }
  };

  const viewDinosaur = async (userId: number) => {
    try {
      const response = await api.get('/admin/dinosaurs');
      const dinosaurs: Dinosaur[] = response.data;
      const dinosaur = dinosaurs.find((dino: any) => dino.user_id === userId);
      if (dinosaur) {
        setSelectedDinosaur(dinosaur);
        setIsModalOpen(true);
      } else {
        alert('Aucun dinosaure trouvé pour cet utilisateur.');
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des dinosaures.', error);
      alert('Erreur lors de la récupération des dinosaures.');
    }
  };

  // Fonction pour déclencher le téléchargement de l'export des utilisateurs
  const downloadUsersExport = async () => {
    try {
      const response = await api.get('/admin/users/export/last-weeks/2', {
        responseType: 'blob'
      });
      // Créer un blob à partir des données reçues
      const blob = new Blob([response.data], { type: 'application/json' });
      // Générer une URL pour ce blob
      const url = window.URL.createObjectURL(blob);
      // Créer un élément <a> pour déclencher le téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users-last-2-weeks.json';
      document.body.appendChild(a);
      a.click();
      // Nettoyer : retirer l'élément et révoquer l'URL
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Erreur lors du téléchargement de l\'export des utilisateurs:', error);
      alert('Erreur lors du téléchargement de l\'export des utilisateurs.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLevelsXp();
    fetchEpochThresholds();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDinosaur(null);
  };

  return (
    <>
      <div className="Main">
        <Header />
        <div className="admin-page">
          <header>
            <h1>Gestion des utilisateurs</h1>
            <a href="/" className="back-btn">Retour à l'accueil</a>
            {/* Bouton pour déclencher le téléchargement de l'export */}
            <button className="export-btn" onClick={downloadUsersExport}>
              Télécharger Export Utilisateurs
            </button>
          </header>

          <section id="user-management">
            <table id="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom d'utilisateur</th>
                  <th>Email</th>
                  <th>Date de création</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn delete" onClick={() => deleteUser(user.id)}>Supprimer</button>
                      <button className="action-btn update" onClick={() => alert(`Fonction de mise à jour de l'utilisateur avec ID ${user.id} non encore implémentée.`)}>Modifier</button>
                      <button className="action-btn view-dino" onClick={() => viewDinosaur(user.id)}>Voir Dinosaure</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="level-xp-table">
            <h2>Table des niveaux et paliers d'expérience</h2>
            <table>
              <thead>
                <tr>
                  <th>Niveau</th>
                  <th>XP Requis</th>
                </tr>
              </thead>
              <tbody>
                {levelsXp.map(({ level, xpRequired }) => (
                  <tr key={level}>
                    <td>{level}</td>
                    <td>{xpRequired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="epoch-threshold-table">
            <h2>Table des époques et leurs seuils</h2>
            <table>
              <thead>
                <tr>
                  <th>Époque</th>
                  <th>Durée de l'Époque (secondes)</th>
                  <th>Seuil cumulé (secondes)</th>
                </tr>
              </thead>
              <tbody>
                {epochThresholds.map(({ epoch, threshold }, index) => {
                  const previousThreshold = index > 0 ? epochThresholds[index - 1].threshold : 0;
                  const duration = threshold != null && previousThreshold != null ? threshold - previousThreshold : null;
                  return (
                    <tr key={epoch}>
                      <td>{epoch}</td>
                      <td>{duration !== null ? duration.toFixed(2) : 'Non défini'}</td>
                      <td>{threshold !== null ? threshold.toFixed(2) : 'Non défini'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {isModalOpen && selectedDinosaur && (
            <div className="modal" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Détails du Dinosaure</h2>
                <p><strong>ID:</strong> {selectedDinosaur.id}</p>
                <p><strong>Nom:</strong> {selectedDinosaur.name}</p>
                <p><strong>Régime Alimentaire:</strong> {capitalizeFirstLetter(selectedDinosaur.diet.name)}</p>
                <p><strong>Énergie:</strong> {selectedDinosaur.energy}</p>
                <p><strong>Nourriture:</strong> {selectedDinosaur.food}</p>
                <p><strong>Expérience:</strong> {selectedDinosaur.experience}</p>
                <p><strong>Époque:</strong> {capitalizeFirstLetter(selectedDinosaur.epoch)}</p>
                <p><strong>Date de création:</strong> {new Date(selectedDinosaur.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default AdminPage;
