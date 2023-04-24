import * as React from "react";
import renderer, { act } from "react-test-renderer";
import NonCurrUserProfileModal from "./NonCurrUserProfileModal";

it(`renders correctly`, async () => {
  const tree = await act(async () =>
    renderer.create(
      <NonCurrUserProfileModal
        username={"testusername"}
      ></NonCurrUserProfileModal>
    )
  );
  expect(tree).toBeDefined();
});