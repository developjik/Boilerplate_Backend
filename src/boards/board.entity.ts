import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './boards.status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @Column()
  creator: string;

  @Column()
  createAt: string;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
