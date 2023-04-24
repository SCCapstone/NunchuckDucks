import * as React from "react";
import renderer, { act } from "react-test-renderer";
import ErrorModal from "./ErrorModal";

it(`renders correctly`, () => {
  const tree = renderer.create(<ErrorModal></ErrorModal>);
  expect(tree).toBeDefined();
});