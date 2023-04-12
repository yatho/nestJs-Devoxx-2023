import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePlanetDto } from './create-planet.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  uuid: string;
}
