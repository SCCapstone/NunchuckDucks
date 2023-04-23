import * as React from "react";
import renderer from "react-test-renderer";
import BackButton from "./BackButton";

it(`renders correctly`, () => {
  const tree = renderer.create(<BackButton></BackButton>);
  expect(tree).toBeDefined();
});
