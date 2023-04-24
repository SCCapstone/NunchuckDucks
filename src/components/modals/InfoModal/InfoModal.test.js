import * as React from "react";
import renderer, { act } from "react-test-renderer";
import InfoModal from "./InfoModal";
import { render } from "@testing-library/react";

it(`renders correctly`, () => {
  const tree = renderer.create(<InfoModal></InfoModal>);
  expect(tree).toBeDefined();
});

let test = "testing info modal message";

it(`shows message`, () => {
  const tree = renderer.create(<InfoModal message={test}></InfoModal>);
  const treeInstance = tree.root;
  expect(treeInstance.findByType(InfoModal).props.message).toBe("testing info modal message");
})