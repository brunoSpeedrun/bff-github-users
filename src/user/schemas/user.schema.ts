import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  login: String,
  id: String,
  node_id: String,
  name: String,
  html_url: String,
  repos_url: String,
  updated_at: String,
  created_at: String,
  email: String,
});
