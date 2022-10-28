// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, Reaction, Goal, LogIn, User, Post } = initSchema(schema);

export {
  Comment,
  Reaction,
  Goal,
  LogIn,
  User,
  Post
};