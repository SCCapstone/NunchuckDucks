import * as React from "react";
import renderer from "react-test-renderer";
import SignOutButton from "./SignOutButton";

it(`renders correctly`, () => {
  const tree = renderer.create(<SignOutButton></SignOutButton>);
  expect(tree).toBeDefined();
});