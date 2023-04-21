/**
 *  @jest-environment jsdom
 */

import * as React from "react";
import renderer from "react-test-renderer";
import { screen, render, getByText } from "@testing-library/react";
import CompletedGoalMini from "./CompletedGoalMini";

let text = "test";

it(`renders correctly`, () => {
  const tree = renderer.create(<CompletedGoalMini></CompletedGoalMini>);
  expect(tree).toBeDefined();
});

it(`renders text`, () => {
  render(<CompletedGoalMini description={text}></CompletedGoalMini>)
  expect(screen.getByText(text)).toBeDefined();
});