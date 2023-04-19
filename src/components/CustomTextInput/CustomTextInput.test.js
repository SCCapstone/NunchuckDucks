import * as React from "react";
import renderer from "react-test-renderer";
import CustomTextInput from "./CustomTextInput";
it(`renders correctly`, () => {
  const tree = renderer.create(<CustomTextInput></CustomTextInput>);
  expect(tree).toBeDefined();
});
