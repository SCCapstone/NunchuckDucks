import * as React from "react";
import renderer from "react-test-renderer";
import GoalMini from "./GoalMini";

it(`renders correctly`, () => {
  const tree = renderer.create(<GoalMini></GoalMini>);
  expect(tree).toBeDefined();
});
