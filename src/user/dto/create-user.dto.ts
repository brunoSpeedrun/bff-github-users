import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  readonly login: string;
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly node_id: string;
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly html_url: string;
  @Field({ nullable: true })
  readonly repos_url: string;
  @Field({ nullable: true })
  readonly updated_at: string;
  @Field({ nullable: true })
  readonly created_at: string;
  @Field({ nullable: true })
  readonly email: string;
}
