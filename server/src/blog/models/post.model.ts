import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

/*
Custom Models or Entities
*/
import { Category } from './category.model';
import { Tag } from './tag.model';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 256, nullable: false })
  @Field({ nullable: false })
  title: string;

  @Column({ length: 1024, nullable: false })
  @Field({ nullable: false })
  description: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  body: string;

  @ManyToOne(
    () => Category, 
    ( category: Category ) => category.posts,
    { eager: true },
  )
  @Field(() => Category)
  category: Category;

  @ManyToMany(
    () => Tag,
    ( tag: Tag ) => tag.posts,
    { eager: true },
  )
  @JoinTable({
    name: 'posts_has_tags',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Tag])
  tags: Tag[];

  @ManyToMany(
    () => User,
    ( user: User ) => user.posts,
    { eager: true },
  )
  @JoinTable({
    name: 'posts_has_authors',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [User])
  authors: User[];
}