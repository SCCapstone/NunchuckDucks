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

// local mocks
// ../../crud/UserOperations
jest.mock("./src/crud/UserOperations", () => {
  return {
    getBio: () => "test bio",
  };
});
jest.mock("./src/crud/CacheOperations", () => {
  return { getCurrentUser: () => "test user" };
});
jest.mock("./src/library/GetAuthenticatedUser", () => {
  return {
    getCurrentAuthenticatedUser: () => "test user",
  };
});
