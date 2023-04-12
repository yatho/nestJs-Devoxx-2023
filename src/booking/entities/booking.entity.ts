import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../utils/default-entity';
import { Planet } from '../../planet/entities/planet.entity';
import { Starship } from '../../starship/entities/starship.entity';
import * as dayjs from 'dayjs';

@Entity({ name: 'booking' })
export class Booking extends DefaultEntity {
  @ManyToOne(() => Planet)
  destination: Planet;

  @ManyToOne(() => Starship)
  starship: Starship;

  @Column()
  traveller: string;

  @Column()
  departureDate: Date;

  arrivalDate: Date;

  price: number;

  @AfterLoad()
  processTravelTime() {
    if (this.destination?.distanceToEarth && this.starship?.speed) {
      const travelTime = this.destination.distanceToEarth / (this.starship.speed * 24);
      this.arrivalDate = new Date(dayjs(this.departureDate).add(travelTime, 'day').toISOString());
    }
  }

  @AfterLoad()
  processPrice() {
    if (this.destination?.distanceToEarth && this.starship?.kilometerPrice) {
      this.price = this.destination.distanceToEarth * this.starship.kilometerPrice;
    }
  }
}
