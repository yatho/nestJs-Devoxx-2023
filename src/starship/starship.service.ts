import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity.js';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    return this.starshipRepository.save(createStarshipDto);
  }

  findAll(): Promise<Array<Starship>> {
    return this.starshipRepository.find();
  }

  findOneByUuid(uuid: string): Promise<Starship> {
    return this.starshipRepository.findOneBy({
      uuid,
    });
  }

  async update(uuid: string, updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
    const starship = await this.findOneByUuid(uuid);

    if (!starship) throw new NotFoundException();

    await this.starshipRepository.save({ id: starship.id, ...updateStarshipDto });

    return this.findOneByUuid(uuid);
  }

  async remove(uuid: string): Promise<DeleteResult> {
    const starship = await this.findOneByUuid(uuid);

    if (!starship) throw new NotFoundException();

    return this.starshipRepository.delete(starship);
  }
}
