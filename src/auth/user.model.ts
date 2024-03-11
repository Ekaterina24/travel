import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import * as bcrypt from "bcrypt";

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: UserRole;

  @Column()
  scores: number;

  async validatePassword(password: String): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password
  }
}