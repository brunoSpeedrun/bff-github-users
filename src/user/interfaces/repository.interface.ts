import { Document } from 'mongoose';

export interface Repository extends Document {
  readonly id: string;
  readonly node_id: string;
  readonly name: string;
  readonly full_name: string;
  readonly html_url: string;
}
