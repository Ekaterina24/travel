import { Place } from 'src/place/place.model';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Audio extends BaseEntity {
  @PrimaryGeneratedColumn()
  generatedId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  desc: string;

  @Column()
  status: AudioStatus;

  @ManyToOne(() => Place, (place) => place.audios, { eager: false })
    place: string;
    
    @Column()
    placeId: string;

}

export enum AudioStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}
