import { Document } from 'mongoose';

export interface User extends Document {
  readonly login: string;
  readonly id: string;
  readonly node_id: string;
  readonly name: string;
  readonly html_url: string;
  readonly repos_url: string;
  readonly updated_at: string;
  readonly created_at: string;
  readonly email: string;
}
