import * as React from "react";
import renderer, { act } from "react-test-renderer";
import FollowerMini from "./FollowerMini";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<FollowerMini username={"invalid"}></FollowerMini>)
  );
  await expect(tree).toBeDefined();
});
