import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RepositoryType {
  @Field({ nullable: true })
  readonly id: string;
  @Field({ nullable: true })
  readonly node_id: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly full_name: string;
  @Field({ nullable: true })
  readonly html_url: string;
}
