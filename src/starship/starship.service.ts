import { Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  create(createStarshipDto: CreateStarshipDto) {
    return 'This action adds a new starship';
  }

  findAll(): Promise<Array<Starship>> {
    return this.starshipRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} starship`;
  }

  update(id: number, updateStarshipDto: UpdateStarshipDto) {
    return `This action updates a #${id} starship`;
  }

  remove(id: number) {
    return `This action removes a #${id} starship`;
  }
}
