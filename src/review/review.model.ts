import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { User } from 'src/auth/user.model';
  
  @Entity()
  export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @ManyToOne(() => User, (user) => user.id, { eager: false })
    userId: number;
  
    @Column()
    placeId: string;
  
    @Column()
    text: string;
  
    @Column()
      rating: number;
      
      @Column()
        date: Date; 
  }