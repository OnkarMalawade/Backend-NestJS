// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { User } from './user/entities/user.entity';
// import { Profile } from './profile/entities/profile.entity';
// import { Tweet } from './tweet/entities/tweet.entity';
// import { UserModule } from './user/user.module';
// import { ProfileModule } from './profile/profile.module';
// import { TweetModule } from './tweet/tweet.module';
// import { ProfileModule } from './profile/profile.module';
// import { TweetModule } from './tweet/tweet.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     // TypeOrmModule.forRootAsync({
//     //   imports: [ConfigModule],
//     //   inject: [ConfigService],
//     //   useFactory: (config: ConfigService) => ({
//     //     type: 'mysql',
//     //     host: config.get('DB_HOST'),
//     //     port: +config.get<number>('DB_PORT'),
//     //     username: config.get('DB_USERNAME'),
//     //     password: config.get('DB_PASSWORD'),
//     //     database: config.get('DB_NAME'),
//     //     entities: [User, Profile, Tweet],
//     //     synchronize: true,
//     //   }),
//     // }),
//     UserModule,
//     ProfileModule,
//     TweetModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProfileModule,
    TweetModule,
  ],
})
export class AppModule {}
