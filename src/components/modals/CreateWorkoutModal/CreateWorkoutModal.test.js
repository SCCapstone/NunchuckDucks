import * as React from "react";
import renderer, { act } from "react-test-renderer";
import CreateWorkoutModal from "./CreateWorkoutModal";

it(`renders correctly`, async () => {
  const tree = await act(
    async () => await renderer.create(<CreateWorkoutModal></CreateWorkoutModal>)
  );
  expect(tree).toBeDefined();
});