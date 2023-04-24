import * as React from "react";
import renderer from "react-test-renderer";
import CustomTextInput from "./CustomTextInput";
it(`renders correctly`, () => {
  const tree = renderer.create(<CustomTextInput></CustomTextInput>);
  expect(tree).toBeDefined();
});

const change = jest.fn();

it(`Changes text`, () => {
  const tree = renderer.create(<CustomTextInput onChangeHandler={change}></CustomTextInput>);
  const treeInstance = tree.root;
  expect(treeInstance.findByType(CustomTextInput).props.onChangeHandler).toBe(change);
})