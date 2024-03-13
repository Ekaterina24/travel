import { DayPlaces } from 'src/day_places/day-places.model';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Place extends BaseEntity {

  @PrimaryGeneratedColumn()
  generatedId: number;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string = 'desc';

  @Column()
  addressId: string;

  @Column()
  typePlace: string;

  @Column()
  subTypePlace: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  is_visited: boolean;

  @Column()
  is_favourite: boolean;

  @Column()
  updated_at: Date;

  @ManyToOne(() => DayPlaces, (dayPlaces) => dayPlaces.dateVisiting)
  dayPlaces: DayPlaces;
}
