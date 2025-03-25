-- init.sql
-- =============================================================================
-- Script d'initialisation de la base de données pour le module dinosaures
-- =============================================================================

-- Création de la table `user`
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_connection TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    {"target": "hunger_increase_multiplier", "type": "additive", "value": -0.25, "source": "type_bonus"},
    {"target": "energy_recovery_multiplier", "type": "additive", "value": 0.25, "source": "type_bonus"}
]');

-- Insertion pour "Air"
INSERT INTO dinosaur_types (name, stat_modifiers) VALUES 
('Air', '[
    {"target": "base_max_energy", "type": "additive", "value": 5000, "source": "type_bonus"},
    {"target": "energy_recovery_multiplier", "type": "additive", "value": 0.50, "source": "type_bonus"}
]');

-- Insertion pour "Sea"
INSERT INTO dinosaur_types (name, stat_modifiers) VALUES 
('Sea', '[
    {"target": "base_max_food", "type": "additive", "value": 5000, "source": "type_bonus"},
    {"target": "hunger_increase_multiplier", "type": "additive", "value": -0.50, "source": "type_bonus"}
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
-- proviennent de constantes stockées en DB et peuvent être ajustées en cas d'urgence.
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaurs;
CREATE TABLE dinosaurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    diet_id INT NOT NULL,
    type_id INT NOT NULL,
    
    -- Valeurs courantes (modifiable par les actions du joueur)
    energy INT NOT NULL,
    food INT NOT NULL,
    hunger INT NOT NULL,
    karma INT NOT NULL,
    experience INT NOT NULL,
    level INT NOT NULL,
    money INT NOT NULL,
    skill_points INT NOT NULL,
    epoch VARCHAR(50) NOT NULL,
    
    -- Details techniques
    created_at DATETIME NOT NULL,
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
