import * as React from "react";
import renderer, { act } from "react-test-renderer";
import WorkoutSelection from "./WorkoutSelection";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<WorkoutSelection></WorkoutSelection>)
  );
  expect(tree).toBeDefined();
});