import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity.js';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('planets')
@Controller({
  path: 'planet',
  version: '1',
})
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return this.planetService.create(createPlanetDto);
  }

  @Get()
  findAll(): Promise<Array<Planet>> {
    return this.planetService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<Planet> {
    return this.planetService.findOneByUuid(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    return this.planetService.update(uuid, updatePlanetDto);
  }

  @Delete(':uuid')
  @HttpCode(200)
  async remove(@Param('uuid') uuid: string): Promise<DeleteResult> {
    return this.planetService.remove(uuid);
  }
}
