import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Workout from "./Workout";

// TODO: Get valid Json string to replace the empty quotes
it(`renders correctly`, () => {
  const tree = renderer.create(<Workout workout={[``]}></Workout>);
  expect(tree).toBeDefined();
});

let test = true;

it(`sets absolute`, () => {
  const tree = renderer.create(<Workout workout={[``]} isAbsolute={test}></Workout>);
  const treeInstance = tree.root;
  expect(treeInstance.findByType(Workout).props.isAbsolute).toBe(true);
});