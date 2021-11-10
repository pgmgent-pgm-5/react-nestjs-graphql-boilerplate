import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

/*
Custom Models or Entities
*/
import { Post } from './post.model';

@Entity()
@ObjectType()
export class Tag extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 64, nullable: false })
  @Field({ nullable: false })
  name: string;

  @Column({ length: 256, nullable: false })
  @Field({ nullable: false })
  description: string;

  @ManyToMany(() => Post, post => post.tags)
  posts: [Post]
}