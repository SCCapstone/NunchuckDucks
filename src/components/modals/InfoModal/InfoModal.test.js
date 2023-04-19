import * as React from "react";
import renderer, { act } from "react-test-renderer";
import InfoModal from "./InfoModal";

it(`renders correctly`, () => {
  const tree = renderer.create(<InfoModal></InfoModal>);
  expect(tree).toBeDefined();
});
