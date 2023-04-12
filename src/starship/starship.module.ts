import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity.js';

@Module({
  controllers: [StarshipController],
  providers: [StarshipService],
  imports: [TypeOrmModule.forFeature([Starship])],
  exports: [StarshipService],
})
export class StarshipModule {}
