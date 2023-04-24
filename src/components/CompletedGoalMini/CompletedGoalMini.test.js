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
  const tree = renderer.create(<CompletedGoalMini description={text}></CompletedGoalMini>);
  const testInstance = tree.root;
  expect(testInstance.findByType(CompletedGoalMini).props.description).toBe("test");
});