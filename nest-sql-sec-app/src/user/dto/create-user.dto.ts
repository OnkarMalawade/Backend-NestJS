import { IsNumber, IsString } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { OneToMany, OneToOne } from 'typeorm';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];
}
