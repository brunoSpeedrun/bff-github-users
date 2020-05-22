import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  readonly login: string;
  @Field({ nullable: true })
  readonly id: string;
  @Field({ nullable: true })
  readonly node_id: string;
  @Field({ nullable: true })
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
