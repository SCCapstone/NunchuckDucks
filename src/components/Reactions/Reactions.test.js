import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Reactions from "./Reactions";

it(`renders correctly`, async () => {
  const tree = await act(async () => renderer.create(<Reactions></Reactions>));
  expect(tree).toBeDefined();
});
