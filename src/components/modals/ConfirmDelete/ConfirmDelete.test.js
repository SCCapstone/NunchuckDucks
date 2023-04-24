import * as React from "react";
import renderer from "react-test-renderer";
import ConfirmDelete from "./ConfirmDelete";

it(`renders correctly`, () => {
  const tree = renderer.create(<ConfirmDelete></ConfirmDelete>);
  expect(tree).toBeDefined();
});