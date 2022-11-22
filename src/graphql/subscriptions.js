/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFollowedBy = /* GraphQL */ `
  subscription OnCreateFollowedBy(
    $filter: ModelSubscriptionFollowedByFilterInput
  ) {
    onCreateFollowedBy(filter: $filter) {
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
export const onUpdateFollowedBy = /* GraphQL */ `
  subscription OnUpdateFollowedBy(
    $filter: ModelSubscriptionFollowedByFilterInput
  ) {
    onUpdateFollowedBy(filter: $filter) {
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
export const onDeleteFollowedBy = /* GraphQL */ `
  subscription OnDeleteFollowedBy(
    $filter: ModelSubscriptionFollowedByFilterInput
  ) {
    onDeleteFollowedBy(filter: $filter) {
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
export const onCreateFollows = /* GraphQL */ `
  subscription OnCreateFollows($filter: ModelSubscriptionFollowsFilterInput) {
    onCreateFollows(filter: $filter) {
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
export const onUpdateFollows = /* GraphQL */ `
  subscription OnUpdateFollows($filter: ModelSubscriptionFollowsFilterInput) {
    onUpdateFollows(filter: $filter) {
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
export const onDeleteFollows = /* GraphQL */ `
  subscription OnDeleteFollows($filter: ModelSubscriptionFollowsFilterInput) {
    onDeleteFollows(filter: $filter) {
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
export const onCreateReaction = /* GraphQL */ `
  subscription OnCreateReaction($filter: ModelSubscriptionReactionFilterInput) {
    onCreateReaction(filter: $filter) {
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
export const onUpdateReaction = /* GraphQL */ `
  subscription OnUpdateReaction($filter: ModelSubscriptionReactionFilterInput) {
    onUpdateReaction(filter: $filter) {
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
export const onDeleteReaction = /* GraphQL */ `
  subscription OnDeleteReaction($filter: ModelSubscriptionReactionFilterInput) {
    onDeleteReaction(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateLogIn = /* GraphQL */ `
  subscription OnCreateLogIn($filter: ModelSubscriptionLogInFilterInput) {
    onCreateLogIn(filter: $filter) {
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
export const onUpdateLogIn = /* GraphQL */ `
  subscription OnUpdateLogIn($filter: ModelSubscriptionLogInFilterInput) {
    onUpdateLogIn(filter: $filter) {
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
export const onDeleteLogIn = /* GraphQL */ `
  subscription OnDeleteLogIn($filter: ModelSubscriptionLogInFilterInput) {
    onDeleteLogIn(filter: $filter) {
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
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal($filter: ModelSubscriptionGoalFilterInput) {
    onCreateGoal(filter: $filter) {
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
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal($filter: ModelSubscriptionGoalFilterInput) {
    onUpdateGoal(filter: $filter) {
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
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal($filter: ModelSubscriptionGoalFilterInput) {
    onDeleteGoal(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
