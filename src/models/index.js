// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FollowedBy, Follows, Reaction, Comment, LogIn, User, Goal, Post } = initSchema(schema);

export {
  FollowedBy,
  Follows,
  Reaction,
  Comment,
  LogIn,
  User,
  Goal,
  Post
};