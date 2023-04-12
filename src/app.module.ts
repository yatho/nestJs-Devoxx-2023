import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PlanetModule } from './planet/planet.module';
import { StarshipModule } from './starship/starship.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';
@Module({
  imports: [
    HealthModule,
    PlanetModule,
    StarshipModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.get('SQL_MEMORY_DB_SHARED'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
