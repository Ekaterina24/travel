import {
  BaseEntity,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Trip } from 'src/trip/trip.model';
import { Place } from 'src/place/place.model';

@Entity()
export class DayPlaces extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Trip, (trip) => trip.id, { eager: false })
  tripId: number;

    //   @OneToMany((type) => Place, (place) => place.id, { eager: true })
    @Column()
  placeId: string;

  @Column()
  dateVisiting: string;
}
