import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { Trip } from 'src/trip/trip.model';

@Entity()
export class DayPlaces extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Trip, (trip) => trip.id, { eager: false })
  tripId: number;

    @Column()
  placeId: string;

  @Column()
  dateVisiting: string;
}
