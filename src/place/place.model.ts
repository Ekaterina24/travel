import { Audio } from 'src/audio/audio.model';
import { City } from 'src/city/city.model';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
// @Index(['id'], {unique: true})
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  generatedId: number;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

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

  @ManyToOne((type) => City, (city) => city.generatedId, { eager: false })
  cityId: string;

  @OneToMany(type => Audio, audio => audio.place, {eager: true})
  audios: Audio[]

  
}
