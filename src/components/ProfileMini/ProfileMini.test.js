import * as React from "react";
import renderer, { act } from "react-test-renderer";
import ProfileMini from "./ProfileMini";
import { render } from "@testing-library/react";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(<ProfileMini></ProfileMini>)
  );
  expect(tree).toBeDefined();
});

const func = jest.fn();

it(`calls on click`, async () => {
  const tree = await act(async () =>
    renderer.create(<ProfileMini onClick={func}></ProfileMini>)
  );
  const treeInstance = tree.root;
  expect(treeInstance.findByType(ProfileMini).props.onClick).toBe(func);
});