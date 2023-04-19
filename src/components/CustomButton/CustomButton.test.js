import * as React from "react";
import renderer from "react-test-renderer";
import CustomButton from "./CustomButton";
it(`renders correctly`, () => {
  const tree = renderer.create(<CustomButton></CustomButton>);
  expect(tree).toBeDefined();
});
