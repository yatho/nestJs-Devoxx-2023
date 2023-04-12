import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PlanetModule } from './planet/planet.module';
import { StarshipModule } from './starship/starship.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';
import { SecurityModule } from './security/security.module';
import configuration from './config/configuration.js';
import configurationSchema from './config/schema';

@Module({
  imports: [
    HealthModule,
    PlanetModule,
    StarshipModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.get('database.path'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
    BookingModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
