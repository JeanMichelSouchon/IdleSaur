-- init.sql
-- =============================================================================
-- Script d'initialisation de la base de données pour le module dinosaures
-- =============================================================================
CREATE DATABASE IF NOT EXISTS `iddlesaur`;
USE iddlesaur;

-- Création de la table `user`
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  -- Nouveaux attributs pour la gestion des points persistants entre vies
  neutral_soul_points INT NOT NULL DEFAULT 0,
  dark_soul_points INT NOT NULL DEFAULT 0,
  bright_soul_points INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Nouvelle colonne pour stocker le score global du joueur
  player_score JSON NOT NULL DEFAULT (
    JSON_OBJECT(
      'totalSoulPoints', 0,
      'totalDarkSoulPoints', 0,
      'totalBrightSoulPoints', 0,
      'totalLives', 0,
      'totalKarma', 0,
      'latestKarma', 0,
      'maxKarma', 0,
      'minKarma', 0,
      'averageKarma', 0,
      'negativeLivesCount', 0,
      'positiveLivesCount', 0,
      'totalLifetime', 0,
      'maxLifetime', 0,
      'totalLevels', 0,
      'maxLevel', 0,
      'totalExperience', 0,
      'maxExperience', 0
    )
  )
);

-- ---------------------------------------------------------
-- Table des types de dinosaures
-- Chaque type possède un ensemble de modificateurs génériques stockés en JSON,
-- qui s'appliquent aux caractéristiques de base.
-- Pour ce travail, seuls les bonus fixes sont utilisés :
--   - Land : +2500 à base_max_hunger, +2500 à base_max_energy
--   - Air  : +5000 à base_max_energy
--   - Sea  : +5000 à base_max_food
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_types;
CREATE TABLE dinosaur_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    stat_modifiers JSON NOT NULL
);

-- Insertion pour "Land"
INSERT INTO dinosaur_types (name, stat_modifiers) VALUES 
('Land', '[
    {"target": "base_max_hunger", "type": "additive", "value": 2500, "source": "type_bonus"},
    {"target": "base_max_energy", "type": "additive", "value": 2500, "source": "type_bonus"},
    {"target": "hunger_increase_multiplier", "type": "multiplicative", "value": -0.25, "source": "type_bonus"},
    {"target": "energy_recovery_multiplier", "type": "multiplicative", "value": 0.25, "source": "type_bonus"}
]');

-- Insertion pour "Air"
INSERT INTO dinosaur_types (name, stat_modifiers) VALUES 
('Air', '[
    {"target": "base_max_energy", "type": "additive", "value": 5000, "source": "type_bonus"},
    {"target": "energy_recovery_multiplier", "type": "multiplicative", "value": 0.50, "source": "type_bonus"}
]');

-- Insertion pour "Sea"
INSERT INTO dinosaur_types (name, stat_modifiers) VALUES 
('Sea', '[
    {"target": "base_max_food", "type": "additive", "value": 5000, "source": "type_bonus"},
    {"target": "hunger_increase_multiplier", "type": "multiplicative", "value": -0.50, "source": "type_bonus"}
]');

-- ---------------------------------------------------------
-- Table des diètes de dinosaures
-- Chaque diète contient un ensemble de modificateurs génériques stockés en JSON,
-- s'appliquant aux earn multipliers.
-- Pour ce travail, seuls les bonus spécifiés sont utilisés :
--   - Omnivore : +50% sur earn_food_global_multiplier
--   - Carnivore : +50% sur energy_recovery_multiplier
--   - Herbivore : -50% sur hunger_increase_multiplier
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_diets;
CREATE TABLE dinosaur_diets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    stat_modifiers JSON NOT NULL
);

-- Insertion pour "Herbivore"
INSERT INTO dinosaur_diets (name, stat_modifiers) VALUES 
('Herbivore', '[
    {"target": "hunger_increase_multiplier", "type": "multiplicative", "value": -0.50, "source": "diet_bonus"}
]');

-- Insertion pour "Carnivore"
INSERT INTO dinosaur_diets (name, stat_modifiers) VALUES 
('Carnivore', '[
    {"target": "energy_recovery_multiplier", "type": "multiplicative", "value": 0.50, "source": "diet_bonus"}
]');

-- Insertion pour "Omnivore"
INSERT INTO dinosaur_diets (name, stat_modifiers) VALUES 
('Omnivore', '[
    {"target": "earn_food_global_multiplier", "type": "multiplicative", "value": 0.50, "source": "diet_bonus"}
]');

-- ---------------------------------------------------------
-- Table principale des dinosaures
-- Stocke les caractéristiques de base, les earn multipliers, les nouveaux multipliers
-- d'évolution, et les autres attributs de jeu.
--
-- Les champs "energy", "food" et "hunger" représentent les valeurs courantes.
-- Les champs "base_max_energy", "base_max_food" et "base_max_hunger" représentent
-- les valeurs de référence utilisées pour le calcul des valeurs finales.
-- Proviennent de constantes stockées en DB et peuvent être ajustées en cas d'urgence.
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaurs;
CREATE TABLE dinosaurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL UNIQUE,
    diet_id INT NOT NULL,
    type_id INT NOT NULL,
    
    -- Valeurs courantes (modifiable par les actions du joueur)
    energy INT NOT NULL,
    food INT NOT NULL,
    hunger INT NOT NULL,
    karma INT NOT NULL,
    experience INT NOT NULL,
    level INT NOT NULL,
    epoch VARCHAR(50) NOT NULL,
    
    -- Détails techniques
    created_at DATETIME NOT NULL,
    death_date DATETIME DEFAULT NULL,
    last_reborn DATETIME NOT NULL,
    reborn_amount INT NOT NULL,
    last_update_by_time_service DATETIME NOT NULL,
    is_sleeping BOOLEAN NOT NULL,
    is_dead BOOLEAN NOT NULL,
    
    -- Clés étrangères
    CONSTRAINT fk_dino_diet FOREIGN KEY (diet_id) REFERENCES dinosaur_diets(id),
    CONSTRAINT fk_dino_type FOREIGN KEY (type_id) REFERENCES dinosaur_types(id)
);

-- ---------------------------------------------------------
-- Nouvelle table pour le système Dynamic Events
-- Cette table stocke les événements dynamiques selon la nouvelle structure :
--   - id : Identifiant unique (auto-incrémenté)
--   - name : Nom de l'événement
--   - description : Description optionnelle
--   - action_type : Type d'action (correspondant aux valeurs de l'enum DinosaurAction)
--   - min_level : Niveau minimum requis
--   - weight : Poids de probabilité
--   - positivity_score : Score de positivité (peut être négatif pour un effet négatif)
--   - modifiers : Modificateurs au format JSON, correspondant à un tableau d'EventModifier
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dynamic_events;
CREATE TABLE dynamic_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    min_level INT NOT NULL,
    weight INT NOT NULL,
    positivity_score INT NOT NULL,
    descriptions JSON NOT NULL,
    base_modifiers JSON NOT NULL
);


-- ---------------------------------------------------------
-- Table de l'historique des vies du dino
-- Stocke les informations de chaque vie (reset) du dino, 
-- y compris le nom, l'expérience, le karma, le niveau, 
-- la date de naissance, la date de mort, et les soul points calculés.
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_lives;
CREATE TABLE dinosaur_lives (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dinosaur_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  experience INT NOT NULL,
  karma INT NOT NULL,
  level INT NOT NULL,
  birth_date DATETIME NOT NULL,
  death_date DATETIME NOT NULL,
  soul_points INT NOT NULL DEFAULT 0,
  dark_soul_points INT NOT NULL DEFAULT 0,
  bright_soul_points INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_dinosaur_lives FOREIGN KEY (dinosaur_id) REFERENCES dinosaurs(id) ON DELETE CASCADE
);
