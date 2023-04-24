import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Comment from "./Comment";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<Comment commentModel={{}}></Comment>)
  );
  expect(tree).toBeDefined();
});