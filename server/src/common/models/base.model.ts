import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class BaseModel extends BaseEntity {
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  @Field({ nullable: true })
  deletedAt?: Date;
}