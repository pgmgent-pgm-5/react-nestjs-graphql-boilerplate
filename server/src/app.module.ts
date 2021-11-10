import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

// Built-in modules
import { join } from 'path';

// Custom Modules
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';

import * as dotenv from 'dotenv';
dotenv.config();
const nodeEnvironment = `${(process.env.NODE_ENV || 'development').toLowerCase()}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${nodeEnvironment}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],     
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        seeds: [__dirname + '/**/*.seed{.ts,.js}'],
        factories: [__dirname + '/**/*.factory{.ts,.js}'],
        synchronize: true,
        logging: nodeEnvironment === 'development' ? true : false,
        dropSchema: nodeEnvironment === 'test' ? true : false,
      }),     
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: nodeEnvironment === 'development' ? true : false,
      introspection: nodeEnvironment === 'development' ? true : false,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      sortSchema: true,
    }),
    UsersModule, 
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
