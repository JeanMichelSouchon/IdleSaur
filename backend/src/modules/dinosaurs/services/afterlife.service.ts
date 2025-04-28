import { DinosaurLivesRepository } from '../repositories/dinosaur-lives.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DINOSAUR_CONSTANTS } from '../../../common/config/dinosaur.constants';
import { DinosaurLifeDTO } from '../models/dinosaur-life.dto';
import { PlayerScoreRepository } from '../repositories/player-score.repository';

/**
 * Service dédié à la gestion de l'afterlife du dinosaure.
 * Il se charge de créer et d'enregistrer en base l'historique d'une vie de dinosaure.
 */
export class AfterlifeService {
  private dinosaurLivesRepository: DinosaurLivesRepository;
  private playerScoreRepository: PlayerScoreRepository;

  constructor(dinosaurLivesRepository: DinosaurLivesRepository, playerScoreRepository: PlayerScoreRepository) {
    this.dinosaurLivesRepository = dinosaurLivesRepository;
    this.playerScoreRepository = playerScoreRepository;
  }

  /**
   * Traite l'afterlife d'un dinosaure en enregistrant sa vie passée.
   * Le calcul des soul points se fait de la manière suivante :
   * - Le total de soul points est égal à l'expérience * EXP_TO_SOUL_POINTS_CONVERSION_RATIO.
   * - Si le karma est positif, on attribue des bright soul points proportionnellement au karma,
   *   et le reste en neutral soul points.
   * - Si le karma est négatif, on attribue des dark soul points proportionnellement à l'absolu du karma,
   *   et le reste en neutral soul points.
   *
   * @param dinosaur - Le dinosaure avant reset.
   * @returns L'identifiant de la vie enregistrée.
   */
  public async processAfterlife(dinosaur: FrontendDinosaurDTO): Promise<number> {
    // Calcul du total de soul points basé sur l'expérience
    const totalSoulPoints = Math.floor(
      dinosaur.experience * DINOSAUR_CONSTANTS.EXP_TO_SOUL_POINTS_CONVERSION_RATIO
    );

    let brightSoulPoints = 0;
    let darkSoulPoints = 0;
    let neutralSoulPoints = 0;

    if (dinosaur.karma >= 0) {
      brightSoulPoints = Math.floor(totalSoulPoints * (dinosaur.karma / DINOSAUR_CONSTANTS.KARMA_WIDTH));
      neutralSoulPoints = totalSoulPoints - brightSoulPoints;
    } else {
      darkSoulPoints = Math.floor(totalSoulPoints * (Math.abs(dinosaur.karma) / DINOSAUR_CONSTANTS.KARMA_WIDTH));
      neutralSoulPoints = totalSoulPoints - darkSoulPoints;
    }

    // Création de l'enregistrement de la vie passée
    // On considère ici que la date de naissance correspond à la date de création initiale du dino
    // et la date de mort correspond à l'instant actuel.
    const now = new Date();
    const lifeRecord: DinosaurLifeDTO = {
        id: 0, // overidden by the database
      dinosaur_id: dinosaur.id,
      name: dinosaur.name,
      experience: dinosaur.experience,
      karma: dinosaur.karma,
      level: dinosaur.level,
      birth_date: dinosaur.created_at,
      death_date: now,
      soul_points: neutralSoulPoints, // Points neutres
      dark_soul_points: darkSoulPoints,
      bright_soul_points: brightSoulPoints,
        created_at: now,
    };

    // Enregistrement en base de la vie passée via le repository
    const insertedId = await this.dinosaurLivesRepository.createDinosaurLife(lifeRecord);

    // On met à jour le score du joueur (via le PlayerScoreRepository)
    await this.playerScoreRepository.recalculateAndSaveUserScore(dinosaur.userId);
    return insertedId;
  }
}
