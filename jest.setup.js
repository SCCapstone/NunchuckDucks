import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    AntDesign: View,
  };
});
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => {
      return {
        goBack: () => console.log("Went back"),
        navigate: (page) => jest.fn(),
      };
    },
  };
});
jest.mock("aws-amplify", () => {
  return {
    Auth: {
      signOut: () => "",
    },
    DataStore: {
      stop: () => "",
      clear: () => "",
    },
  };
});
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// local mocks
// ../../crud/UserOperations
jest.mock("./src/crud/UserOperations", () => {
  return {
    getBio: () => "test bio",
    findUserByUsername: () => "",
    getUsersbyStartofUsername: () => [],
  };
});
jest.mock("./src/crud/CacheOperations", () => {
  return {
    getCurrentUser: () => "test user",
    getUriFromCache: () => "",
    cacheRemoteUri: () => "",
    deleteAllCache: () => "",
  };
});
jest.mock("./src/library/GetAuthenticatedUser", () => {
  return {
    getCurrentAuthenticatedUser: () => "test user",
  };
});
jest.mock("./src/crud/WorkoutOperations", () => {
  return {
    createWorkout: () => true,
    updateWorkoutById: () => true,
    deleteWorkout: () => true,
    getWorkouts: () => [],
  };
});
jest.mock("./src/crud/ReactionOperations", () => {
  return {
    createReaction: () => "",
    getUserReactions: () => [],
    removeReaction: () => "",
  };
});
jest.mock("./src/crud/observeQueries/ReactionsObserveQueries", () => {
  return {
    getAndObserveReactions: (postID, setReactions) => {
      return {
        unsubscribe: jest.fn(),
      };
    },
  };
});
jest.mock("./src/crud/FollowingOperations", () => {
  return {
    getFollowsList: () => [],
  };
});
jest.mock("./src/crud/FollowersOperations", () => {
  return {
    getFollowersList: () => [],
    createFollower: () => true,
  };
});
jest.mock("./src/crud/observeQueries/GoalObserveQueries", () => {
  return {
    getAndObserveGoals: (username, setGoals) => {
      setGoals([{ id: "testid", content: "crazy test goal" }]);

      return {
        unsubscribe: () => jest.fn(),
      };
    },
  };
});
jest.mock("./src/crud/CommentOperations", () => {
  return {
    checkForDeletability: () => true,
    createComment: () => true,
    deleteComment: () => true,
  };
});
