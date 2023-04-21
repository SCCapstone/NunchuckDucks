import * as React from "react";
import renderer from "react-test-renderer";
import GoalMini from "./GoalMini";

it(`renders correctly`, () => {
  const tree = renderer.create(<GoalMini></GoalMini>);
  expect(tree).toBeDefined();
});

let goal = "test description of goal";

it(`Renders goal description`, () => {
  const tree = renderer.create(<GoalMini description={goal}></GoalMini>);
  const treeInstance = tree.root;
  expect(treeInstance.findByType(GoalMini).props.description).toBe("test description of goal");
})
