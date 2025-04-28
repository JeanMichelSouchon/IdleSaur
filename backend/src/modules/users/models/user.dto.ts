import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { PlayerScoreDTO } from './player-score.dto';

/**
 * DTO pour les données renvoyées au frontend concernant l'utilisateur.
 */
@Exclude()
export class UserDTO {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  neutral_soul_points!: number;

  @Expose()
  dark_soul_points!: number;

  @Expose()
  bright_soul_points!: number;

  @Expose()
  created_at!: Date;

  /**
   * Score global du joueur, stocké en base sous forme de JSON.
   * On l’expose ici en tant que PlayerScoreDTO pour pouvoir l’exploiter directement.
   */

  @Expose()
  @Type(() => PlayerScoreDTO)
  @Transform(({ value }) => {
    // Si `value` est une string, on la parse.
    // Si c'est déjà un objet, on le renvoie tel quel.
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  })
  player_score!: PlayerScoreDTO;
}
