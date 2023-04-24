import * as React from "react";
import renderer, { act } from "react-test-renderer";
import Navbar from "./Navbar";

it(`renders correctly`, () => {
  const tree = renderer.create(<Navbar></Navbar>);
  expect(tree).toBeDefined();
});