import * as React from "react";
import renderer, { act } from "react-test-renderer";
import NotificationMini from "./NotificationMini";
import { render } from "@testing-library/react";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(
      <NotificationMini username={"testusername"} content={""}></NotificationMini>
    )
  );
  expect(tree).toBeDefined();
});

let test = "notification content";

it(`shows content`, async () => {
  const tree = await act(async () => renderer.create(<NotificationMini content={test} username={"testusername"}></NotificationMini>));
  const treeInstance = tree.root;
  expect(treeInstance.findByType(NotificationMini).props.content).toBe("notification content");
})

const func = jest.fn();

it(`shows content`, async () => {
  const tree = await act(async () => renderer.create(<NotificationMini onDeleteHandler={func} username={"testusername"} content={""}></NotificationMini>));
  const treeInstance = tree.root;
  expect(treeInstance.findByType(NotificationMini).props.onDeleteHandler).toBe(func);
})
