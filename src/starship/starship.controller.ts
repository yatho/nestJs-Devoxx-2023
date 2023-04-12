import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity.js';

@Controller('starship')
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipService.create(createStarshipDto);
  }

  @Get()
  findAll(): Array<Starship> {
    const starshipsJSON = [
      {
        name: 'Apollo',
        speed: 39000,
        kilometerPrice: 10000,
      },
      {
        name: 'SpaceX Starship',
        speed: 27000,
        kilometerPrice: 250000,
      },
      {
        name: 'Sonde Parker',
        speed: 532000,
        kilometerPrice: 50000,
      },
    ];

    const starships: Starship[] = Object.assign(new Array<Starship>(), starshipsJSON);

    return starships;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starshipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starshipService.remove(+id);
  }
}
