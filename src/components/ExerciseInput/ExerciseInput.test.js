import * as React from "react";
import renderer, { act } from "react-test-renderer";
import ExerciseInput from "./ExerciseInput";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<ExerciseInput></ExerciseInput>)
  );
  expect(tree).toBeDefined();
});