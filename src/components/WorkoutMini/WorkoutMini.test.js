import * as React from "react";
import renderer, { act } from "react-test-renderer";
import WorkoutMini from "./WorkoutMini";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(
      <WorkoutMini
        workout={[{ workoutName: "testWorkoutName", exercises: [] }]}
      ></WorkoutMini>
    )
  );
  expect(tree).toBeDefined();
});