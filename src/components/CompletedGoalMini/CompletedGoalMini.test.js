import * as React from "react";
import renderer from "react-test-renderer";
import { screen } from "@testing-library/react";
import CompletedGoalMini from "./CompletedGoalMini";

let text = "test";

it(`renders correctly`, () => {
  const tree = renderer.create(<CompletedGoalMini></CompletedGoalMini>);
  expect(tree).toBeDefined();
});

it(`renders text`, () => {
  const goal = renderer.create(<CompletedGoalMini description={text}></CompletedGoalMini>);
  expect(screen.findByText("test")).toBeInDocument();
});
