import { DefaultEntity } from '../../utils/default-entity.js';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'starship' })
export class Starship extends DefaultEntity {
  @Column()
  name: string;
  @Column()
  speed: number;
  @Column()
  kilometerPrice: number;
}
