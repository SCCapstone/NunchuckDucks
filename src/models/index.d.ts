import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type FollowedByMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FollowsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReactionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LogInMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GoalMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerFollowedBy = {
  readonly id: string;
  readonly username?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFollowedBy = {
  readonly id: string;
  readonly username?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FollowedBy = LazyLoading extends LazyLoadingDisabled ? EagerFollowedBy : LazyFollowedBy

export declare const FollowedBy: (new (init: ModelInit<FollowedBy, FollowedByMetaData>) => FollowedBy) & {
  copyOf(source: FollowedBy, mutator: (draft: MutableModel<FollowedBy, FollowedByMetaData>) => MutableModel<FollowedBy, FollowedByMetaData> | void): FollowedBy;
}

type EagerFollows = {
  readonly id: string;
  readonly username?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFollows = {
  readonly id: string;
  readonly username?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Follows = LazyLoading extends LazyLoadingDisabled ? EagerFollows : LazyFollows

export declare const Follows: (new (init: ModelInit<Follows, FollowsMetaData>) => Follows) & {
  copyOf(source: Follows, mutator: (draft: MutableModel<Follows, FollowsMetaData>) => MutableModel<Follows, FollowsMetaData> | void): Follows;
}

type EagerReaction = {
  readonly id: string;
  readonly username?: string | null;
  readonly reactionType?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReaction = {
  readonly id: string;
  readonly username?: string | null;
  readonly reactionType?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reaction = LazyLoading extends LazyLoadingDisabled ? EagerReaction : LazyReaction

export declare const Reaction: (new (init: ModelInit<Reaction, ReactionMetaData>) => Reaction) & {
  copyOf(source: Reaction, mutator: (draft: MutableModel<Reaction, ReactionMetaData>) => MutableModel<Reaction, ReactionMetaData> | void): Reaction;
}

type EagerComment = {
  readonly id: string;
  readonly content?: string | null;
  readonly username?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly id: string;
  readonly content?: string | null;
  readonly username?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment, CommentMetaData>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

type EagerLogIn = {
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly User?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly logInUserId?: string | null;
}

type LazyLogIn = {
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly User: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly logInUserId?: string | null;
}

export declare type LogIn = LazyLoading extends LazyLoadingDisabled ? EagerLogIn : LazyLogIn

export declare const LogIn: (new (init: ModelInit<LogIn, LogInMetaData>) => LogIn) & {
  copyOf(source: LogIn, mutator: (draft: MutableModel<LogIn, LogInMetaData>) => MutableModel<LogIn, LogInMetaData> | void): LogIn;
}

type EagerUser = {
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly profilePicture?: string | null;
  readonly bio?: string | null;
  readonly Goals?: (Goal | null)[] | null;
  readonly Posts?: (Post | null)[] | null;
  readonly Follows?: (Follows | null)[] | null;
  readonly FollowedBies?: (FollowedBy | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly profilePicture?: string | null;
  readonly bio?: string | null;
  readonly Goals: AsyncCollection<Goal>;
  readonly Posts: AsyncCollection<Post>;
  readonly Follows: AsyncCollection<Follows>;
  readonly FollowedBies: AsyncCollection<FollowedBy>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerGoal = {
  readonly id: string;
  readonly username?: string | null;
  readonly goalNumber?: number | null;
  readonly date?: string | null;
  readonly content?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGoal = {
  readonly id: string;
  readonly username?: string | null;
  readonly goalNumber?: number | null;
  readonly date?: string | null;
  readonly content?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Goal = LazyLoading extends LazyLoadingDisabled ? EagerGoal : LazyGoal

export declare const Goal: (new (init: ModelInit<Goal, GoalMetaData>) => Goal) & {
  copyOf(source: Goal, mutator: (draft: MutableModel<Goal, GoalMetaData>) => MutableModel<Goal, GoalMetaData> | void): Goal;
}

type EagerPost = {
  readonly id: string;
  readonly caption?: string | null;
  readonly photo?: string | null;
  readonly username?: string | null;
  readonly Comments?: (Comment | null)[] | null;
  readonly Reactions?: (Reaction | null)[] | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly id: string;
  readonly caption?: string | null;
  readonly photo?: string | null;
  readonly username?: string | null;
  readonly Comments: AsyncCollection<Comment>;
  readonly Reactions: AsyncCollection<Reaction>;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post, PostMetaData>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}