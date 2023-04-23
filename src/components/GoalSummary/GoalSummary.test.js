import * as React from "react";
import renderer, { act } from "react-test-renderer";
import GoalSummary from "./GoalSummary";
import { Goal } from "../../models";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<GoalSummary username={"testUsername"}></GoalSummary>)
  );
  expect(tree).toBeDefined();
});

//let currUser = true;

// it(`Sets current user value correctly`, async () => {
//   const tree = await act(async () => 
//     renderer.create(<GoalSummary isCurrentUser={currUser} username={"testUsername"}></GoalSummary>)
//   );
//   const treeInstance = tree.root;
//   expect(treeInstance.findByType(GoalSummary).props.isCurrentUser).toBe(true);
// });
