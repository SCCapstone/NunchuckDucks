import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Bio from "./Bio";

it(`renders correctly`, async () => {
  const tree = await act(async () => renderer.create(<Bio></Bio>));
  expect(tree).toBeDefined();
});