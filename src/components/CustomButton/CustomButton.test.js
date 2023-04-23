import * as React from "react";
import renderer from "react-test-renderer";
import CustomButton from "./CustomButton";

const func = jest.fn();

it(`renders correctly`, () => {
  const tree = renderer.create(<CustomButton></CustomButton>);
  expect(tree).toBeDefined();
});

it(`calls function on click`, () => {
  const tree = renderer.create(<CustomButton onClick={func}></CustomButton>);
  const treeInstance = tree.root;
  expect(treeInstance.findByType(CustomButton).props.onClick).toBe(func);
})