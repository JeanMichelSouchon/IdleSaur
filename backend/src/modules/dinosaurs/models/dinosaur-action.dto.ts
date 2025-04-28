import { IsBoolean, IsString, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class DinosaurActionDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsBoolean()
  canPerform: boolean;

  @Expose()
  @IsUrl()
  endpoint: string;

  @Expose()
  @IsUrl()
  image: string;

  constructor(
    name: string,
    description: string,
    levelRequired: number,
    canPerform: boolean,
    endpoint: string,
    image: string
  ) {
    this.name = name;
    this.description = description;
    this.canPerform = canPerform;
    this.endpoint = endpoint;
    this.image = image;
  }
}
