import * as React from "react";
import renderer, { act } from "react-test-renderer";
import GoalSummary from "./GoalSummary";

jest.mock("../../crud/observeQueries/GoalObserveQueries", () => {
  return {
    getAndObserveGoals: (username, setGoals) => {
      setGoals([{ id: "testid", content: "crazy test goal" }]);

      return {
        unsubscribe: () => jest.fn(),
      };
    },
  };
});

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<GoalSummary username={"testUsername"}></GoalSummary>)
  );
  expect(tree).toBeDefined();
});
