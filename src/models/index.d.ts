import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReactionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GoalMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LogInMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Comment {
  readonly id: string;
  readonly content?: string | null;
  readonly username?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class Reaction {
  readonly id: string;
  readonly username?: string | null;
  readonly reactionType?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Reaction, ReactionMetaData>);
  static copyOf(source: Reaction, mutator: (draft: MutableModel<Reaction, ReactionMetaData>) => MutableModel<Reaction, ReactionMetaData> | void): Reaction;
}

export declare class Goal {
  readonly id: string;
  readonly username?: string | null;
  readonly goalNumber?: number | null;
  readonly date?: string | null;
  readonly content?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Goal, GoalMetaData>);
  static copyOf(source: Goal, mutator: (draft: MutableModel<Goal, GoalMetaData>) => MutableModel<Goal, GoalMetaData> | void): Goal;
}

export declare class LogIn {
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly LogInInfo?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly logInLogInInfoId?: string | null;
  constructor(init: ModelInit<LogIn, LogInMetaData>);
  static copyOf(source: LogIn, mutator: (draft: MutableModel<LogIn, LogInMetaData>) => MutableModel<LogIn, LogInMetaData> | void): LogIn;
}

export declare class User {
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly profilepicture?: string | null;
  readonly bio?: string | null;
  readonly PostedBy?: (Post | null)[] | null;
  readonly IsAGoalOf?: (Goal | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly caption?: string | null;
  readonly photo?: string | null;
  readonly username?: string | null;
  readonly userID: string;
  readonly CommentedOn?: (Comment | null)[] | null;
  readonly ReactedTo?: (Reaction | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}