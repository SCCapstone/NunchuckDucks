import * as React from "react";
import renderer, { act } from "react-test-renderer";
import SuggestedFollower from "./SuggestedFollower";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(
      <SuggestedFollower addNewFollower={jest.fn()}></SuggestedFollower>
    )
  );
  expect(tree).toBeDefined();
});
