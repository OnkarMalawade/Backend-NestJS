import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tweet } from '../tweet/tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];
}
