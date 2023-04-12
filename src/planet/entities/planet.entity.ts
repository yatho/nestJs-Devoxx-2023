import { DefaultEntity } from '../../utils/default-entity.js';
import { Entity } from 'typeorm';

@Entity({ name: 'planet' })
export class Planet extends DefaultEntity {
  name: string;
  distanceToEarth: number;
}
