import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Tweet } from '../../tweet/entities/tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];
}
