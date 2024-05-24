import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Trip } from 'src/trip/trip.model';
import { User } from 'src/auth/user.model';

@Entity()
export class DayPlaces extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip, (trip) => trip.id, { eager: false })
  tripId: number;

    @Column()
  placeId: string;

  @Column()
  dateVisiting: string;

  @Column()
    @ManyToOne(() => User, (user) => user.id, { eager: false })
    userId: number;
}
