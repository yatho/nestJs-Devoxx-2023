import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetModule } from '../planet/planet.module.js';
import { StarshipModule } from '../starship/starship.module.js';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [PlanetModule, StarshipModule, TypeOrmModule.forFeature([Booking])],
})
export class BookingModule {}
