import * as React from "react";
import renderer from "react-test-renderer";
import CompletedGoalMini from "./CompletedGoalMini";

it(`renders correctly`, () => {
  const tree = renderer.create(<CompletedGoalMini></CompletedGoalMini>);
  expect(tree).toBeDefined();
});
