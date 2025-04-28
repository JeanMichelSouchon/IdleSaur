import { PlayerScoreDTO } from "./player-score.dto";

export interface User {
  id: number;
  username: string;
  email: string;

  neutral_soul_points: number;   // Attention à la cohérence avec la table
  dark_soul_points: number;
  bright_soul_points: number;

  password_hash: string;
  isAdmin: boolean;
  created_at: Date;

  /**
   * Le champ JSON stocké en base, qui contient toutes les infos de score.
   * Comme c’est du JSON, on peut le typer en `string` (brut depuis la DB)
   * ou `any` ou plus précisément un objet `PlayerScoreDTO`.
   * Ici, on le laisse en `any` ou `string` selon votre usage.
   */
  player_score?: PlayerScoreDTO;
}
