/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFollowedBy = /* GraphQL */ `
  mutation CreateFollowedBy(
    $input: CreateFollowedByInput!
    $condition: ModelFollowedByConditionInput
  ) {
    createFollowedBy(input: $input, condition: $condition) {
      id
      username
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFollowedBy = /* GraphQL */ `
  mutation UpdateFollowedBy(
    $input: UpdateFollowedByInput!
    $condition: ModelFollowedByConditionInput
  ) {
    updateFollowedBy(input: $input, condition: $condition) {
      id
      username
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFollowedBy = /* GraphQL */ `
  mutation DeleteFollowedBy(
    $input: DeleteFollowedByInput!
    $condition: ModelFollowedByConditionInput
  ) {
    deleteFollowedBy(input: $input, condition: $condition) {
      id
      username
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createFollows = /* GraphQL */ `
  mutation CreateFollows(
    $input: CreateFollowsInput!
    $condition: ModelFollowsConditionInput
  ) {
    createFollows(input: $input, condition: $condition) {
      id
      username
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFollows = /* GraphQL */ `
  mutation UpdateFollows(
    $input: UpdateFollowsInput!
    $condition: ModelFollowsConditionInput
  ) {
    updateFollows(input: $input, condition: $condition) {
      id
      username
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFollows = /* GraphQL */ `
  mutation DeleteFollows(
    $input: DeleteFollowsInput!
    $condition: ModelFollowsConditionInput
  ) {
    deleteFollows(input: $input, condition: $condition) {
      id
      username
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createReaction = /* GraphQL */ `
  mutation CreateReaction(
    $input: CreateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    createReaction(input: $input, condition: $condition) {
      id
      username
      reactionType
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateReaction = /* GraphQL */ `
  mutation UpdateReaction(
    $input: UpdateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    updateReaction(input: $input, condition: $condition) {
      id
      username
      reactionType
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteReaction = /* GraphQL */ `
  mutation DeleteReaction(
    $input: DeleteReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    deleteReaction(input: $input, condition: $condition) {
      id
      username
      reactionType
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      username
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      username
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      username
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createLogIn = /* GraphQL */ `
  mutation CreateLogIn(
    $input: CreateLogInInput!
    $condition: ModelLogInConditionInput
  ) {
    createLogIn(input: $input, condition: $condition) {
      id
      username
      password
      User {
        id
        username
        password
        profilePicture
        bio
        Goals {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Follows {
          nextToken
          startedAt
        }
        FollowedBies {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      logInUserId
    }
  }
`;
export const updateLogIn = /* GraphQL */ `
  mutation UpdateLogIn(
    $input: UpdateLogInInput!
    $condition: ModelLogInConditionInput
  ) {
    updateLogIn(input: $input, condition: $condition) {
      id
      username
      password
      User {
        id
        username
        password
        profilePicture
        bio
        Goals {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Follows {
          nextToken
          startedAt
        }
        FollowedBies {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      logInUserId
    }
  }
`;
export const deleteLogIn = /* GraphQL */ `
  mutation DeleteLogIn(
    $input: DeleteLogInInput!
    $condition: ModelLogInConditionInput
  ) {
    deleteLogIn(input: $input, condition: $condition) {
      id
      username
      password
      User {
        id
        username
        password
        profilePicture
        bio
        Goals {
          nextToken
          startedAt
        }
        Posts {
          nextToken
          startedAt
        }
        Follows {
          nextToken
          startedAt
        }
        FollowedBies {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      logInUserId
    }
  }
`;
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
      id
      username
      goalNumber
      date
      content
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
      id
      username
      goalNumber
      date
      content
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
      id
      username
      goalNumber
      date
      content
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      password
      profilePicture
      bio
      Goals {
        items {
          id
          username
          goalNumber
          date
          content
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          caption
          photo
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Follows {
        items {
          id
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      FollowedBies {
        items {
          id
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      password
      profilePicture
      bio
      Goals {
        items {
          id
          username
          goalNumber
          date
          content
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          caption
          photo
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Follows {
        items {
          id
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      FollowedBies {
        items {
          id
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      password
      profilePicture
      bio
      Goals {
        items {
          id
          username
          goalNumber
          date
          content
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Posts {
        items {
          id
          caption
          photo
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Follows {
        items {
          id
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      FollowedBies {
        items {
          id
          username
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      caption
      photo
      username
      Comments {
        items {
          id
          content
          username
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Reactions {
        items {
          id
          username
          reactionType
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      caption
      photo
      username
      Comments {
        items {
          id
          content
          username
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Reactions {
        items {
          id
          username
          reactionType
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      caption
      photo
      username
      Comments {
        items {
          id
          content
          username
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Reactions {
        items {
          id
          username
          reactionType
          postID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
