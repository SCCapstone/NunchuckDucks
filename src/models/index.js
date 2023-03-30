// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ReactionType = {
  "LIKE": "LIKE",
  "LOVE": "LOVE",
  "FLEX": "FLEX",
  "CLAP": "CLAP"
};

const { Workout, Notification, FollowedBy, Follows, Reaction, Comment, Goal, User, Post } = initSchema(schema);

export {
  Workout,
  Notification,
  FollowedBy,
  Follows,
  Reaction,
  Comment,
  Goal,
  User,
  Post,
  ReactionType
};