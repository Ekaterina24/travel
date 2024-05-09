import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  generatedId: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 8, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 8, scale: 6 })
  longitude: number;
}
