/**
 * DTO pour l'historique d'une vie de dinosaure.
 * Ce DTO est utilisé pour sérialiser et valider les données relatives à l'enregistrement
 * d'une vie passée dans le système afterlife.
 */
export class DinosaurLifeDTO {
  
  
  id!: number;
  dinosaur_id!: number;
  name!: string;
  experience!: number;
  karma!: number;
  level!: number;
  birth_date!: Date;
  death_date!: Date;

  /**
   * Points neutres (anciennement "soul_points").
   */
  
  
  soul_points!: number;
  dark_soul_points!: number;
  bright_soul_points!: number;
  created_at!: Date;
}
