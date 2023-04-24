import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Reactions from "./Reactions";

it(`renders correctly`, async () => {
  const tree = await act(async () => renderer.create(<Reactions></Reactions>));
  expect(tree).toBeDefined();
});

let postId = "testID";

it(`finds post id`, async () => {
  const tree = await act(async () => renderer.create(<Reactions postID={postId}></Reactions>));
  const treeInstance = tree.root;
  expect(treeInstance.findByType(Reactions).props.postID).toBe("testID");
});