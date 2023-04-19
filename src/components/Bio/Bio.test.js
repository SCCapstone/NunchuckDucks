import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Bio from "./Bio";

jest.mock("../../crud/UserOperations", () => {
  return {
    getBio: () => "test bio",
  };
});
jest.mock("../../crud/CacheOperations", () => {
  return { getCurrentUser: () => "test user" };
});

it(`renders correctly`, async () => {
  const tree = await act(async () => renderer.create(<Bio></Bio>));
  expect(tree).toBeDefined();
});
