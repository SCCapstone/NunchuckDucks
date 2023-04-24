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

const func = jest.fn();

it(`adds new follower`, async () => {
  const tree = await act(async () => 
  renderer.create(<SuggestedFollower addNewFollower={func}></SuggestedFollower>));
  const treeInstance = tree.root;
  expect(treeInstance.findByType(SuggestedFollower).props.addNewFollower).toBe(func);
});