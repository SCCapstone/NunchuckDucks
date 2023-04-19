import * as React from "react";
import renderer, { act } from "react-test-renderer";
import ProfileMini from "./ProfileMini";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<ProfileMini></ProfileMini>)
  );
  expect(tree).toBeDefined();
});
