import * as React from "react";
import renderer from "react-test-renderer";
import Header from "./Header";

it(`renders correctly`, () => {
  const tree = renderer.create(<Header></Header>);
  expect(tree).toBeDefined();
});

let test = "test the title";

it(`displays title`, () => {
  const tree = renderer.create(<Header title={test}></Header>);
  const treeInstance = tree.root;
  expect(treeInstance.findByType(Header).props.title).toBe("test the title");
})
