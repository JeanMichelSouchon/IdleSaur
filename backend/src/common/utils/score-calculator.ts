import { DinosaurLifeDTO } from '../../modules/dinosaurs/models/dinosaur-life.dto';
import { PlayerScoreDTO } from '../../modules/users/models/player-score.dto';

/**
 * Calcule le score global d'un joueur à partir de la liste
 * de toutes les vies de ses dinosaures (ou d'un seul).
 *
 * @param lives Liste des DinosaurLifeDTO.
 * @returns PlayerScoreDTO
 */
export function computePlayerScore(lives: DinosaurLifeDTO[]): PlayerScoreDTO {
  const playerScore = new PlayerScoreDTO();
  
  // Initialisation des champs numériques
  playerScore.totalSoulPoints = 0;
  playerScore.totalDarkSoulPoints = 0;
  playerScore.totalBrightSoulPoints = 0;
  playerScore.totalLives = lives.length;
  
  playerScore.totalKarma = 0;
  playerScore.latestKarma = 0;
  playerScore.maxKarma = Number.NEGATIVE_INFINITY;
  playerScore.minKarma = Number.POSITIVE_INFINITY;
  playerScore.averageKarma = 0;
  playerScore.negativeLivesCount = 0;
  playerScore.positiveLivesCount = 0;
  
  playerScore.totalLifetime = 0;
  playerScore.maxLifetime = 0;
  
  playerScore.totalLevels = 0;
  playerScore.maxLevel = 0;
  
  playerScore.totalExperience = 0;
  playerScore.maxExperience = 0;
  
  if (lives.length === 0) {
    // Aucune vie => on renvoie l'objet déjà initialisé
    // (tout à 0 sauf les extremes qui resteront ±Infinity, on va corriger ci-dessous)
    playerScore.maxKarma = 0;
    playerScore.minKarma = 0;
    return playerScore;
  }
  
  // Variable pour la moyenne
  let sumKarma = 0;
  
  // Pour récupérer la dernière vie (celle ayant la date de mort la plus récente)
  let latestLife: DinosaurLifeDTO | null = null;
  
  for (const life of lives) {
    // Soul points
    playerScore.totalSoulPoints += life.soul_points;
    playerScore.totalDarkSoulPoints += life.dark_soul_points;
    playerScore.totalBrightSoulPoints += life.bright_soul_points;
    
    // Karma
    sumKarma += life.karma;
    if (life.karma > playerScore.maxKarma) {
      playerScore.maxKarma = life.karma;
    }
    if (life.karma < playerScore.minKarma) {
      playerScore.minKarma = life.karma;
    }
    
    if (life.karma < 0) {
      playerScore.negativeLivesCount++;
    } else {
      // 0 et positif => positiveLivesCount
      playerScore.positiveLivesCount++;
    }
    
    // On veut le "latest karma" = karma de la dernière vie
    // On prend la vie dont la death_date est la plus "tardive"
    if (!latestLife || life.death_date > latestLife.death_date) {
      latestLife = life;
    }
    
    // Lifetime
    const birth = life.birth_date.getTime();
    const death = life.death_date.getTime();
    const duration = death - birth; // ms
    playerScore.totalLifetime += duration;
    if (duration > playerScore.maxLifetime) {
      playerScore.maxLifetime = duration;
    }
    
    // Levels
    playerScore.totalLevels += life.level;
    if (life.level > playerScore.maxLevel) {
      playerScore.maxLevel = life.level;
    }
    
    // Exp
    playerScore.totalExperience += life.experience;
    if (life.experience > playerScore.maxExperience) {
      playerScore.maxExperience = life.experience;
    }
  } // end for

  // On enregistre la somme du karma pour le totalKarma si désiré
  playerScore.totalKarma = sumKarma;
  
  // Moyenne
  playerScore.averageKarma = sumKarma / lives.length;
  
  // Latest karma
  if (latestLife) {
    playerScore.latestKarma = latestLife.karma;
  }

  return playerScore;
}
