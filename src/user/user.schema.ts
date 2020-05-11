import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.UserSchema({
  login: String,
  id: String,
  nodeid: String,
  name: String,
  htmlurl: String,
  reposurl: String,
  updatedat: String,
  createdat: String,
  email: String,
});
