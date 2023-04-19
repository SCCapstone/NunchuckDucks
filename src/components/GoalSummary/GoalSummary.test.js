import * as React from "react";
import renderer, { act } from "react-test-renderer";
import GoalSummary from "./GoalSummary";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<GoalSummary username={"testUsername"}></GoalSummary>)
  );
  expect(tree).toBeDefined();
});
