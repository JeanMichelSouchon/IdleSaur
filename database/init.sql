-- init.sql
-- =============================================================================
-- Script d'initialisation de la base de données pour le module dinosaures
-- =============================================================================

-- Création de la table `user`
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_connection TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    weapons INT NOT NULL,
    armors INT NOT NULL,
    friends INT NOT NULL,
    employees INT NOT NULL,
    karma INT NOT NULL,
    experience INT NOT NULL,
    level INT NOT NULL,
    money INT NOT NULL,
    skill_points INT NOT NULL,
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
-- Table des compétences (skills)
-- Stocke la définition de chaque skill.
-- Champs :
--   - id : identifiant unique
--   - name : nom de la compétence
--   - description : description optionnelle
--   - price : coût en points de compétence
--   - min_level_to_buy : niveau minimum requis
--   - category : catégorie (food, energy, money, karma, experience)
--   - type : 'permanent' ou 'triggered'
--   - tier : niveau hiérarchique
--   - duration : durée en secondes (pour les skills déclenchables)
--   - stat_modifiers : modificateurs stockés en JSON
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_skills;
CREATE TABLE dinosaur_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    min_level_to_buy INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    tier INT NOT NULL,
    duration INT,  -- Nullable pour les skills permanents
    stat_modifiers JSON NOT NULL
);

DROP TABLE IF EXISTS dinosaur_skills_instance;
CREATE TABLE dinosaur_skills_instance (
  dinosaur_id INT NOT NULL,
  skill_id INT NOT NULL,
  is_purchased BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN,
  last_activated_at DATETIME,
  PRIMARY KEY (dinosaur_id, skill_id),
  CONSTRAINT fk_dino_skill_instance_dino FOREIGN KEY (dinosaur_id) REFERENCES dinosaurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_dino_skill_instance_skill FOREIGN KEY (skill_id) REFERENCES dinosaur_skills(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- Table des objets (items)
-- Stocke la définition de chaque item.
-- Champs :
--   - id : identifiant unique
--   - name : nom de l'objet
--   - description : description optionnelle
--   - price : prix en argent
--   - min_level_to_buy : niveau minimum requis
--   - item_type : 'consumable' ou 'persistent'
--   - category : catégorie (ex. weapon, armor, accessory) – optionnel
--   - levels : tableau JSON définissant la progression des niveaux
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_items;
CREATE TABLE dinosaur_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    min_level_to_buy INT NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    levels JSON NOT NULL
);

DROP TABLE IF EXISTS dinosaur_items_instance;
CREATE TABLE dinosaur_items_instance (
  dinosaur_id INT NOT NULL,
  item_id INT NOT NULL,
  current_level_or_quantity INT NOT NULL,
  is_equipped BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (dinosaur_id, item_id),
  CONSTRAINT fk_dino_item_instance_dino FOREIGN KEY (dinosaur_id) REFERENCES dinosaurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_dino_item_instance_item FOREIGN KEY (item_id) REFERENCES dinosaur_items(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- Table des bâtiments
-- Stocke la définition de chaque bâtiment.
-- Champs :
--   - id : identifiant unique
--   - name : nom du bâtiment
--   - description : description optionnelle
--   - price : prix d'achat
--   - min_level_to_buy : niveau minimum requis
--   - current_level : niveau par défaut (pour la définition)
--   - max_level : niveau maximum (souvent dérivable de l'arbre)
--   - improvement_tree : arbre d'améliorations en JSON
--   - stat_modifiers : modificateurs de base en JSON
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_buildings;
CREATE TABLE dinosaur_buildings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    min_level_to_buy INT NOT NULL,
    max_level INT NOT NULL,
    improvement_tree JSON NOT NULL,
    stat_modifiers JSON NOT NULL
);

DROP TABLE IF EXISTS dinosaur_buildings_instance;
CREATE TABLE dinosaur_buildings_instance (
  dinosaur_id INT NOT NULL,
  building_id INT NOT NULL,
  current_level INT NOT NULL,
  purchased_upgrades JSON NOT NULL,  -- Stocke le mapping des upgrades achetés
  PRIMARY KEY (dinosaur_id, building_id),
  CONSTRAINT fk_dino_building_instance_dino FOREIGN KEY (dinosaur_id) REFERENCES dinosaurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_dino_building_instance_building FOREIGN KEY (building_id) REFERENCES dinosaur_buildings(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- Table de définition des soul skills (nouveaux assets)
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_soul_skills;
CREATE TABLE dinosaur_soul_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    soul_type ENUM('neutral','bright','dark') NOT NULL,
    tier INT NOT NULL,
    stat_modifiers JSON NOT NULL
);

-- ---------------------------------------------------------
-- Table des instances de soul skills (achats par les dinosaures)
-- ---------------------------------------------------------
DROP TABLE IF EXISTS dinosaur_soul_skills_instance;
CREATE TABLE dinosaur_soul_skills_instance (
  dinosaur_id INT NOT NULL,
  soul_skill_id INT NOT NULL,
  is_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  purchased_at DATETIME,
  PRIMARY KEY (dinosaur_id, soul_skill_id),
  CONSTRAINT fk_dino_soul_skill_instance_dino FOREIGN KEY (dinosaur_id) REFERENCES dinosaurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_dino_soul_skill_instance_soul_skill FOREIGN KEY (soul_skill_id) REFERENCES dinosaur_soul_skills(id) ON DELETE CASCADE
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
