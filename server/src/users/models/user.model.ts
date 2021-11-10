import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

/*
Custom Models or Entities
*/
import { Post } from 'src/blog/models/post.model';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 32, nullable: false })
  @Field({ nullable: false })
  username: string;

  @Column({ length: 128, nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column({ length: 32, nullable: false })
  @Field({ nullable: false })
  password: string;

  @ManyToMany(() => Post, post => post.authors)
  posts: [Post]

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }
}