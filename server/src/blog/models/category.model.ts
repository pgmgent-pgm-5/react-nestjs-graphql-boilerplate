import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/*
Custom Models or Entities
*/
import { Post } from './post.model';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 64, nullable: false })
  @Field({ nullable: false })
  name: string;

  @Column({ length: 256, nullable: false })
  @Field({ nullable: false })
  description: string;

  @OneToMany(() => Post, post => post.category)
  posts: [Post]
}