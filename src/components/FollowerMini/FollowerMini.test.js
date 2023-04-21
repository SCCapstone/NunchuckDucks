import * as React from "react";
import renderer, { act } from "react-test-renderer";
import FollowerMini from "./FollowerMini";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<FollowerMini username={"invalid"}></FollowerMini>)
  );
  await expect(tree).toBeDefined();
});

let username = "test_username";

it(`Displays username`, async () => {
  const tree = await act(async () =>
  renderer.create(<FollowerMini username={username}></FollowerMini>));
  const treeInstance = tree.root;
  expect(treeInstance.findByType(FollowerMini).props.username).toBe("test_username");
})
