import * as React from "react";
import renderer from "react-test-renderer";
import Exercise from "./Exercise";

it(`renders correctly`, () => {
  const tree = renderer.create(
    <Exercise
      exercise={{
        exercise: { exerciseName: "testName", exerciseNotes: "testNotes" },
      }}
    ></Exercise>
  );
  expect(tree).toBeDefined();
});
