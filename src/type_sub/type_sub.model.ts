import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
  
  @Entity()
  export class TypeSub extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    period: number;
  
    @Column()
    price: number;
  
  }
  