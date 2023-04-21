import * as React from "react";
import renderer, { act } from "react-test-renderer";
import AddFollowerModal from "../InfoModal/InfoModal";



it(`renders correctly`, async () => {
  const tree = await act(
    async () => await renderer.create(<AddFollowerModal></AddFollowerModal>)
  );
  expect(tree).toBeDefined();
});

// it(`Shows modal`, async () => {
//   const tree = await act(
//     async () => await renderer.create(<AddFollowerModal></AddFollowerModal>)
//   );
//   const treeInstance = tree.root;
//   expect(treeInstance.findByType(AddFollowerModal).props.modalVisible).toBe(true);
// });
