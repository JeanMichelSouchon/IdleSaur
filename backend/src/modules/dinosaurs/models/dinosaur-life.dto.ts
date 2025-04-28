import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * DTO pour l'historique d'une vie de dinosaure.
 * Ce DTO est utilisé pour sérialiser et valider les données relatives à l'enregistrement
 * d'une vie passée dans le système afterlife.
 */
@Exclude()
export class DinosaurLifeDTO {
  @Expose()
  @IsNumber()
  id!: number;

  @Expose()
  @IsNumber()
  dinosaur_id!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsNumber()
  experience!: number;

  @Expose()
  @IsNumber()
  karma!: number;

  @Expose()
  @IsNumber()
  level!: number;

  @Expose()
  @Type(() => Date)
  @IsDate()
  birth_date!: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  death_date!: Date;

  /**
   * Points neutres (anciennement "soul_points").
   */
  @Expose()
  @IsNumber()
  soul_points!: number;

  @Expose()
  @IsNumber()
  dark_soul_points!: number;

  @Expose()
  @IsNumber()
  bright_soul_points!: number;

  @Expose()
  @Type(() => Date)
  @IsDate()
  created_at!: Date;
}
