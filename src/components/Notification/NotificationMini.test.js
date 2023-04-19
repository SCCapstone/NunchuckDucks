import * as React from "react";
import renderer, { act } from "react-test-renderer";
import NotificationMini from "./NotificationMini";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(
      <NotificationMini username={"testusername"}></NotificationMini>
    )
  );
  expect(tree).toBeDefined();
});
