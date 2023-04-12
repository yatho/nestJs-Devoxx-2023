import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('starship')
@Controller({
  path: 'starship',
  version: '1',
})
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipService.create(createStarshipDto);
  }

  @Get()
  findAll(): Promise<Array<Starship>> {
    return this.starshipService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.starshipService.findOneByUuid(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipService.update(uuid, updateStarshipDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.starshipService.remove(uuid);
  }
}
