import * as React from "react";
import renderer from "react-test-renderer";
import CustomTextInputWithError from "./CustomTextInputWithError";

it(`renders correctly`, () => {
  const tree = renderer.create(
    <CustomTextInputWithError></CustomTextInputWithError>
  );
  expect(tree).toBeDefined();
});
