import * as React from "react";
import renderer from "react-test-renderer";
import ChangeBioModal from "./ChangeBioModal";

it(`renders correctly`, () => {
  const tree = renderer.create(<ChangeBioModal></ChangeBioModal>);
  expect(tree).toBeDefined();
});